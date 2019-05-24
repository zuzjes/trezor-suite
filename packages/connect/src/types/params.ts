export declare namespace Params {
    
    interface $Common {
        device?: {
            path: string;
            instance?: number;
            state?: string;
        };
        useEmptyPassphrase?: boolean;
        allowSeedlessDevice?: boolean;
        keepSession?: boolean;
        skipFinalReload?: boolean;
    }

    type $Path = string | Array<number>;

    interface BlockchainDisconnect {
        coin: string;
    }

    interface GetAddress extends $Common {
        path: $Path,
        address?: string,
        coin?: string,
        showOnTrezor?: boolean,
        crossChain?: boolean,
    }

    interface GetAddressBundle extends $Common {
        bundle: GetAddress[],
    }

    

    type AnyType = BlockchainDisconnect | GetAddress | GetAddressBundle;
}
