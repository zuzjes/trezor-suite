import { 
    DEVICE_EVENT,
    UI_EVENT,
    UI_RESPONSE,
    TRANSPORT_EVENT,
    RESPONSE_EVENT,
    BLOCKCHAIN_EVENT,
} from '../constants/events';
import * as POPUP from '../constants/popup';
import * as TRANSPORT from '../constants/transport';
import { CALL } from '../constants/iframe';

import { TransportEvent } from './events/transport';
import { DeviceEvent } from './events/device';
import { UiRequest } from './events/uiRequest';
import { UiResponse } from './events/uiResponse';
import { BlockchainEvent } from './events/blockchain';
import { Params } from './params';
import { Response } from './response';

export declare namespace Messages {
 
    // messages sent from Core to Factory
    type TransportMessage = {
        event: typeof TRANSPORT_EVENT;
    } & TransportEvent.AnyType;

    type DeviceMessage = {
        event: typeof DEVICE_EVENT;
    } & DeviceEvent.AnyType;

    type UiMessage = {
        event: typeof UI_EVENT;
    } & UiRequest.AnyType | {
        event: typeof UI_RESPONSE;
    } & UiResponse.AnyType;

    type ResponseMessage = {
        id: number;
        event: typeof RESPONSE_EVENT;
        type: typeof RESPONSE_EVENT;
    } & Response.AnyType;

    type BlockchainMessage = {
        event: typeof BLOCKCHAIN_EVENT;
    } & BlockchainEvent.AnyType;

    type Call = {
        id: number;
        type: typeof CALL;
        payload: Params.AnyType & { method: string };
    }

    type Misc = {
        type: typeof POPUP.HANDSHAKE | typeof POPUP.CLOSED | typeof TRANSPORT.RECONNECT
    }

    type CoreMessage = TransportMessage | DeviceMessage | UiMessage | BlockchainMessage | ResponseMessage;

    type CoreMessageIn = Call | UiRequest.AnyType | UiResponse.AnyType | Misc;
    // type CoreMessageIn = CoreMessageInUnion & { id?: number };
    type CoreMessageOut = TransportMessage | DeviceMessage | UiMessage | BlockchainEvent.AnyType;
}