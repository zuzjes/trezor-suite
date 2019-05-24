import * as BLOCKCHAIN from '../../constants/blockchain';
import { Coins } from '../coins';

export declare namespace BlockchainEvent {

    export interface Connect {
        type: typeof BLOCKCHAIN.CONNECT,
        payload: {
            coin: Coins.Info,
            info: {
                block: number,
            },
        },
    }

    export interface Error {
        type: typeof BLOCKCHAIN.ERROR,
        payload: {
            coin: Coins.Info,
            error: string,
        },
    }
    
    export interface Block {
        type: typeof BLOCKCHAIN.BLOCK,
        payload: {
            coin: Coins.Info,
            block: number,
            hash: string,
        },
    }

    // copy-paste from blockchain-link
    type BlockchainLinkInput = {
        addresses: Array<string>,
        // amount: string,
        // fee: string,
        // total: string,
    }

    type BlockchainLinkOutput = {
        addresses: Array<string>,
        // amount: string,
    }

    type BlockchainLinkToken = {
        name: string,
        shortcut: string,
        value: string,
    }

    export interface BlockchainLinkTransaction {
        type: 'send' | 'recv',
        timestamp?: number,
        blockHeight?: number,
        blockHash?: string,
        descriptor: string,
        inputs: Array<BlockchainLinkInput>,
        outputs: Array<BlockchainLinkOutput>,

        hash: string,
        amount: string,
        fee: string,
        total: string,

        tokens?: Array<BlockchainLinkToken>,
        sequence?: number, // eth: nonce || ripple: sequence
    }
    // copy-paste from blockchain-link end

    export interface Notification {
        type: typeof BLOCKCHAIN.NOTIFICATION,
        payload: {
            coin: Coins.Info,
            notification: BlockchainLinkTransaction,
        },
    }

    export type AnyType = Connect | Error | Block | Notification;

    // Additional mapping by [type]: payload for event emitter
    export type Keys = {
        [K in Connect['type']]: Connect['payload']
    } & {
        [K in Error['type']]: Error['payload']
    } & {
        [K in Block['type']]: Block['payload']
    } & {
        [K in Notification['type']]: Notification['payload']
    };

}
