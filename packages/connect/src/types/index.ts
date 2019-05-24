import { Device } from './trezor/device';

export declare namespace CommonTypes {

    interface Deferred<T> {
        id?: string,
        device?: Device.TrezorDevice,
        promise: Promise<T>,
        resolve: (t: T) => void,
        reject: (e: Error) => void,
    }

    interface Manifest {
        email: string,
        appUrl: string,
    }
    
    interface ApiSettings {
        configSrc: string, // constant
        version: string, // constant
        debug: boolean,
        origin?: string,
        hostLabel?: string,
        hostIcon?: string,
        priority: number,
        trustedHost: boolean,
        connectSrc: string,
        iframeSrc: string,
        popup: boolean,
        popupSrc: string,
        webusbSrc: string,
        transportReconnect: boolean,
        webusb: boolean,
        pendingTransportEvent: boolean,
        supportedBrowser?: boolean,
        extension?: string,
        manifest?: Manifest,
        env: string,
        timestamp: number,
        lazyLoad: boolean,
    }

}

export * from './events';
export * from './trezor/protobuf';
export * from './trezor/device';
export * from './account';
export * from './coins';
export * from './fee';
export * from './messages';
export * from './params';
export * from './response';
