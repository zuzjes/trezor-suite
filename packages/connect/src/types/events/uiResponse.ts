/* @flow */
import * as UI from '../../constants/ui';
import { Device } from '../trezor/device';

/*
* Messages from UI
*/

export declare namespace UiResponse {

    export type ReceivePermission = {
        type: typeof UI.RECEIVE_PERMISSION,
        payload: {
            granted: boolean,
            remember: boolean,
        },
    }
    
    export type ReceiveConfirmation = {
        type: typeof UI.RECEIVE_CONFIRMATION,
        payload: boolean,
    }
    
    export type ReceiveDevice = {
        type: typeof UI.RECEIVE_DEVICE,
        payload: {
            device: Device.TrezorDevice,
            remember: boolean,
        },
    }
    
    export type ReceivePin = {
        type: typeof UI.RECEIVE_PIN,
        payload: string,
    }
    
    export type ReceiveWord = {
        type: typeof UI.RECEIVE_WORD,
        payload: string,
    }
    
    export type ReceivePassphrase = {
        type: typeof UI.RECEIVE_PASSPHRASE,
        payload: {
            save: boolean,
            value: string,
        },
    }
    
    export type ReceivePassphraseAction = {
        type: typeof UI.INVALID_PASSPHRASE_ACTION,
        payload: boolean,
    }
    
    export type ReceiveAccount = {
        type: typeof UI.RECEIVE_ACCOUNT,
        payload?: string,
    }
    
    export type ReceiveFee = {
        type: typeof UI.RECEIVE_FEE,
        payload: {
            type: 'compose-custom',
            value: number,
        } | {
            type: 'change-account',
        } | {
            type: 'send',
            value: string,
        },
    }
    
    /*
    * Callback message for CustomMessage method
    */
    
    export type CustomMessageRequest = {
        type: typeof UI.CUSTOM_MESSAGE_REQUEST,
        payload: {
            type: string,
            message: any,
        },
    }
    
    export type AnyType =
        ReceivePermission
        | ReceiveConfirmation
        | ReceiveDevice
        | ReceivePin
        | ReceiveWord
        | ReceivePassphrase
        | ReceivePassphraseAction
        | ReceiveAccount
        | ReceiveFee
        | CustomMessageRequest;
    
    // Additional mapping by [type]: payload for event emitter
    export type Keys = {
        [K in ReceivePermission['type']]: ReceivePermission['payload']
    } & {
        [K in ReceiveConfirmation['type']]: ReceiveConfirmation['payload']
    } & {
        [K in ReceiveDevice['type']]: ReceiveDevice['payload']
    } & {
        [K in ReceivePin['type']]: ReceivePin['payload']
    } & {
        [K in ReceivePassphrase['type']]: ReceivePassphrase['payload']
    } & {
        [K in ReceivePassphraseAction['type']]: ReceivePassphraseAction['payload']
    } & {
        [K in ReceiveAccount['type']]: ReceiveAccount['payload']
    } & {
        [K in ReceiveFee['type']]: ReceiveFee['payload']
    } & {
        [K in CustomMessageRequest['type']]: CustomMessageRequest['payload']
    } & {
        [K in ReceiveWord['type']]: ReceiveWord['payload']
    };

}
