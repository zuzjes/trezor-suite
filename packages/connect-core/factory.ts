import TrezorConnect, {
    setFactory,
    eventEmitter,
    messagePromises,
    EVENTS,
    UI,
    POPUP,
    ERRORS,
    IFRAME,
    Utils,
    CommonTypes,
    Messages,
    UiResponse,
    Params,
    Response,
    MessageBuilder,
} from '@trezor/connect';

import Core from './src/index';

const _log = Utils.initLog('[@connect-core]');

const init = async (settings: CommonTypes.Settings) => {
    if (Core.initialized) return;

    // set defaults for node
    // settings.origin = 'http://node.trezor.io/';
    // settings.popup = false;
    // settings.env = 'node';

    if (!Core.getSettings()) {
        Core.setSettings(Utils.parseSettings({
            ...settings,
            origin: 'http://node.trezor.io/',
            popup: false,
            env: 'node',
        }));
    }

    // if (!props.settings.manifest) {
    //     throw ERRORS.MANIFEST_NOT_SET;
    // }

    // TrezorConnect.init was called wit "lazyLoad" option
    // reset lazyLoad settings and do not initialize the Core,
    // init will be called once again after TrezorConnect.method call
    const s = Core.getSettings();
    if (s && s.lazyLoad) {
        Core.setSettings({
            ...s,
            lazyLoad: false,
        });
        return;
    }

    Core.eventEmitter.on(EVENTS.CORE_EVENT, handleMessage);
    await Core.init();
}

// const call = async (method: string, params: Params.All): Promise<Response.All> => {
const call = async <P extends object, R extends Response.Unsuccessful = Response.Unsuccessful>(method: string, params?: P): Promise<R | Response.Unsuccessful> => {
// const call = async (method: string, params: any): Promise<any> => {
    if (!Core.initialized) {
        // auto init with default settings
        try {
            const settings = Utils.parseSettings({ debug: false, popup: false });
            await init(settings);
        } catch (error) {
            console.log("CATCH ERR", error)
            return { success: false, payload: { error } };
        }
    }

    try {
        const response = await postMessage({ type: IFRAME.CALL, id: messagePromises.length, payload: { method, ...(params as Params.AnyType) } });
        if (response) {
            return response as R;
        } else {
            return { success: false, payload: { error: 'No response from iframe' } };
        }
    } catch (error) {
        _log.error('__call error', error);
        return { success: false, payload: { error } };
    }
}

// send message to core
// const postMessage = async (message: Messages.CoreMessageIn & { method: string }, usePromise: boolean = true): Promise<Response.All | void> => {
// const postMessage = async (message: any, usePromise: boolean = true): Promise<Response.All | void> => {
const postMessage = async <R>(message: Messages.CoreMessageIn, usePromise: boolean = true): Promise<R | void> => {
    if (!usePromise) {
        Core.handleMessage(message, true);
        return;
    }

    const id = messagePromises.length;
    const dfd = Utils.createDeferred<R>();
    messagePromises[id] = dfd;
    Core.handleMessage(message, true);
    return dfd.promise;
};

// handle message received from core
const handleMessage = (message: Messages.CoreMessage & { id?: number }): void => {
    // handle method response
    if (message.event === EVENTS.RESPONSE_EVENT) {
        const id = message.id || 0;
        if (messagePromises[id]) {
            // clear unnecessary fields from response object
            delete message.type;
            delete message.event;
            // delete message.id;
            // resolve message promise (send result of call method)
            messagePromises[id].resolve(message);
            delete messagePromises[id];
        } else {
            _log.warn(`Unknown message id ${id}`);
        }
        return;
    }

    // automatically resolve popup request
    if (message.type === UI.REQUEST_UI_WINDOW) {
        postMessage({ type: POPUP.HANDSHAKE }, false);
        return;
    }

    // emit events
    switch (message.event) {
        case EVENTS.DEVICE_EVENT :
        case EVENTS.TRANSPORT_EVENT :
        case EVENTS.BLOCKCHAIN_EVENT :
        case EVENTS.UI_EVENT :
            const { event } = message;
            // clear unnecessary fields from message object
            delete message.event;
            delete message.id;
            eventEmitter.emit(event, message);
            eventEmitter.emit(message.type, message.payload); // emit single type events
            break;
        default:
            _log.log('Undefined message', message);
            break;
    }
}

