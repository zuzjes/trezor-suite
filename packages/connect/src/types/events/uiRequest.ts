import * as POPUP from '../../constants/popup';
import * as IFRAME from '../../constants/iframe';
import * as UI from '../../constants/ui';
import { Device } from '../trezor/device';
import { CommonTypes } from '../index';
import { Account } from '../account';
import { Coins } from '../coins';
import { Fee } from '../fee';

export declare namespace UiRequest {

    export type TransportInfo = {
        type: string,
        version: string,
        outdated: boolean,
    }
    
    export type BrowserState = {
        name: string,
        osname: string,
        supported: boolean,
        outdated: boolean,
        mobile: boolean,
    }
    
    /*
    * Messages without payload
    */
    
    export type MessageWithoutPayload = {
        type: typeof UI.REQUEST_UI_WINDOW |
            typeof POPUP.CANCEL_POPUP_REQUEST |
            typeof POPUP.LOADED |
            typeof UI.TRANSPORT |
            typeof UI.RECEIVE_BROWSER |
            typeof UI.CHANGE_ACCOUNT |
            typeof UI.INSUFFICIENT_FUNDS |
            typeof UI.CLOSE_UI_WINDOW |
            typeof UI.LOGIN_CHALLENGE_REQUEST;
        payload?: undefined;
    }
    
    /*
    * Common message to UI with assigned device
    */
    
    export type DeviceMessage = {
        type: typeof UI.REQUEST_PIN |
            typeof UI.INVALID_PIN |
            typeof UI.REQUEST_PASSPHRASE_ON_DEVICE |
            typeof UI.REQUEST_PASSPHRASE |
            typeof UI.INVALID_PASSPHRASE |
            typeof UI.REQUEST_WORD,
        payload: {
            device: Device.TrezorDevice,
            type?: string, // todo: better flow enum
        },
    };
    
    export type ButtonRequestAddressData = {
        type: 'address',
        serializedPath: string,
        address: string,
    };
    
    export type ButtonRequestData = ButtonRequestAddressData;
    
    export type ButtonRequestMessage = {
        type: typeof UI.REQUEST_BUTTON,
        payload: {
            device: Device.TrezorDevice,
            code: string,
            data?: ButtonRequestData,
        },
    }
    
    export type AddressValidationMessage = {
        type: typeof UI.ADDRESS_VALIDATION,
        payload?: ButtonRequestData,
    }
    
    /*
    * Messages to UI
    */
    
    export type IFrameLoaded = {
        type: typeof IFRAME.LOADED,
        payload: {
            browser: BrowserState,
        },
    }
    
    export type IFrameError = {
        type: typeof IFRAME.ERROR,
        payload: {
            browser: BrowserState,
            error: string,
        },
    }
    
    export type PopupInit = {
        type: typeof POPUP.INIT,
        payload: {
            settings: CommonTypes.ApiSettings, // those are settings from window.opener
        },
    }
    
    export type PopupError = {
        type: typeof POPUP.ERROR,
        payload: {
            error: string,
        },
    }
    
    export type PopupHandshake = {
        type: typeof POPUP.HANDSHAKE,
        payload?: {
            settings: CommonTypes.ApiSettings, // those are settings from the iframe, they could be different from window.opener settings
            method?: string,
            transport?: TransportInfo,
        },
    }
    
    export type RequestPermission = {
        type: typeof UI.REQUEST_PERMISSION,
        payload: {
            permissions: Array<string>,
            device: Device.TrezorDevice,
        },
    }
    
    export type RequestConfirmation = {
        type: typeof UI.REQUEST_CONFIRMATION,
        payload: {
            view: string,
            label?: string,
            customConfirmButton?: {
                className: string,
                label: string,
            },
            customCancelButton?: {
                className: string,
                label: string,
            },
        },
    }
    
    export type SelectDevice = {
        type: typeof UI.SELECT_DEVICE,
        payload: {
            devices: Array<Device.TrezorDevice>,
            webusb: boolean,
        },
    }
    
    export type BrowserMessage = {
        type: typeof UI.BROWSER_NOT_SUPPORTED | typeof UI.BROWSER_OUTDATED,
        payload: BrowserState,
    }
    
    export type UnexpectedDeviceMode = {
        type: typeof UI.BOOTLOADER | typeof UI.INITIALIZE | typeof UI.SEEDLESS | typeof UI.DEVICE_NEEDS_BACKUP,
        payload: Device.TrezorDevice,
    }
    
    export type FirmwareException = {
        type: typeof UI.FIRMWARE_OLD | typeof UI.FIRMWARE_OUTDATED | typeof UI.FIRMWARE_NOT_SUPPORTED | typeof UI.FIRMWARE_NOT_COMPATIBLE,
        payload: Device.TrezorDevice,
    }
    
    export type SelectAccount = {
        type: typeof UI.SELECT_ACCOUNT,
        payload: {
            accounts: Array<Account.Bitcoin>,
            coinInfo: Coins.Bitcoin,
            complete?: boolean,
            start?: boolean,
            checkBalance?: boolean,
        },
    }
    
    export type SelectFee = {
        type: typeof UI.SELECT_FEE,
        payload: {
            coinInfo: Coins.Bitcoin,
            feeLevels: Array<Fee.SelectFeeLevel>,
        },
    }
    
    export type UpdateCustomFee = {
        type: typeof UI.UPDATE_CUSTOM_FEE,
        payload: {
            coinInfo: Coins.Bitcoin,
            level: Fee.SelectFeeLevel,
        },
    }
    
    export type BundleProgress = {
        type: typeof UI.BUNDLE_PROGRESS,
        payload: {
            progress: number,
            response: Object,
        },
    }
    
    export type AnyType =
        MessageWithoutPayload
        | DeviceMessage
        | IFrameLoaded
        | PopupHandshake
        | RequestPermission
        | RequestConfirmation
        | SelectDevice
        | BrowserMessage
        | UnexpectedDeviceMode
        | SelectAccount
        | SelectFee
        | UpdateCustomFee
        | BundleProgress;
    
    // Additional mapping by [type]: payload for event emitter
    export type Keys = {
       [K in MessageWithoutPayload['type']]: MessageWithoutPayload['payload']
    } & {
        [K in AddressValidationMessage['type']]: AddressValidationMessage['payload']
    } & {
        [K in IFrameLoaded['type']]: IFrameLoaded['payload']
    } & {
        [K in PopupError['type']]: PopupError['payload']
    } & {
        [K in DeviceMessage['type']]: DeviceMessage['payload']
    } & {
        [K in PopupError['type']]: PopupError['payload']
    } & {
        [K in PopupHandshake['type']]: PopupHandshake['payload']
    } & {
        [K in RequestPermission['type']]: RequestPermission['payload']
    } & {
        [K in RequestConfirmation['type']]: RequestConfirmation['payload']
    } & {
        [K in SelectDevice['type']]: SelectDevice['payload']
    } & {
        [K in BrowserMessage['type']]: BrowserMessage['payload']
    } & {
        [K in UnexpectedDeviceMode['type']]: UnexpectedDeviceMode['payload']
    } & {
        [K in FirmwareException['type']]: FirmwareException['payload']
    } & {
        [K in SelectAccount['type']]: SelectAccount['payload']
    } & {
        [K in SelectFee['type']]: SelectFee['payload']
    } & {
        [K in UpdateCustomFee['type']]: UpdateCustomFee['payload']
    } & {
        [K in BundleProgress['type']]: BundleProgress['payload']
    }

}


