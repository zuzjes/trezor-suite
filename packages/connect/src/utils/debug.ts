const colors: {[k: string]: string} = {
    'DescriptorStream': 'color: #77ab59',
    'DeviceList': 'color: #36802d',
    'Device': 'color: #bada55',
    'Core': 'color: #c9df8a',
    'IFrame': 'color: #FFFFFF; background: #f4a742;',
    'Popup': 'color: #f48a00',
};

type LogMessage = {
    level: string,
    prefix: string,
    message: Array<any>,
    timestamp: number,
}

export default class Log {
    prefix: string;
    enabled: boolean;
    css: string;
    messages: Array<LogMessage>;

    constructor(prefix: string, enabled: boolean = false) {
        this.prefix = prefix;
        this.enabled = enabled;
        this.messages = [];
        this.css = colors[prefix] || 'color: #000000; background: #FFFFFF;';
    }

    addMessage(level: string, prefix: string, ...args: Array<any>): void {
        this.messages.push({
            level: level,
            prefix: prefix,
            message: args,
            timestamp: new Date().getTime(),
        });
    }

    log(...args: Array<any>): void {
        this.addMessage('log', this.prefix, ...args);
        if (this.enabled) { console.log(this.prefix, ...args); }
    }

    error(...args: Array<any>): void {
        this.addMessage('error', this.prefix, ...args);
        if (this.enabled) { console.error(this.prefix, ...args); }
    }

    warn(...args: Array<any>): void {
        this.addMessage('warn', this.prefix, ...args);
        if (this.enabled) { console.warn(this.prefix, ...args); }
    }

    debug(...args: Array<any>): void {
        this.addMessage('debug', this.prefix, ...args);
        if (this.enabled) { console.log('%c' + this.prefix, this.css, ...args); }
    }
}

const _logs: {[k: string]: Log} = {};

export const initLog = (prefix: string, enabled?: boolean): Log => {
    const enab: boolean = typeof enabled === 'boolean' ? enabled : false;
    const instance: Log = new Log(prefix, enab);
    _logs[prefix] = instance;
    return instance;
};

export const enableLog = (enabled: boolean): void => {
    for (const l of Object.keys(_logs)) {
        _logs[l].enabled = enabled;
    }
};

export const getLog = (): Array<LogMessage> => {
    let logs: Array<LogMessage> = [];
    for (const l of Object.keys(_logs)) {
        logs = logs.concat(_logs[l].messages);
    }
    logs.sort((a, b) => {
        return a.timestamp - b.timestamp;
    });
    return logs;
};

export const enableByPrefix = (prefix: string, enabled: boolean): void => {
    if (_logs[prefix]) {
        _logs[prefix].enabled = enabled;
    }
};
