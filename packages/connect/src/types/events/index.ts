import { TransportEvent } from './transport';
import { DeviceEvent } from './device';
import { BlockchainEvent } from './blockchain';
import { UiRequest } from './uiRequest';
import { UiResponse } from './uiResponse';

// *_EVENT types should be the same as ./constants/events
export type Events = {
    DEVICE_EVENT: DeviceEvent.AnyType;
    UI_EVENT: UiRequest.AnyType;
    UI_RESPONSE: UiResponse.AnyType;
    TRANSPORT_EVENT: TransportEvent.AnyType;
    BLOCKCHAIN_EVENT: BlockchainEvent.AnyType;
} & TransportEvent.Keys
  & DeviceEvent.Keys
  & BlockchainEvent.Keys
  & UiRequest.Keys;
  // & UiResponse.Keys;

export * from './transport';
export * from './device';
export * from './blockchain';
export * from './uiRequest';
export * from './uiResponse';