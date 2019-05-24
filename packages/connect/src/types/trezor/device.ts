export declare namespace Device {

    export interface Features {
        vendor: string,
        major_version: number,
        minor_version: number,
        patch_version: number,
        bootloader_mode: boolean,
        device_id: string,
        pin_protection: boolean,
        passphrase_protection: boolean,
        language: string,
        label: string,
        initialized: boolean,
        revision: string,
        bootloader_hash: string,
        imported: boolean,
        pin_cached: boolean,
        passphrase_cached: boolean,
        firmware_present: boolean,
        needs_backup: boolean,
        flags: number,
        model: string,
        fw_major: number,
        fw_minor: number,
        fw_patch: number,
        fw_vendor: string,
        fw_vendor_keys: string,
        unfinished_backup: boolean,
        no_backup: boolean,
    }
    
    export interface FirmwareRelease {
        required: true,
        version: Array<number>,
        min_bridge_version: Array<number>,
        min_firmware_version: Array<number>,
        bootloader_version: Array<number>,
        min_bootloader_version: Array<number>,
        url: string,
        channel: string,
        fingerprint: string,
        changelog: string,
    }
    
    export type Status = 'available' | 'occupied' | 'used';
    export type Mode = 'normal' | 'bootloader' | 'initialize' | 'seedless';
    export type FirmwareStatus = 'valid' | 'outdated' | 'required' | 'unknown' | 'none';
    
    export type TrezorDevice = {
        type: 'acquired',
        path: string,
        label: string,
        firmware: FirmwareStatus,
        firmwareRelease?: FirmwareRelease,
        status: Status,
        mode: Mode,
        state?: string,
        features: Features,
    } | {
        type: 'unacquired',
        path: string,
        label: string,
    } | {
        type: 'unreadable',
        path: string,
        label: string,
    }
}
