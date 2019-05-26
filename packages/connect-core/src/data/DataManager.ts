import * as parseUri from 'parse-uri';
import * as bowser from 'bowser';
import semvercmp from 'semver-compare';

import { 
    Assets,
    CommonTypes,
    Utils 
} from '@trezor/connect';

import { loadAsset } from '../utils/assetsLoader';
import { parseBridgeJSON } from '../utils/browser';
import { parseCoinsJson } from './CoinInfo';
import { parseFirmware } from './FirmwareInfo';


namespace DataManager {
    
    const assets: Assets.AssetCollection = {};
    let settings: CommonTypes.ApiSettings;
    const messages: { [key: string]: JSON } = {};

    export function setSettings(s: CommonTypes.ApiSettings) {
        settings = s;
    }

    export async function load(s: CommonTypes.ApiSettings) {
        const ts: number = s.timestamp;
        const configUrl = `${s.configSrc}?r=${ ts }`;

        try {
            settings = s;

            const configJSON = await loadAsset(configUrl, 'json');
            assets['config'] = configJSON;
            const config = getAsset('config');
            
            // this.config = parseConfig(config);

            // check if origin is localhost or trusted
            const isLocalhost = typeof window !== 'undefined' && window.location ? window.location.hostname === 'localhost' : true;
            const whitelist = isWhitelisted(settings.origin || '');
            settings.trustedHost = (isLocalhost || !!whitelist) && !settings.popup;
            // ensure that popup will be used
            if (!settings.trustedHost) {
                settings.popup = true;
            }
            // ensure that debug is disabled
            if (settings.debug && !settings.trustedHost && !whitelist) {
                settings.debug = false;
            }
            settings.priority = getPriority(whitelist);

            const knownHost = getHostLabel(settings.extension || settings.origin || '');
            if (knownHost) {
                settings.hostLabel = knownHost.label;
                settings.hostIcon = knownHost.icon;
            }

            for (const asset of config.assets) {
                const json = await loadAsset(`${asset.url}?r=${ ts }`, asset.type || 'json');
                assets[ asset.name ] = json;
            }

            for (const protobuf of config.messages) {
                const json = await loadAsset(`${protobuf.json}?r=${ ts }`, 'json');
                messages[ protobuf.name ] = json;
            }

            // hotfix webusb + chrome:72, allow webextensions
            // TODO: move this to parse settings
            if (settings.popup && settings.webusb && settings.env !== 'webextension') {
                const browserName = bowser.name.toLowerCase();
                if ((browserName === 'chrome' || browserName === 'chromium')) {
                    if (semvercmp(bowser.version, '72') >= 0) {
                        settings.webusb = false;
                    }
                }
            }

            // parse bridge JSON
            assets['bridge'] = parseBridgeJSON(assets['bridge']);

            // parse coins definitions
            parseCoinsJson(assets['coins']);

            // parse firmware definitions
            parseFirmware(assets['firmware-t1']);
            parseFirmware(assets['firmware-t2']);
        } catch (error) {
            throw error;
        }
    }

    export function findMessages(model: number, fw: string) {
        const config = getAsset('config');
        const m = config.messages.find(m => {
            const min = m.range.min[model];
            const max = m.range.max ? m.range.max[model] : fw;
            return (semvercmp(fw, min) >= 0 && semvercmp(fw, max) <= 0);
        });
        return messages[m ? m.name : 'default'];
    }

    export function getMessages(name?: string) {
        return messages[name || 'default'];
    }

    export function isWhitelisted(origin: string) {
        const config = getAsset('config');
        const uri = parseUri(origin);
        if (uri && typeof uri.host === 'string') {
            const parts: Array<string> = uri.host.split('.');
            if (parts.length > 2) {
                // subdomain
                uri.host = parts.slice(parts.length - 2, parts.length).join('.');
            }
            return config.whitelist.find(item => (item.origin === origin || item.origin === uri.host));
        }
    }

    export function isManagementAllowed() {
        const config = getAsset('config');
        const uri = parseUri(settings.origin);
        if (uri && typeof uri.host === 'string') {
            const parts: Array<string> = uri.host.split('.');
            if (parts.length > 2) {
                // subdomain
                uri.host = parts.slice(parts.length - 2, parts.length).join('.');
            }
            return config.management.find(item => (item.origin === settings.origin || item.origin === uri.host));
        }
    }

    export function getPriority(whitelist?: Assets.WhiteList) {
        if (whitelist) {
            return whitelist.priority;
        }
        return Utils.DEFAULT_PRIORITY;
    }

    export function getHostLabel(origin: string) {
        const config = getAsset('config');
        return config.knownHosts.find(host => host.origin === origin);
    }

    export function getSettings(): CommonTypes.ApiSettings | undefined;
    export function getSettings<K extends keyof CommonTypes.ApiSettings>(key: K): CommonTypes.ApiSettings[K]
    export function getSettings(key?: any) {
        if (!settings) return undefined;
        if (!key || typeof key !== 'string') return settings;
        return settings[key];
    }

    export function getAsset<K extends keyof Assets.AssetCollectionKeys>(key: K): Assets.AssetCollectionKeys[K] {
        return assets[key] as Assets.AssetCollectionKeys[K];
    }


    export function getDebugSettings(type: string) {
        return false;
    }

    export function getConfig() {
        const config = getAsset('config');
        return config;
    }
}

export default DataManager;
