import { Device } from './trezor/device';

export declare namespace CommonTypes {

    interface Deferred<T> {
        id?: string,
        device?: Device.TrezorDevice,
        promise: Promise<T>,
        resolve: (value?: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void,
    }

    interface Manifest {
        email: string,
        appUrl: string,
    }

    // public settings
    interface Settings {
        debug?: boolean,
        connectSrc?: string,
        popup?: boolean,
        transportReconnect?: boolean,
        webusb?: boolean,
        pendingTransportEvent?: boolean,
        manifest?: Manifest,
        lazyLoad?: boolean,
    }
    
    // inner settings
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