declare module 'trezor-link' {

    interface TrezorDeviceInfo {
        path: string;
    }

    export interface TrezorDeviceInfoWithSession {
        path: string;
        debug?: boolean | null;
        session?: string | null;
        debugSession?: string | null;
    }

    interface AcquireInput {
        path: string;
        previous?: string | null | undefined;
    }
      
    interface MessageFromTrezor {
        type: string;
        message: Object;
    }

    export interface Transport {
        enumerate(): Promise<Array<TrezorDeviceInfoWithSession>>;
        listen(old?: Array<TrezorDeviceInfoWithSession>): Promise<Array<TrezorDeviceInfoWithSession>>;
        acquire(input: AcquireInput, debugLink: boolean): Promise<string>;
        release(session: string, onclose: boolean, debugLink: boolean): Promise<void>;
        configure(signedData: string): Promise<void>;
        call(session: string, name: string, data: Object, debugLink: boolean): Promise<MessageFromTrezor>;
        post(session: string, name: string, data: Object, debugLink: boolean): Promise<void>;
        read(session: string, debugLink: boolean): Promise<MessageFromTrezor>;

        // resolves when the transport can be used; rejects when it cannot
        init(debug?: boolean): Promise<void>;
        stop(): void;

        configured: boolean;
        version: string;
        name: string;
        activeName?: string;

        // webusb has a different model, where you have to
        // request device connection
        requestDevice: () => Promise<void>;
        requestNeeded: boolean;

        isOutdated: boolean;
        setBridgeLatestUrl(url: string): void;

        activeTransport?: Transport;
        plugin?: Transport;
    }

    export class BridgeV2 implements Transport {
        constructor(url?: string, newestVersionUrl?: string, newVersion?: string);
        enumerate(): Promise<Array<TrezorDeviceInfoWithSession>>;
        listen(old?: Array<TrezorDeviceInfoWithSession>): Promise<Array<TrezorDeviceInfoWithSession>>;
        acquire(input: AcquireInput, debugLink: boolean): Promise<string>;
        release(session: string, onclose: boolean, debugLink: boolean): Promise<void>;
        configure(signedData: string): Promise<void>;
        call(session: string, name: string, data: Object, debugLink: boolean): Promise<MessageFromTrezor>;
        post(session: string, name: string, data: Object, debugLink: boolean): Promise<void>;
        read(session: string, debugLink: boolean): Promise<MessageFromTrezor>;

        // resolves when the transport can be used; rejects when it cannot
        init(debug?: boolean): Promise<void>;
        stop(): void;

        configured: boolean;
        version: string;
        name: string;
        activeName?: string;

        // webusb has a different model, where you have to
        // request device connection
        requestDevice: () => Promise<void>;
        requestNeeded: boolean;

        isOutdated: boolean;
        setBridgeLatestUrl(url: string): void;

        static setFetch(fetch: any, isNode?: boolean): void;
    }

    export class WebUsb implements Transport {
        constructor();
        enumerate(): Promise<Array<TrezorDeviceInfoWithSession>>;
        listen(old?: Array<TrezorDeviceInfoWithSession>): Promise<Array<TrezorDeviceInfoWithSession>>;
        acquire(input: AcquireInput, debugLink: boolean): Promise<string>;
        release(session: string, onclose: boolean, debugLink: boolean): Promise<void>;
        configure(signedData: string): Promise<void>;
        call(session: string, name: string, data: Object, debugLink: boolean): Promise<MessageFromTrezor>;
        post(session: string, name: string, data: Object, debugLink: boolean): Promise<void>;
        read(session: string, debugLink: boolean): Promise<MessageFromTrezor>;

        // resolves when the transport can be used; rejects when it cannot
        init(debug?: boolean): Promise<void>;
        stop(): void;

        configured: boolean;
        version: string;
        name: string;
        activeName?: string;

        // webusb has a different model, where you have to
        // request device connection
        requestDevice: () => Promise<void>;
        requestNeeded: boolean;

        isOutdated: boolean;
        setBridgeLatestUrl(url: string): void;
    }


    export class Lowlevel implements Transport {
        constructor(plugin: Transport, sharedWorkerFactory?: () => SharedWorker.SharedWorker | null);
        enumerate(): Promise<Array<TrezorDeviceInfoWithSession>>;
        listen(old?: Array<TrezorDeviceInfoWithSession>): Promise<Array<TrezorDeviceInfoWithSession>>;
        acquire(input: AcquireInput, debugLink: boolean): Promise<string>;
        release(session: string, onclose: boolean, debugLink: boolean): Promise<void>;
        configure(signedData: string): Promise<void>;
        call(session: string, name: string, data: Object, debugLink: boolean): Promise<MessageFromTrezor>;
        post(session: string, name: string, data: Object, debugLink: boolean): Promise<void>;
        read(session: string, debugLink: boolean): Promise<MessageFromTrezor>;

        // resolves when the transport can be used; rejects when it cannot
        init(debug?: boolean): Promise<void>;
        stop(): void;

        configured: boolean;
        version: string;
        name: string;
        activeName?: string;

        // webusb has a different model, where you have to
        // request device connection
        requestDevice: () => Promise<void>;
        requestNeeded: boolean;

        isOutdated: boolean;
        setBridgeLatestUrl(url: string): void;
    }

    export class Fallback implements Transport {
        constructor(transports: Array<Transport>);
        enumerate(): Promise<Array<TrezorDeviceInfoWithSession>>;
        listen(old?: Array<TrezorDeviceInfoWithSession>): Promise<Array<TrezorDeviceInfoWithSession>>;
        acquire(input: AcquireInput, debugLink: boolean): Promise<string>;
        release(session: string, onclose: boolean, debugLink: boolean): Promise<void>;
        configure(signedData: string): Promise<void>;
        call(session: string, name: string, data: Object, debugLink: boolean): Promise<MessageFromTrezor>;
        post(session: string, name: string, data: Object, debugLink: boolean): Promise<void>;
        read(session: string, debugLink: boolean): Promise<MessageFromTrezor>;

        // resolves when the transport can be used; rejects when it cannot
        init(debug?: boolean): Promise<void>;
        stop(): void;

        configured: boolean;
        version: string;
        name: string;
        activeName?: string;

        // webusb has a different model, where you have to
        // request device connection
        requestDevice: () => Promise<void>;
        requestNeeded: boolean;

        isOutdated: boolean;
        setBridgeLatestUrl(url: string): void;

        activeTransport: Transport;
    }
    
    // export const TrezorLink: {
    //     BridgeV2: typeof BridgeV2;
    //     WebUsb: typeof WebUsb;
    //     Lowlevel: typeof Lowlevel;
    //     Fallback: typeof Fallback;
    // };

    // export default TrezorLink;
}