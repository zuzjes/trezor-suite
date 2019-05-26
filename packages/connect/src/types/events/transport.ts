import { START, ERROR } from '../../constants/transport';
import { Assets } from '../assets';

export declare namespace TransportEvent {

    type Start = {
        type: typeof START;
        payload: {
            type: string;
            version: string;
            outdated: boolean;
            bridge: Assets.BridgeRelease,
        }
    }
    
    type Error = {
        type: typeof ERROR;
        payload: {
            error: string;
            bridge: Assets.BridgeRelease;
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
