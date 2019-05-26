import { readFileSync } from 'fs';
import { resolve } from 'path';

export const loadAsset = async (url: string, type: string) => {
    let fileUrl: string = url.split('?')[0];
    fileUrl = resolve(__dirname, '../../', fileUrl);
    const content = type !== 'binary' ? readFileSync(fileUrl, { encoding: 'utf8' }) : readFileSync(fileUrl);
    if (!content) return null;

    if (type === 'binary') {
        return Array.from(content as ArrayLike<string>);
    } else if (type === 'json' && typeof content === 'string') {
        return JSON.parse(content);
    }
    return content;
};
