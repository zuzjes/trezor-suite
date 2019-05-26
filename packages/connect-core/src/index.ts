import { EventEmitter } from 'events';
import { 
    DEVICE,
    ERRORS,
    EVENTS,
    IFRAME,
    POPUP,
    TRANSPORT,
    UI,
    Utils,
    MessageBuilder,
    Messages,
    CommonTypes
} from '@trezor/connect';

import DataManager from './data/DataManager';
import DeviceList from './transport';
import Device from './device/Device';

// const { UiMessage, DeviceMessage, TransportMessage, ResponseMessage } = MessageBuilder;

// import AbstractMethod from './methods/AbstractMethod';
// import { find as findMethod } from './methods';

// import { create as createDeferred } from '@trezor/connect/utils/settings';
// import { resolveAfter } from '@trezor/connect/src/utils/promiseUtils';

const _log = Utils.initLog('[@connect-core]');
const eventEmitter = new EventEmitter();
let initialized: boolean = false;

// import { state as browserState } from './utils/browser';

/**
 * Emit message to listener (parent).
 * Clear method reference from _callMethods
 * @param {CoreMessage} message
 * @returns {void}
 * @memberof Core
 */
const postMessage = (message: any): void => {
    // if (message.event === EVENTS.RESPONSE_EVENT) {
    //     const index: number = _callMethods.findIndex(call => call && call.responseID === message.id);
    //     if (index >= 0) { _callMethods.splice(index, 1); }
    // }
    eventEmitter.emit(EVENTS.CORE_EVENT, message);
};


/**
 * Handle incoming message.
 * @param {Messages.CoreMessageIn} message
 * @param {boolean} isTrustedOrigin
 * @returns {void}
 * @memberof Core
 */
export const handleMessage = (message: Messages.CoreMessageIn, isTrustedOrigin: boolean = false): void => {
    _log.log('handle message in core', isTrustedOrigin, message);
    
    const safeMessages: Array<string> = [
        IFRAME.CALL,
        POPUP.CLOSED,
        UI.CHANGE_SETTINGS,
        UI.CUSTOM_MESSAGE_RESPONSE,
        UI.LOGIN_CHALLENGE_RESPONSE,
        TRANSPORT.RECONNECT,
    ];

    if (!isTrustedOrigin && safeMessages.indexOf(message.type) === -1) {
        console.warn('Message not trusted', message);
        return;
    }

    switch (message.type) {
        case POPUP.HANDSHAKE :
            // getPopupPromise(false).resolve();
            break;
        case POPUP.CLOSED :
            // eslint-disable-next-line no-use-before-define
            // onPopupClosed(message.payload ? message.payload.error : null);
            break;

        case TRANSPORT.RECONNECT :
            // eslint-disable-next-line no-use-before-define
            // reconnectTransport();
            break;

        // messages from UI (popup/modal...)
        case UI.RECEIVE_DEVICE :
        case UI.RECEIVE_CONFIRMATION :
        case UI.RECEIVE_PERMISSION :
        case UI.RECEIVE_PIN :
        case UI.RECEIVE_PASSPHRASE :
        case UI.INVALID_PASSPHRASE_ACTION :
        case UI.RECEIVE_ACCOUNT :
        case UI.CHANGE_ACCOUNT :
        case UI.RECEIVE_FEE :
        case UI.RECEIVE_BROWSER :
        // case UI.CUSTOM_MESSAGE_RESPONSE :
        case UI.RECEIVE_WORD:
        // case UI.LOGIN_CHALLENGE_RESPONSE : {
            // const uiPromise = findUiPromise(0, message.type);
            // if (uiPromise) {
            //     uiPromise.resolve({ event: message.type, payload: message.payload });
            //     removeUiPromise(uiPromise);
            // }
            break;
        
        // message from index
        case IFRAME.CALL :
            // eslint-disable-next-line no-use-before-define
            // onCall(message).catch(error => {
            //     _log.debug('onCall error', error);
            // });
            console.log("ELO TU!", message)
            break;
    }
};

/**
 * Module initialization.
 * This will download the config.json and start DeviceList
 * Returns Core, an event emitter instance.
 * @param {Object} settings - optional // TODO
 * @returns {Promise<Core>}
 * @memberof Core
 */
const init = async (): Promise<void> => {
    const settings = DataManager.getSettings();
    if (!settings) throw new Error('No settings!');
    _log.enabled = settings.debug;
    await DataManager.load(settings);
    await initTransport(settings);

    initialized = true;
};

const initTransport = async (settings: CommonTypes.ApiSettings): Promise<void> => {
    if (!settings.transportReconnect) {
        // try only once, if it fails kill app and throw initialization error
        await DeviceList.init(settings, postMessage);
    } else {
        // don't wait for DeviceList result, further communication will be thru TRANSPORT events
        DeviceList.init(settings, postMessage);
    }
};

const reconnectTransport = async (): Promise<void> => {
    if (DataManager.getSettings('transportReconnect')) {
        return;
    }

    // try {
    //     await DeviceList.init(DataManager.getSettings());
    // } catch (error) {
    //     postMessage(new TransportMessage(TRANSPORT.ERROR, {
    //         error: error.message || error,
    //         bridge: DataManager.getLatestBridgeVersion(),
    //     }));
    // }
};

export default {
    eventEmitter,
    initialized,
    setSettings: (settings: CommonTypes.ApiSettings) => {
        DataManager.setSettings(settings);
    },
    getSettings: () => {
        return DataManager.getSettings();
    },

    init,
    handleMessage,

    onBeforeUnload: () => {
        // todo
    },
    getCurrentMethod: () => {
        // todo
    },
    reconnectTransport,
    getTransportInfo: () => {
        // todo
    }
};
