import {
    DEVICE,
    TRANSPORT,
    Utils,
    MessageBuilder,
    CommonTypes,
    Device
} from '@trezor/connect';
import DeviceList from './DeviceList';
import DataManager from '../data/DataManager';

const _log = Utils.initLog('DeviceList');

namespace DeviceListWrapper {

    let initialized: boolean = false;
    let _list: DeviceList | undefined;

    export async function init(settings: CommonTypes.ApiSettings, postMessage: any): Promise<void> {

        _log.enabled = settings.debug;

        try {
            _list = new DeviceList({
                rememberDevicePassphrase: true,
            });
    
            _list.on(DEVICE.CONNECT, (device: Device.TrezorDevice) => {
                // handleDeviceSelectionChanges();
                postMessage(MessageBuilder.DeviceMessage(DEVICE.CONNECT, device));
            });
    
            _list.on(DEVICE.CONNECT_UNACQUIRED, (device: Device.TrezorDevice) => {
                // handleDeviceSelectionChanges();
                postMessage(MessageBuilder.DeviceMessage(DEVICE.CONNECT_UNACQUIRED, device));
            });

            _list.on(DEVICE.DISCONNECT, (device: Device.TrezorDevice) => {
                // handleDeviceSelectionChanges(device);
                postMessage(MessageBuilder.DeviceMessage(DEVICE.DISCONNECT, device));
            });
    
            _list.on(DEVICE.CHANGED, (device: Device.TrezorDevice) => {
                postMessage(MessageBuilder.DeviceMessage(DEVICE.CHANGED, device));
            });
    
            _list.on(TRANSPORT.ERROR, async (error) => {
                _log.warn('TRANSPORT ERROR', error);
                if (_list) {
                    _list.disconnectDevices();
                    _list.removeAllListeners();
                }
    
                _list = undefined;
                postMessage(MessageBuilder.TransportMessage(TRANSPORT.ERROR, {
                    error: error.message || error,
                    bridge: DataManager.getAsset('bridge'),
                }));
                // if transport fails during app lifetime, try to reconnect
                if (settings.transportReconnect) {
                    await Utils.resolveAfter(1000, null);
                    await init(settings, postMessage);
                }
            });
    
            _list.on(TRANSPORT.START, (transportType) => postMessage(MessageBuilder.TransportMessage(TRANSPORT.START, transportType)));
    
            await _list.init();
            if (_list) {
                await _list.waitForTransportFirstEvent();
            }
        } catch (error) {
            _list = undefined;
            if (!settings.transportReconnect) {
                throw error;
            } else {
                postMessage(MessageBuilder.TransportMessage(TRANSPORT.ERROR, {
                    error: error.message || error,
                    bridge: DataManager.getAsset('bridge'),
                }));
                await Utils.resolveAfter(3000, null);
                // try to reconnect
                await init(settings, postMessage);
            }
        }
    }


}

export default DeviceListWrapper;