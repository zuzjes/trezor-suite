import { Network } from '@wallet-types';

export default [
    // Bitcoin
    {
        name: 'Bitcoin',
        networkType: 'bitcoin',
        symbol: 'btc',
        bip44: "m/84'/0'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin (segwit)',
        networkType: 'bitcoin',
        accountType: 'segwit',
        symbol: 'btc',
        bip44: "m/49'/0'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'btc',
        bip44: "m/44'/0'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    // Litecoin
    {
        name: 'Litecoin',
        networkType: 'litecoin',
        symbol: 'ltc',
        bip44: "m/49'/2'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Litecoin (legacy)',
        networkType: 'litecoin',
        accountType: 'legacy',
        symbol: 'ltc',
        bip44: "m/44'/2'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    // Bitcoin testnet
    {
        name: 'Bitcoin Test',
        networkType: 'bitcoin',
        symbol: 'test',
        bip44: "m/84'/1'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Test (segwit)',
        networkType: 'bitcoin',
        accountType: 'segwit',
        symbol: 'test',
        bip44: "m/49'/1'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Test (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'test',
        bip44: "m/44'/1'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    // Ethereum
    {
        name: 'Ethereum',
        networkType: 'ethereum',
        symbol: 'eth',
        bip44: "m/44'/60'/0'/0/i",
        hasSignVerify: false,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Ethereum Classic',
        networkType: 'ethereum',
        symbol: 'etc',
        bip44: "m/44'/61'/0'/0/i",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Ethereum Ropsten',
        networkType: 'ethereum',
        symbol: 'trop',
        bip44: "m/44'/60'/0'/0/i",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    // Ripple
    {
        name: 'XRP',
        networkType: 'ripple',
        symbol: 'xrp',
        bip44: "m/44'/144'/i'/0/0",
        hasSignVerify: false,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'XRP Testnet',
        networkType: 'ripple',
        symbol: 'txrp',
        bip44: "m/44'/144'/i'/0/0",
        hasSignVerify: false,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Cash',
        networkType: 'bitcoin',
        symbol: 'bch',
        bip44: "m/44'/145'/i'",
        hasSignVerify: false,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Gold',
        networkType: 'bitcoin',
        symbol: 'btg',
        bip44: "m/49'/156'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Gold (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'btg',
        bip44: "m/49'/156'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Dash',
        networkType: 'bitcoin',
        symbol: 'dash',
        bip44: "m/44'/5'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'DigiByte',
        networkType: 'bitcoin',
        symbol: 'dgb',
        bip44: "m/49'/20'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'DigiByte (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'dgb',
        bip44: "m/44'/20'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Dogecoin',
        networkType: 'bitcoin',
        symbol: 'doge',
        bip44: "m/44'/3'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Namecoin',
        networkType: 'bitcoin',
        symbol: 'nmc',
        bip44: "m/44'/7'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Vertcoin',
        networkType: 'bitcoin',
        symbol: 'vtc',
        bip44: "m/49'/28'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Vertcoin (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'vtc',
        bip44: "m/44'/28'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Zcash',
        networkType: 'bitcoin',
        symbol: 'zec',
        bip44: "m/44'/133'/i'",
        hasSignVerify: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
] as Network[];
