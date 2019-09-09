import produce from 'immer';
import { DISCOVERY } from '@wallet-actions/constants';
import { Action } from '@wallet-types';
import { ObjectValues } from '@suite-types';

export const DISCOVERY_STATUS = {
    IDLE: 0,
    STARTING: 1,
    RUNNING: 2,
    STOPPING: 3,
    STOPPED: 4,
    COMPLETED: 5,
} as const;

export interface Discovery {
    device: string;
    index: number;
    total: number;
    loaded: number;
    bundleSize: number;
    status: ObjectValues<typeof DISCOVERY_STATUS>;
    // coins which failed to load
    failed: {
        network: string;
        accountType: string;
        error: string;
        fwException?: string;
    }[];
}

export type PartialDiscovery = { device: string } & Partial<Discovery>;

type State = Discovery[];
const initialState: State = [];

const update = (state: State, payload: PartialDiscovery) => {
    const index = state.findIndex(f => f.device === payload.device);
    if (index >= 0) {
        state[index] = {
            ...state[index],
            ...payload,
        };
    }
};

const create = (state: State, payload: Discovery) => {
    const index = state.findIndex(f => f.device === payload.device);
    if (index < 0) {
        state.push(payload);
    } else {
        update(state, payload);
    }
};

export default (state: State = initialState, action: Action): State => {
    return produce(state, draft => {
        switch (action.type) {
            case DISCOVERY.START:
                create(draft, action.payload);
                break;
            case DISCOVERY.UPDATE:
            case DISCOVERY.INTERRUPT:
            case DISCOVERY.FAILED:
            case DISCOVERY.STOP:
            case DISCOVERY.COMPLETE:
                update(draft, action.payload);
                break;
            // no default
        }
    });
};
