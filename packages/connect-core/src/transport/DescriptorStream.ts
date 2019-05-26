// This file reads descriptor with very little logic, and sends it to layers above
import { EventEmitter } from 'events';
import { Transport, TrezorDeviceInfoWithSession as DeviceDescriptor } from 'trezor-link';
import {
    TRANSPORT,
    DEVICE,
    Utils,
} from '@trezor/connect';

import DataManager from '../data/DataManager';
// import type { Transport, TrezorDeviceInfoWithSession as DeviceDescriptor } from 'trezor-link';

const _log = Utils.initLog('DescriptorStream');

namespace DescriptorStream {
    // actual low-level transport, from trezor-link
    let transport: Transport;

    // if the transport works
    let listening: boolean = false;

    // if transport fetch API rejects (when computer goes to sleep)
    let listenTimestamp: number = 0;

    // null if nothing
    export let current: Array<DeviceDescriptor> | null = null;
    export let upcoming: Array<DeviceDescriptor> = [];

    export const eventEmitter = new EventEmitter();

    export interface DeviceDescriptorDiff {
        didUpdate: boolean,
        connected: Array<DeviceDescriptor>,
        disconnected: Array<DeviceDescriptor>,
        changedSessions: Array<DeviceDescriptor>,
        acquired: Array<DeviceDescriptor>,
        released: Array<DeviceDescriptor>,
        changedDebugSessions: Array<DeviceDescriptor>,
        debugAcquired: Array<DeviceDescriptor>,
        debugReleased: Array<DeviceDescriptor>,
        descriptors: Array<DeviceDescriptor>,
    };

    export function init(t: Transport) {
        transport = t;
        return DescriptorStream;
    }

        // emits changes
    export async function listen() {
        // if we are not enumerating for the first time, we can let
        // the transport to block until something happens
        const waitForEvent = current !== null;
        const c: DeviceDescriptor[] = current || [];

        listening = true;

        let descriptors: DeviceDescriptor[];
        try {
            _log.debug('Start listening', c);
            listenTimestamp = new Date().getTime();
            descriptors = waitForEvent ? await transport.listen(c) : await transport.enumerate();
            if (listening && !waitForEvent) {
                // enumerate returns some value
                // TRANSPORT.START will be emitted from DeviceList after device will be available (either acquired or unacquired)
                if (descriptors.length > 0 && DataManager.getSettings('pendingTransportEvent')) {
                    eventEmitter.emit(TRANSPORT.START_PENDING);
                } else {
                    eventEmitter.emit(TRANSPORT.START);
                }
            }
            if (!listening) return; // do not continue if stop() was called

            upcoming = descriptors;
            _log.debug('Listen result', descriptors);
            reportChanges();
            if (listening) listen(); // handlers might have called stop()
        } catch (error) {
            const time = new Date().getTime() - listenTimestamp;
            _log.debug('Listen error', 'timestamp', time, typeof error);

            if (time > 1100) {
                await Utils.resolveAfter(1000, null);
                if (listening) listen();
            } else {
                _log.log('Transport error');
                eventEmitter.emit(TRANSPORT.ERROR, error);
            }
        }
    }

    export async function enumerate() {
        if (!listening) return;
        try {
            upcoming = await transport.enumerate();
            reportChanges();
        } catch (error) {
            // empty
        }
    }

    export function stop() {
        listening = false;
    }

    function diff(currentN: Array<DeviceDescriptor> | null, descriptors: Array<DeviceDescriptor>): DeviceDescriptorDiff {
        const current = currentN || [];
        const connected = descriptors.filter(d => {
            return current.find(x => {
                return x.path === d.path;
            }) === undefined;
        });
        const disconnected = current.filter(d => {
            return descriptors.find(x => {
                return x.path === d.path;
            }) === undefined;
        });
        const changedSessions = descriptors.filter(d => {
            const currentDescriptor = current.find(x => {
                return x.path === d.path;
            });
            if (currentDescriptor) {
                // return currentDescriptor.debug ? (currentDescriptor.debugSession !== d.debugSession) : (currentDescriptor.session !== d.session);
                return currentDescriptor.session !== d.session;
            } else {
                return false;
            }
        });
        const acquired = changedSessions.filter(d => {
            return typeof d.session === 'string';
        });
        const released = changedSessions.filter(d => {
            // const session = descriptor.debug ? descriptor.debugSession : descriptor.session;
            return typeof d.session !== 'string';
        });

        const changedDebugSessions = descriptors.filter(d => {
            const currentDescriptor = current.find(x => {
                return x.path === d.path;
            });
            if (currentDescriptor) {
                return currentDescriptor.debugSession !== d.debugSession;
            } else {
                return false;
            }
        });
        const debugAcquired = changedSessions.filter(d => {
            return typeof d.debugSession === 'string';
        });
        const debugReleased = changedSessions.filter(d => {
            return typeof d.debugSession !== 'string';
        });

        const didUpdate = (connected.length + disconnected.length + changedSessions.length + changedDebugSessions.length) > 0;

        return {
            connected,
            disconnected,
            changedSessions,
            acquired,
            released,
            changedDebugSessions,
            debugAcquired,
            debugReleased,
            didUpdate,
            descriptors,
        };
    }

