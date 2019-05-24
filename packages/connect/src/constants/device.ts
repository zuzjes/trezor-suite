// device list events
export const CONNECT = '@trezor-connect/device/connect';
export const CONNECT_UNACQUIRED = '@trezor-connect/device/connect_unacquired';
export const DISCONNECT = '@trezor-connect/device/disconnect';
export const CHANGED = '@trezor-connect/device/changed';
export const ACQUIRE = '@trezor-connect/device/acquire';
export const RELEASE = '@trezor-connect/device/release';
export const ACQUIRED = '@trezor-connect/device/acquired';
export const RELEASED = '@trezor-connect/device/released';
export const USED_ELSEWHERE = '@trezor-connect/device/used_elsewhere';

export const LOADING = '@trezor-connect/device/loading';

// trezor-link events in protobuf format
export const BUTTON = '@trezor-connect/button';
export const PIN = '@trezor-connect/pin';
export const PASSPHRASE = '@trezor-connect/passphrase';
export const PASSPHRASE_ON_DEVICE = '@trezor-connect/passphrase_on_device';
export const WORD = '@trezor-connect/word';

// custom
export const WAIT_FOR_SELECTION = '@trezor-connect/device/wait_for_selection';

// this string has different prefix than other constants and it's used as device path
export const UNREADABLE = '@trezor-connect/unreadable-device';
