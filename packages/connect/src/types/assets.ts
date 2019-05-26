export declare namespace Assets {

    interface WhiteList {
        priority: number,
        origin: string,
    }
    
    interface KnownHost {
        origin: string,
        label?: string,
        icon?: string,
    }

    interface BridgeRelease {
        version: number[];
        directory: string;
        packages: {
            platform: string[];
            name: string;
            url: string;
            signature?: string;
        }[];
        changelog: string[];
    }

    interface WebUSB {
        vendorId: string,
        productId: string,
    }
    
    interface Browser {
        version: number,
        download: string,
        update: string,
    }

    interface Config {
        whitelist: Array<WhiteList>,
        management: Array<WhiteList>,
        knownHosts: Array<KnownHost>,
        webusb: Array<WebUSB>,
        resources: Resources,
        assets: Array<Asset>,
        messages: Array<ProtobufMessages>,
        supportedBrowsers: { [key: string]: Browser },
        supportedFirmware: Array<{
            coinType?: string,
            coin?: string,
            excludedMethods?: Array<string>,
            min?: Array<string>,
            max?: Array<string>,
        }>,
    }

    interface Resources {
        bridge: string,
    }

    interface AssetCollectionKeys {
        'config': Config;
        'coins': JSON;
        'bridge': BridgeRelease;
        'firmware-t1': JSON;
        'firmware-t2': JSON;
        'default': JSON;
        'v6': JSON;
    }
    
    interface Asset {
        name: keyof AssetCollectionKeys,
        type?: string,
        url: string,
    }

    interface AssetCollection { [key: string]: JSON }
    
    interface ProtobufMessages {
        name: 'default' | 'v6',
        range: {
            min: Array<string>,
            max?: Array<string>,
        },
        json: string,
    }


}