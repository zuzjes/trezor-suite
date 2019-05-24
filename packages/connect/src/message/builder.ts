import { UI_EVENT, UI_RESPONSE, DEVICE_EVENT, TRANSPORT_EVENT, RESPONSE_EVENT, BLOCKCHAIN_EVENT } from '../constants/events';
import { TransportEvent } from '../types/events/transport';
import { DeviceEvent } from '../types/events/device';
import { UiRequest } from '../types/events/uiRequest';
import { UiResponse as $Ui } from '../types/events/uiResponse';
import { BlockchainEvent } from '../types/events/blockchain';
import { Messages } from '../types/messages';
import { Response } from '../types/response';

export const UiMessage = <K extends keyof UiRequest.Keys>(type: K, payload: UiRequest.Keys[K] = undefined): Messages.UiMessage => (
    {
        event: UI_EVENT,
        type,
        payload,
    } as Messages.UiMessage
);

export const UiResponse = <K extends keyof $Ui.Keys>(type: K, payload: $Ui.Keys[K] = undefined): Messages.UiMessage => (
    {
        event: UI_RESPONSE,
        type,
        payload,
    } as Messages.UiMessage
);

export const DeviceMessage = <K extends keyof DeviceEvent.Keys>(type: K, payload: DeviceEvent.Keys[K]): Messages.DeviceMessage => (
    {
        event: DEVICE_EVENT,
        type,
        payload,
    } as Messages.DeviceMessage
);

export const TransportMessage = <K extends keyof TransportEvent.Keys>(type: K, payload: TransportEvent.Keys[K]): Messages.TransportMessage => (
    {
        event: TRANSPORT_EVENT,
        type,
        payload,
    } as Messages.TransportMessage
);

export const BlockchainMessage = <K extends keyof BlockchainEvent.Keys>(type: K, payload: BlockchainEvent.Keys[K]): Messages.BlockchainMessage => (
    {
        event: BLOCKCHAIN_EVENT,
        type,
        payload,
    } as Messages.BlockchainMessage
);

export const ResponseMessage = (id: number, resp: Response.AnyType): Messages.ResponseMessage => {
    return {
        event: RESPONSE_EVENT,
        type: RESPONSE_EVENT,
        id,
        ...resp
    }
}


