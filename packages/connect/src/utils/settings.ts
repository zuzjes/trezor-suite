import { CommonTypes } from '../types';

interface MyWindow extends Window {
    __TREZOR_CONNECT_SRC?: string;
}
declare var window: MyWindow;

/*
 * Initial settings for connect.
 * It could be changed by passing values into TrezorConnect.init(...) method
 */

const VERSION = '7.0.3';
const versionN: number[] = VERSION.split('.').map(s => parseInt(s));
const DIRECTORY = `${ versionN[0] }${ (versionN[1] > 0 ? `.${versionN[1]}` : '') }/`;
const DEFAULT_DOMAIN = `https://connect.trezor.io/${ DIRECTORY }`;
export const DEFAULT_PRIORITY = 2;

const initialSettings: CommonTypes.ApiSettings = {
    configSrc: './data/config.json', // constant
    version: VERSION, // constant
    debug: false,
    priority: DEFAULT_PRIORITY,
    trustedHost: false,
    connectSrc: DEFAULT_DOMAIN,
    iframeSrc: `${ DEFAULT_DOMAIN }iframe.html`,
    popup: true,
    popupSrc: `${ DEFAULT_DOMAIN }popup.html`,
    webusbSrc: `${ DEFAULT_DOMAIN }webusb.html`,
    transportReconnect: false,
    webusb: true,
    pendingTransportEvent: true,
    supportedBrowser: typeof navigator !== 'undefined' ? !(/Trident|MSIE/.test(navigator.userAgent)) : true,
    env: 'web',
    lazyLoad: false,
    timestamp: new Date().getTime(),
};

let currentSettings: CommonTypes.ApiSettings = initialSettings;

const parseManifest = (manifest?: CommonTypes.Manifest): CommonTypes.Manifest | undefined => {
    if (!manifest) return;
    if (typeof manifest.email !== 'string') {
        return;
    }
    if (typeof manifest.appUrl !== 'string') {
        return;
    }
    return {
        email: manifest.email,
        appUrl: manifest.appUrl,
    };
};

export const getEnv = (): string => {
    if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.onConnect !== 'undefined') {
        return 'webextension';
    }
    if (typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative') {
        return 'react-native';
    }
    if (typeof process !== 'undefined' && process.versions.hasOwnProperty('electron')) {
        return 'electron';
    }
    return 'web';
};

export const parseSettings = (input?: any): CommonTypes.ApiSettings => {
    if (!input) return currentSettings;

    const settings: CommonTypes.ApiSettings = { ...currentSettings };
    if (input.hasOwnProperty('debug')) {
        if (Array.isArray(input)) {
            // enable log with prefix
        } if (typeof input.debug === 'boolean') {
            settings.debug = input.debug;
        } else if (typeof input.debug === 'string') {
            settings.debug = input.debug === 'true';
        }
    }

    if (typeof input.connectSrc === 'string') {
        // TODO: escape string, validate url
        settings.connectSrc = input.connectSrc;
    } else if (typeof window !== 'undefined' && typeof window.__TREZOR_CONNECT_SRC === 'string') {
        settings.connectSrc = window.__TREZOR_CONNECT_SRC;
    }
    settings.iframeSrc = `${ settings.connectSrc }iframe.html`;
    settings.popupSrc = `${ settings.connectSrc }popup.html`;
    settings.webusbSrc = `${ settings.connectSrc }webusb.html`;

    if (typeof input.transportReconnect === 'boolean') {
        settings.transportReconnect = input.transportReconnect;
    }

    if (typeof input.webusb === 'boolean') {
        settings.webusb = input.webusb;
    }

    if (typeof input.popup === 'boolean') {
        settings.popup = input.popup;
    }

    if (typeof input.lazyLoad === 'boolean') {
        settings.lazyLoad = input.lazyLoad;
    }

    if (typeof input.pendingTransportEvent === 'boolean') {
        settings.pendingTransportEvent = input.pendingTransportEvent;
    }

    // local files
    if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
        settings.origin = `file://${window.location.pathname}`;
        settings.webusb = false;
    }

    if (typeof input.extension === 'string') {
        settings.extension = input.extension;
    }

    // $FlowIssue chrome is not declared outside
    if (typeof input.env === 'string') {
        settings.env = input.env;
    } else {
        settings.env = getEnv();
    }

    if (typeof input.timestamp === 'number') {
        settings.timestamp = input.timestamp;
    }

    if (typeof input.manifest === 'object') {
        settings.manifest = parseManifest(input.manifest);
    }

    currentSettings = settings;
    return currentSettings;
};
