/* eslint-disable global-require */
// unit test for discovery actions
// data provided by TrezorConnect are mocked

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import accountsReducer from '@wallet-reducers/accountsReducer';
import discoveryReducer from '@wallet-reducers/discoveryReducer';
import { NOTIFICATION } from '@suite-actions/constants';
import { DISCOVERY, ACCOUNT } from '@wallet-actions/constants';
import * as discoveryActions from '../discoveryActions';
import fixtures, { paramsError, interruptionFixtures } from './fixtures/discoveryActions';

const { getSuiteDevice } = global.JestMocks;

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];
type Fixture = ArrayElement<typeof fixtures>;
type Bundle = { path: string; coin: string }[];

jest.mock('trezor-connect', () => {
    let progressCallback: Function = () => {};
    let fixture: Fixture | Promise<Fixture> | Function | typeof undefined;

    // mocked function
    const getAccountInfo = async (params: { bundle: Bundle }) => {
        // this error applies only for tests
        if (typeof fixture === 'undefined') {
            return paramsError('Default error. Fixtures not set');
        }
        // this promise will be resolved by TrezorConnect.cancel
        if (fixture instanceof Promise) {
            return fixture;
        }

        if (typeof fixture === 'function') {
            return fixture.call(null, progressCallback);
        }

        const { connect } = fixture;
        if (connect.error) {
            // error code is used in case where one of requested coins is not supported
            const { code, error } = connect.error;
            if (code) {
                delete connect.error; // reset this value, it shouldn't be used in next iteration
                return paramsError(error, code);
            }
            return paramsError(error);
        }

        // emit BUNDLE_PROGRESS
        for (let i = 0; i < params.bundle.length; i++) {
            const param = params.bundle[i];
            const accountType = param.path
                .split('/')
                .slice(0, 3)
                .join('/');
            let isEmpty = true;
            let isFailed = false;

            if (connect.interruption) {
                const interrupted = connect.interruption.indexOf(param.path);
                if (interrupted >= 0) {
                    connect.interruption[interrupted] = 'interruption-item-used';
                    return {
                        success: false,
                        payload: {
                            error: 'discovery_interrupted',
                        },
                    };
                }
            }

            if (connect.usedAccounts) {
                connect.usedAccounts.some(a => {
                    const found = a.indexOf(accountType) >= 0;
                    if (found && param.path !== a) {
                        isEmpty = false;
                        return true;
                    }
                    return false;
                });
            }

            if (connect.failedAccounts) {
                connect.failedAccounts.some(a => {
                    const found = a.indexOf(accountType) >= 0;
                    if (found && param.path === a) {
                        isFailed = true;
                        return true;
                    }
                    return false;
                });
            }

            if (isFailed) {
                progressCallback.call(null, {
                    progress: i,
                    response: null,
                    error: 'Runtime discovery error',
                });
            } else {
                progressCallback.call(null, {
                    progress: i,
                    response: {
                        descriptor: param.path,
                        empty: isEmpty,
                    },
                    error: null,
                });
            }
        }

        if (connect.success) {
            return {
                success: true,
            };
        }

        return paramsError('Fixture response not defined');
    };

    return {
        __esModule: true, // this property makes it work
        default: {
            getFeatures: () => {},
            off: () => {
                progressCallback = () => {};
            },
            on: (_event: string, cb: Function) => {
                progressCallback = cb;
            },
            getAccountInfo,
            cancel: () => {},
        },
        UI: {
            BUNDLE_PROGRESS: 'progress',
        },
        setTestFixtures: (f: Fixture) => {
            fixture = f;
        },
    };
});

const SUITE_DEVICE = getSuiteDevice({ state: 'device-state' });
export const getInitialState = () => ({
    suite: {
        device: SUITE_DEVICE,
    },
    wallet: {
        discovery: discoveryReducer(undefined, { type: 'foo' } as any),
        accounts: accountsReducer(undefined, { type: 'foo' } as any),
    },
});

const mockStore = configureStore<ReturnType<typeof getInitialState>, any>([thunk]);

