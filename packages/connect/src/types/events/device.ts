import * as DEVICE from '../../constants/device';
import { Device } from '../trezor/device';

export declare namespace DeviceEvent {
    
    type DefaultEvent = {
        type: typeof DEVICE.CONNECT,
        payload: Device.TrezorDevice,
    };
    
    type ButtonEvent = {
        type: typeof DEVICE.BUTTON,
        payload: {
            device: Device.TrezorDevice,
            code: string
        }
    }

    export type AnyType = DefaultEvent | ButtonEvent;

    // Additional mapping by [type]: payload for event emitter
    export type Keys = {
        [K in DefaultEvent['type']]: DefaultEvent['payload']
    } & {
        [K in ButtonEvent['type']]: ButtonEvent['payload']
    };

}
