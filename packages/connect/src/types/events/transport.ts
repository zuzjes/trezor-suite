import { START, ERROR } from '../../constants/transport';

export declare namespace TransportEvent {

    // TODO: move it elsewere
    type BridgeInfo = {
        bridgeInfoTODO: any;
    }

    type Start = {
        type: typeof START;
        payload: {
            type: string;
            version: string;
            outdated: boolean;
            bridge: BridgeInfo,
        }
    }
    
    type Error = {
        type: typeof ERROR;
        payload: {
            error: string;
            bridge: BridgeInfo;
        }
    }
    
    export type AnyType = Start | Error;
    
    // Additional mapping by [type]: payload for event emitter
    export type Keys = {
        [K in Start['type']]: Start['payload']
    } & {
        [K in Error['type']]: Error['payload']
    };
    
}
