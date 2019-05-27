import { getColors } from '../config/colors';

const colors = getColors();

type Props = 'info' | 'error' | 'warning' | 'success';

const getPrimaryColor = (type?: Props) => {
    let color;
    switch (type) {
        case 'info':
            color = colors.INFO_PRIMARY;
            break;
        case 'error':
            color = colors.ERROR_PRIMARY;
            break;
        case 'warning':
            color = colors.WARNING_PRIMARY;
            break;
        case 'success':
            color = colors.SUCCESS_PRIMARY;
            break;
        default:
            color = null;
    }

    return color;
};

const getTextColor = (type?: Props) => {
    let color;
    switch (type) {
        case 'info':
            color = colors.INFO_TEXT;
            break;
        case 'error':
            color = colors.ERROR_TEXT;
            break;
        case 'warning':
            color = colors.WARNING_TEXT;
            break;
        case 'success':
            color = colors.SUCCESS_TEXT;
            break;
        default:
            color = null;
    }

    return color;
};

const getSecondaryColor = (type?: Props) => {
    let color;
    switch (type) {
        case 'info':
            color = colors.INFO_SECONDARY;
            break;
        case 'error':
            color = colors.ERROR_SECONDARY;
            break;
        case 'warning':
            color = colors.WARNING_SECONDARY;
            break;
        case 'success':
            color = colors.SUCCESS_SECONDARY;
            break;
        default:
            color = null;
    }

    return color;
};

const getNotificationBgColor = (type?: Props) => {
    let color;
    switch (type) {
        case 'info':
            color = colors.INFO_BG;
            break;
        case 'error':
            color = colors.ERROR_BG;
            break;
        case 'warning':
            color = colors.WARNING_BG;
            break;
        case 'success':
            color = colors.SUCCESS_BG;
            break;
        default:
            color = null;
    }

    return color;
};

export { getPrimaryColor, getTextColor, getSecondaryColor, getNotificationBgColor };
