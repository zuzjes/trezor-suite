export declare namespace Response {
    type Unsuccessful = {
        success: false,
        payload: {
            error: string,
            code?: number,
        },
    }

    export type BlockchainDisconnect = {
        success: true,
        payload: {
            disconnected: true,
        },
    } | Unsuccessful;

    type Address = {
        address: string
    }
    type GetAddress = {
        success: true,
        payload: Address,
    } | Unsuccessful;

    type GetAddressBundle = {
        success: true,
        payload: Address[],
    } | Unsuccessful;
    
    type AnyType = BlockchainDisconnect | GetAddress | GetAddressBundle;
}