import { Coins } from './coins';

export declare namespace Account {
    export interface Bitcoin {
        id: number,
        path: Array<number>,
        coinInfo: Coins.Bitcoin,
        xpub: string,
        xpubSegwit?: string,
        label: string,
        balance: string,
        transactions: number,
    }
    
    export interface Ethereum {
        descriptor: string,
        path?: Array<number>,
        serializedPath?: string,
        block: number,
        transactions: number,
        balance: string,
        availableBalance: string,
        nonce: number,
    }
    
    export interface Ripple {
        descriptor: string,
        path?: Array<number>,
        serializedPath?: string,
        block: number,
        transactions: number,
        balance: string,
        availableBalance: string,
        reserve: string,
        sequence: number,
    }
}