//export default TrezorConnectFactory({
setFactory({
    init,
    manifest: (data) => {
        Core.setSettings(Utils.parseSettings({
            manifest: data,
        }));
    },
    call,
    uiResponse: response => postMessage(response, false),

    // TODO: type responses
    // uiResponse: (response: UiResponse) => {
    //     postMessage({ event: EVENTS.UI_EVENT, ...response }, false);
    // },
    // customMessage: (params: any) => {
    //     // do handling
    // },
    // requestLogin: (params: any) => {
    //     // do handling
    // },
    // dispose: () => {

    // },
    // cancel: () => {
        
    // },
    // renderWebUSBButton: (className) => {

    // },
});

export default TrezorConnect;
// TODO: export const and types up

// TrezorConnect.blockchainDisconnect({coin: "btc"});

const test = async () => {

    TrezorConnect.on(EVENTS.UI_EVENT, e => {
        console.log("UI_EVENT", e)
    })

    TrezorConnect.on(EVENTS.DEVICE_EVENT, e => {
        console.log("DEVICE_EVENT", e)
    })

    TrezorConnect.on(EVENTS.TRANSPORT_EVENT, e => {
        console.log("TRANSPORT_EVENT", e)
    })

    await TrezorConnect.init({
        debug: true,
        lazyLoad: true,
        // webusb: false,
        // transportReconnect: true,
    });

    // const r = TrezorConnect.blockchainDisconnect({coin: "btc"});
    const r = await TrezorConnect.getAddress({path: "btc"});
    if (r.success) {
        r.payload
    }

    const r1 = await TrezorConnect.getAddress({ bundle: [{path: "btc"}] } );
    if (r1.success) {
        r1.payload
    }
}

test();



/*
const c = TrezorConnectApi;
c.manifest({
    email: "a",
    appUrl: UI.RECEIVE_ACCOUNT
})

const s = c.on(EVENTS.UI_EVENT, e => {
    if (e.type === "ui-close_window")
        e.payload
    if (e.type === "ui-bundle_progress")
        e.payload
});

const sn = c.on(EVENTS.DEVICE_EVENT, e => {
    if (e.type === 'button') {
        e.payload
    } else {
        e.payload
    }
});

const sn1 = c.on("button", d => {
    if (d.device.type === "acquired")
        d.device.features
})

eventEmitter.emit("ui-close_window", undefined);
eventEmitter.emit("transport-error", { error: "A", bridge: { bridgeInfoTODO: 1 }});
eventEmitter.emit("transport-error");
eventEmitter.emit("TRANSPORT_EVENT", { type: "transport-error", payload: { error: "A", bridge: { bridgeInfoTODO: 1 } } });

eventEmitter.on("ui-close_window", (d) => {

});

eventEmitter.on("transport-error", (d) => {
    
});


MessageBuilder.UiMessage("ui-request_window");
MessageBuilder.UiMessage("ui-request_confirmation", { view: "A" });
MessageBuilder.UiMessage("ui-request_confirmation", 1);

const func = async () => {
    const res = await c.getAddress({
        bundle: [
            { path: "m" }
        ]
    })

    if (res.success) {
        res.payload
    }
    
    const res1 = await c.getAddress({ path: "m" })

    if (res1.success) {
        res1.payload
    }

    const res3 = await c.blockchainDisconnect({
        coin: "btc"
    })

    if (res3.success) {
        res3.payload
    }
}
*/
