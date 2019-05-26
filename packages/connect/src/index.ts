import { EventEmitter } from 'events';

import * as BLOCKCHAIN from './constants/blockchain';
import * as DEVICE from './constants/device';
import * as ERRORS from './constants/errors';
import * as EVENTS from './constants/events';
import * as IFRAME from './constants/iframe';
import * as POPUP from './constants/popup';
import * as TRANSPORT from './constants/transport';
import * as UI from './constants/ui';

export {
    BLOCKCHAIN,
    DEVICE,
    ERRORS,
    EVENTS,
    IFRAME,
    POPUP,
    TRANSPORT,
    UI,
};

import * as utils from './utils';
export const Utils = utils;

import * as builder from './message/builder';
export const MessageBuilder = builder;

import { CommonTypes } from './types';
import { Events } from './types/events/index';
import { UiResponse } from './types/events/uiResponse';
import { Params } from './types/params';
import { Response } from './types/response';

export * from './types';

interface Emitter {
    on<K extends keyof Events>(type: K, listener: (event: Events[K]) => void): this;
    off<K extends keyof Events>(type: K, listener: (event: Events[K]) => void): this;
    emit<K extends keyof Events>(type: K, ...args: Events[K][]): boolean;
}

export const eventEmitter = new EventEmitter() as Emitter;
export const messagePromises: CommonTypes.Deferred<any>[] = [];

export namespace TrezorConnect {

    export function init(settings: CommonTypes.Settings): Promise<void> {
        return factory.init(settings);
    }

    export function manifest(data: CommonTypes.Manifest) {
        factory.manifest(data);
    }

    export function on<K extends keyof Events>(type: K, listener: (event: Events[K]) => void) {
        eventEmitter.on(type, listener)
    }

    export function off<K extends keyof Events>(type: K, listener: (event: Events[K]) => void) {
        eventEmitter.off(type, listener)
    }

    export function uiResponse(response: UiResponse.AnyType): void {
        factory.uiResponse(response);
    }

    export function blockchainDisconnect(params: Params.BlockchainDisconnect): Promise<Response.BlockchainDisconnect> {
        return factory.call('blockchainDisconnect', params);
    }

    export function getAddress(params: Params.GetAddress): Promise<Response.GetAddress>;
    export function getAddress(params: Params.GetAddressBundle): Promise<Response.GetAddressBundle> 
    export function getAddress(params: any) {
        return factory.call('getAddress', params);
    }

    export function noParams(): Promise<Response.BlockchainDisconnect> {
        return factory.call('blockchainDisconnect');
    }
}

interface Factory {
    init: typeof TrezorConnect.init;
    manifest: typeof TrezorConnect.manifest;
    call: <P extends object, R>(method: string, params?: P) => Promise<R | Response.Unsuccessful>;
    // call: <P, R>(method: string, params: P) => R;
    uiResponse: typeof TrezorConnect.uiResponse;
}

const NOT_IMPLEMENTED = new Error('Factory not implemented');
let factory: Factory = {
    init: () => {
        throw NOT_IMPLEMENTED;
    },
    manifest: () => {
        throw NOT_IMPLEMENTED;
    },
    call: () => {
        throw NOT_IMPLEMENTED;
    },
    uiResponse: () => {
        throw NOT_IMPLEMENTED;
    }
}

export default TrezorConnect;

export const setFactory = (f: Factory) => {
    factory = f;
}