    function reportChanges() {
        const difference = diff(current, upcoming);
        current = upcoming;

        if (difference.didUpdate && listening) {
            difference.connected.forEach(d => {
                eventEmitter.emit(DEVICE.CONNECT, d);
            });
            difference.disconnected.forEach(d => {
                eventEmitter.emit(DEVICE.DISCONNECT, d);
            });
            difference.acquired.forEach(d => {
                eventEmitter.emit(DEVICE.ACQUIRED, d);
            });
            difference.released.forEach(d => {
                eventEmitter.emit(DEVICE.RELEASED, d);
            });
            difference.changedSessions.forEach(d => {
                eventEmitter.emit(DEVICE.CHANGED, d);
            });
            eventEmitter.emit(TRANSPORT.UPDATE, difference);
        }
    }
}

export default DescriptorStream;









/*
class DescriptorStream1 extends EventEmitter {
    // actual low-level transport, from trezor-link
    transport: Transport;

    // if the transport works
    listening: boolean = false;

    // if transport fetch API rejects (when computer goes to sleep)
    listenTimestamp: number = 0;

    // null if nothing
    current: Array<DeviceDescriptor> | null = null;
    upcoming: Array<DeviceDescriptor> = [];

    constructor(transport: Transport) {
        super();
        this.transport = transport;
        _log.enabled = DataManager.getSettings('debug');
    }

    // emits changes
    async listen(): Promise<void> {
        // if we are not enumerating for the first time, we can let
        // the transport to block until something happens
        const waitForEvent: boolean = this.current !== null;
        const current: Array<DeviceDescriptor> = this.current || [];

        this.listening = true;

        let descriptors: Array<DeviceDescriptor>;
        try {
            _log.debug('Start listening', current);
            this.listenTimestamp = new Date().getTime();
            descriptors = waitForEvent ? await this.transport.listen(current) : await this.transport.enumerate();
            if (this.listening && !waitForEvent) {
                // enumerate returns some value
                // TRANSPORT.START will be emitted from DeviceList after device will be available (either acquired or unacquired)
                if (descriptors.length > 0 && DataManager.getSettings('pendingTransportEvent')) {
                    this.emit(TRANSPORT.START_PENDING);
                } else {
                    this.emit(TRANSPORT.START);
                }
            }
            if (!this.listening) return; // do not continue if stop() was called

            this.upcoming = descriptors;
            _log.debug('Listen result', descriptors);
            this._reportChanges();
            if (this.listening) this.listen(); // handlers might have called stop()
        } catch (error) {
            const time = new Date().getTime() - this.listenTimestamp;
            _log.debug('Listen error', 'timestamp', time, typeof error);

            if (time > 1100) {
                await Utils.resolveAfter(1000, null);
                if (this.listening) this.listen();
            } else {
                _log.log('Transport error');
                this.emit(TRANSPORT.ERROR, error);
            }
        }
    }

    async enumerate(): Promise<void> {
        if (!this.listening) return;
        try {
            this.upcoming = await this.transport.enumerate();
            this._reportChanges();
        } catch (error) {
            // empty
        }
    }

    stop(): void {
        this.listening = false;
    }

    _diff(currentN: Array<DeviceDescriptor> | null, descriptors: Array<DeviceDescriptor>): DeviceDescriptorDiff {
        const current = currentN || [];
        const connected = descriptors.filter(d => {
            return current.find(x => {
                return x.path === d.path;
            }) === undefined;
        });
        const disconnected = current.filter(d => {
            return descriptors.find(x => {
                return x.path === d.path;
            }) === undefined;
        });
        const changedSessions = descriptors.filter(d => {
            const currentDescriptor = current.find(x => {
                return x.path === d.path;
            });
            if (currentDescriptor) {
                // return currentDescriptor.debug ? (currentDescriptor.debugSession !== d.debugSession) : (currentDescriptor.session !== d.session);
                return currentDescriptor.session !== d.session;
            } else {
                return false;
            }
        });
        const acquired = changedSessions.filter(d => {
            return typeof d.session === 'string';
        });
        const released = changedSessions.filter(d => {
            // const session = descriptor.debug ? descriptor.debugSession : descriptor.session;
            return typeof d.session !== 'string';
        });

        const changedDebugSessions = descriptors.filter(d => {
            const currentDescriptor = current.find(x => {
                return x.path === d.path;
            });
            if (currentDescriptor) {
                return currentDescriptor.debugSession !== d.debugSession;
            } else {
                return false;
            }
        });
        const debugAcquired = changedSessions.filter(d => {
            return typeof d.debugSession === 'string';
        });
        const debugReleased = changedSessions.filter(d => {
            return typeof d.debugSession !== 'string';
        });

        const didUpdate = (connected.length + disconnected.length + changedSessions.length + changedDebugSessions.length) > 0;

        return {
            connected,
            disconnected,
            changedSessions,
            acquired,
            released,
            changedDebugSessions,
            debugAcquired,
            debugReleased,
            didUpdate,
            descriptors,
        };
    }

    _reportChanges(): void {
        const diff = this._diff(this.current, this.upcoming);
        this.current = this.upcoming;

        if (diff.didUpdate && this.listening) {
            diff.connected.forEach(d => {
                this.emit(DEVICE.CONNECT, d);
            });
            diff.disconnected.forEach(d => {
                this.emit(DEVICE.DISCONNECT, d);
            });
            diff.acquired.forEach(d => {
                this.emit(DEVICE.ACQUIRED, d);
            });
            diff.released.forEach(d => {
                this.emit(DEVICE.RELEASED, d);
            });
            diff.changedSessions.forEach(d => {
                this.emit(DEVICE.CHANGED, d);
            });
            this.emit(TRANSPORT.UPDATE, diff);
        }
    }
}
*/