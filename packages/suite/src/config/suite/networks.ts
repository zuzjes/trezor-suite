// TODO: unify network objects structure

const accountTypes: AccountType[] = [
    { path: "m/84'/0'/i'", coin: 'btc' },
    { path: "m/49'/0'/i'", coin: 'btc', type: 'segwit' },
    { path: "m/44'/0'/i'", coin: 'btc', type: 'legacy' },
    { path: "m/49'/2'/i'", coin: 'ltc' },
    { path: "m/44'/2'/i'", coin: 'ltc', type: 'legacy' },
    { path: "m/84'/1'/i'", coin: 'test' },
    { path: "m/49'/1'/i'", coin: 'test', type: 'segwit' },
    { path: "m/44'/1'/i'", coin: 'test', type: 'legacy' },
    { path: "m/44'/60'/0'/0/i", coin: 'eth', networkType: 'ethereum' },
    { path: "m/44'/61'/0'/0/i", coin: 'etc', networkType: 'ethereum' },
    { path: "m/44'/60'/0'/0/i", coin: 'trop', networkType: 'ethereum' },
    { path: "m/44'/144'/i'/0/0", coin: 'xrp', networkType: 'ripple' },
    { path: "m/44'/144'/i'/0/0", coin: 'txrp', networkType: 'ripple' },
    { path: "m/44'/145'/i'", coin: 'bch' },
    { path: "m/49'/156'/i'", coin: 'btg' },
    { path: "m/44'/156'/i'", coin: 'btg', type: 'legacy' },
    { path: "m/44'/5'/i'", coin: 'dash' },
    { path: "m/49'/20'/i'", coin: 'dgb' },
    { path: "m/44'/20'/i'", coin: 'dgb', type: 'legacy' },
    { path: "m/44'/3'/i'", coin: 'doge' },
    { path: "m/44'/7'/i'", coin: 'nmc' },
    { path: "m/49'/28'/i'", coin: 'vtc' },
    { path: "m/44'/28'/i'", coin: 'vtc', type: 'legacy' },
    { path: "m/44'/133'/i'", coin: 'zec' },
];
export default [
    // bitcoin
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
    //  { path: "m/49'/2'/i'", coin: 'ltc' },
    //{ path: "m/44'/2'/i'", coin: 'ltc', type: 'legacy' },
    // ethereum
    // {
    //     order: 2,
    //     type: 'ethereum',
    //     name: 'Ethereum',
    //     symbol: 'ETH',
    //     shortcut: 'eth',
    //     bip44: "m/44'/60'/0'/0",
    //     chainId: 1,
    //     defaultGasPrice: 64,
    //     defaultGasLimit: 21000,
    //     defaultGasLimitTokens: 200000,
    //     decimals: 18,
    //     web3: ['wss://eth2.trezor.io/geth'],
    //     explorer: {
    //         tx: 'https://etherscan.io/tx/',
    //         address: 'https://etherscan.io/address/',
    //     },
    //     hasSignVerify: true,
    // },
    // {
    //     order: 18,
    //     type: 'ethereum',
    //     name: 'Ethereum Classic',
    //     symbol: 'ETC',
    //     shortcut: 'etc',
    //     chainId: 61,
    //     bip44: "m/44'/61'/0'/0",
    //     defaultGasPrice: 64,
    //     defaultGasLimit: 21000,
    //     defaultGasLimitTokens: 200000,
    //     decimals: 18,
    //     web3: ['wss://etc2.trezor.io/geth'],
    //     explorer: {
    //         tx: 'https://gastracker.io/tx/',
    //         address: 'https://gastracker.io/addr/',
    //     },
    //     hasSignVerify: true,
    // },
    // {
    //     order: 2,
    //     type: 'ethereum',
    //     name: 'Ethereum Ropsten',
    //     testnet: true,
    //     symbol: 'tROP',
    //     shortcut: 'trop',
    //     chainId: 3,
    //     bip44: "m/44'/60'/0'/0",
    //     defaultGasPrice: 64,
    //     defaultGasLimit: 21000,
    //     defaultGasLimitTokens: 200000,
    //     decimals: 18,
    //     fee: {
    //         defaultFee: '64',
    //         minFee: '10',
    //         maxFee: '10000',
    //         defaultGasLimit: '21000',
    //         defaultGasLimitTokens: '200000',
    //         levels: [
    //             {
    //                 name: 'High',
    //                 value: '96',
    //                 multiplier: 1.5,
    //             },
    //             {
    //                 name: 'Normal',
    //                 value: '64',
    //                 multiplier: 1,
    //                 recommended: true,
    //             },
    //             {
    //                 name: 'Low',
    //                 value: '48',
    //                 multiplier: 0.75,
    //             },
    //         ],
    //     },
    //     web3: ['wss://ropsten1.trezor.io/geth'],
    //     explorer: {
    //         tx: 'https://ropsten.etherscan.io/tx/',
    //         address: 'https://ropsten.etherscan.io/address/',
    //     },
    //     hasSignVerify: true,
    // },
    // {
    //     order: 3,
    //     type: 'ripple',
    //     name: 'Ripple',
    //     symbol: 'XRP',
    //     shortcut: 'xrp',
    //     bip44: "m/44'/144'/a'/0/0",
    //     decimals: 6,
    //     fee: {
    //         defaultFee: '12',
    //         minFee: '10',
    //         maxFee: '10000',
    //         levels: [
    //             {
    //                 name: 'Normal',
    //                 value: '12',
    //                 recommended: true,
    //             },
    //         ],
    //     },
    //     explorer: {
    //         tx: 'https://xrpscan.com/tx/',
    //         address: 'https://xrpscan.com/account/',
    //     },
    //     hasSignVerify: false,
    // },
    // {
    //     order: 3,
    //     type: 'ripple',
    //     name: 'Ripple Testnet',
    //     testnet: true,
    //     symbol: 'tXRP',
    //     shortcut: 'txrp',
    //     bip44: "m/44'/144'/a'/0/0",
    //     decimals: 6,
    //     fee: {
    //         defaultFee: '12',
    //         minFee: '10',
    //         maxFee: '10000',
    //         levels: [
    //             {
    //                 name: 'Normal',
    //                 value: '12',
    //                 recommended: true,
    //             },
    //         ],
    //     },
    //     explorer: {
    //         tx: 'https://sisyfos.trezor.io/ripple-testnet-explorer/tx/',
    //         address: 'https://sisyfos.trezor.io/ripple-testnet-explorer/address/',
    //     },
    //     hasSignVerify: false,
    // },
];
