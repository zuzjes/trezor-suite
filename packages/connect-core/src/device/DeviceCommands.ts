import { Transport } from 'trezor-link';
import Device from './Device';

export default class DeviceCommands {
    device: Device;
    transport: Transport;
    sessionId: string;
    debug: boolean;
    disposed: boolean;
    constructor(
        device: Device,
        transport: Transport,
        sessionId: string
    ) {
        this.device = device;
        this.transport = transport;
        this.sessionId = sessionId;
        this.debug = false;
        this.disposed = false;
    }

    dispose(): void {
        this.disposed = true;
    }

    // async initialize(useEmptyPassphrase: boolean = false): Promise<DefaultMessageResponse> {
    async initialize(useEmptyPassphrase: boolean = false): Promise<any> {
        if (this.disposed) {
            throw new Error('DeviceCommands already disposed');
        }

        // const payload = {};
        // if (!this.device.isT1()) {
        //     // T2 features
        //     payload.state = this.device.getExpectedState() || this.device.getState();
        //     if (useEmptyPassphrase) {
        //         payload.skip_passphrase = useEmptyPassphrase;
        //         payload.state = null;
        //     }
        // }

        // const response = await this.call('Initialize', payload);
        // assertType(response, 'Features');
        // return response;
    }


    //async typedCall(type: string, resType: string, msg: Object = {}): Promise<DefaultMessageResponse> {
    async typedCall(type: string, resType: string, msg: Object = {}): Promise<any> {
        if (this.disposed) {
            throw new Error('DeviceCommands already disposed');
        }

        // const response: DefaultMessageResponse = await this._commonCall(type, msg);
        // assertType(response, resType);
        // return response;
    }
}