const updateStore = (store: ReturnType<typeof mockStore>) => {
    // there is not much redux logic in this test
    // just update state on every action manually
    const action = store.getActions().pop();
    const { accounts, discovery } = store.getState().wallet;

    store.getState().wallet = {
        accounts: accountsReducer(accounts, action),
        discovery: discoveryReducer(discovery, action),
    };
    // add action back to stack
    store.getActions().push(action);
};

describe('Discovery Actions', () => {
    fixtures.forEach(f => {
        it(f.description, async () => {
            // set fixtures in trezor-connect
            require('trezor-connect').setTestFixtures(f);

            const state = getInitialState();
            const store = mockStore(state);
            store.subscribe(() => updateStore(store));

            await store.dispatch(discoveryActions.start());

            const result = store.getState().wallet.discovery[0];
            if (f.result) {
                expect(result.failed).toEqual(f.result.failed);
                expect(result.loaded).toEqual(result.total);
                expect(result.bundleSize).toEqual(0);
            } else {
                const action = store.getActions().pop();
                expect(action.type).toEqual(NOTIFICATION.ADD);
            }
        });
    });

    it('Start discovery without device', async () => {
        // @ts-ignore: invalid state (suite empty)
        const store = mockStore({
            suite: {},
            wallet: {
                accounts: [],
                discovery: [],
            },
        });
        await store.dispatch(discoveryActions.start());
        const action = store.getActions().pop();
        expect(action.type).toEqual(NOTIFICATION.ADD);
    });

    it('Create discovery which already exist', async () => {
        const store = mockStore(getInitialState());
        store.subscribe(() => updateStore(store));
        store.dispatch({
            type: DISCOVERY.START,
            payload: SUITE_DEVICE,
        });
        store.dispatch({
            type: DISCOVERY.START,
            payload: SUITE_DEVICE,
        });
        expect(store.getState().wallet.discovery.length).toEqual(1);
    });

    it('Update discovery which does not exist', async () => {
        const store = mockStore(getInitialState());
        store.subscribe(() => updateStore(store));
        store.dispatch({
            type: DISCOVERY.UPDATE,
            payload: SUITE_DEVICE,
        });
        expect(store.getState().wallet.discovery.length).toEqual(0);
    });

    it('Start/stop', async done => {
        const f = new Promise(resolve => {
            setTimeout(() => resolve(paramsError('discovery_interrupted')), 100);
        });
        // set fixtures in trezor-connect
        require('trezor-connect').setTestFixtures(f);
        const store = mockStore(getInitialState());
        store.dispatch(discoveryActions.start()).then(() => {
            const action = store.getActions().pop();
            done(expect(action.type).toEqual(DISCOVERY.STOP));
        });
        store.dispatch(discoveryActions.stop());
    });

    interruptionFixtures.forEach(f => {
        it(`Start/stop/restart: ${f.description}`, async done => {
            require('trezor-connect').setTestFixtures(f);
            const store = mockStore(getInitialState());
            store.subscribe(() => updateStore(store));
            // additional action listener for triggering "discovery.stop" action
            store.subscribe(() => {
                const actions = store.getActions();
                const a = actions[actions.length - 1];
                if (a.type === ACCOUNT.CREATE) {
                    // call "stop" after last account is discovered
                    if (typeof f.trigger === 'string') {
                        const discoveryUpdate = actions[actions.length - 2];
                        if (discoveryUpdate.payload.bundleSize === 0) {
                            store.dispatch(discoveryActions.stop());
                        }
                        return;
                    }
                    // call "stop" if added account is a trigger from fixtures
                    const trigger = f.trigger.find(t => a.payload.path.indexOf(t) >= 0);
                    if (trigger) {
                        store.dispatch(discoveryActions.stop());
                    }
                }
            });

            // restart discovery until complete
            const loop = async (): Promise<any> => {
                await store.dispatch(discoveryActions.start());
                const lastAction = store.getActions().pop();
                if (lastAction.type === DISCOVERY.STOP) {
                    const interrupt = store.getActions().pop();
                    expect(interrupt.type).toEqual(DISCOVERY.INTERRUPT);
                    return loop();
                }
                return lastAction;
            };

            const complete = await loop();
            expect(complete.type).toEqual(DISCOVERY.COMPLETE);
            const discovery = store.getState().wallet.discovery[0];
            done(expect(discovery.total).toEqual(discovery.loaded));
        });
    });

    it('Stop discovery without device (discovery not exists)', async () => {
        // @ts-ignore: invalid state (suite empty)
        const store = mockStore({
            suite: {},
            wallet: {
                accounts: [],
                discovery: [],
            },
        });
        await store.dispatch(discoveryActions.stop());
        expect(store.getActions()).toEqual([]);
    });

    it('First iteration malformed error (not a json)', async done => {
        const f = new Promise(resolve => {
            setTimeout(() => resolve(paramsError('not-a-json', 'bundle_fw_exception')), 100);
        });
        // set fixtures in trezor-connect
        require('trezor-connect').setTestFixtures(f);
        const store = mockStore(getInitialState());
        store.dispatch(discoveryActions.start()).then(() => {
            const action = store.getActions().pop();
            done(expect(action.type).toEqual(NOTIFICATION.ADD));
        });
        store.dispatch(discoveryActions.stop());
    });

    it('First iteration malformed error (invalid json)', async done => {
        const f = new Promise(resolve => {
            setTimeout(() => resolve(paramsError('{}', 'bundle_fw_exception')), 100);
        });
        // set fixtures in trezor-connect
        require('trezor-connect').setTestFixtures(f);
        const store = mockStore(getInitialState());
        store.dispatch(discoveryActions.start()).then(() => {
            const action = store.getActions().pop();
            done(expect(action.type).toEqual(NOTIFICATION.ADD));
        });
        store.dispatch(discoveryActions.stop());
    });

    it('TrezorConnect did not emit any progress event', async () => {
        // store original mocked function
        const originalFn = require('trezor-connect').default.getAccountInfo;
        // set fixtures in trezor-connect
        require('trezor-connect').default.getAccountInfo = () => ({
            success: true,
        });
        const store = mockStore(getInitialState());
        await store.dispatch(discoveryActions.start());
        const action = store.getActions().pop();
        // restore original mocked fn
        require('trezor-connect').default.getAccountInfo = originalFn;
        expect(action.type).toEqual(NOTIFICATION.ADD);
    });

    it('All accounts failed in runtime', async () => {
        // store original mocked function
        const originalFn = require('trezor-connect').default.getAccountInfo;
        // override mocked function
        require('trezor-connect').default.getAccountInfo = (params: { bundle: Bundle }) => {
            // prepare response (all failed)
            const failedAccounts: string[] = [];
            for (let i = 0; i < params.bundle.length; i++) {
                failedAccounts.push(params.bundle[i].path);
            }
            require('trezor-connect').setTestFixtures({
                connect: {
                    success: true,
                    failedAccounts,
                },
            });
            // call original mocked fn
            return originalFn(params);
        };
        // run process
        const store = mockStore(getInitialState());
        store.subscribe(() => updateStore(store));
        await store.dispatch(discoveryActions.start());
        // restore original mocked fn
        require('trezor-connect').default.getAccountInfo = originalFn;
        const action = store.getActions().pop();
        const result = store.getState().wallet.discovery[0];
        expect(action.type).toEqual(DISCOVERY.COMPLETE);
        expect(result.loaded).toEqual(0);
        expect(result.total).toEqual(0);
    });

    it('All accounts failed in first iteration', async () => {
        // store original mocked function
        const originalFn = require('trezor-connect').default.getAccountInfo;
        // override mocked function
        require('trezor-connect').default.getAccountInfo = (params: { bundle: Bundle }) => {
            // prepare json response
            const failedAccounts: any[] = [];
            for (let i = 0; i < params.bundle.length; i++) {
                failedAccounts.push({
                    index: i,
                    coin: params.bundle[i].coin,
                    exception: 'not supported',
                });
            }
            // return error
            return paramsError(JSON.stringify(failedAccounts), 'bundle_fw_exception');
        };
        // run process
        const store = mockStore(getInitialState());
        store.subscribe(() => updateStore(store));
        await store.dispatch(discoveryActions.start());
        // restore original mocked fn
        require('trezor-connect').default.getAccountInfo = originalFn;
        const action = store.getActions().pop();
        const result = store.getState().wallet.discovery[0];
        expect(action.type).toEqual(DISCOVERY.COMPLETE);
        expect(result.loaded).toEqual(0);
        expect(result.total).toEqual(0);
    });
});
