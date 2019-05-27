const colors = {
    BLACK: '#1A1A1A',

    GRAY_9: '#333333',
    GRAY_8: '#494949',
    GRAY_7: '#757575',
    GRAY_6: '#A9A9A9',
    GRAY_5: '#E3E3E3',
    GRAY_4: '#EBEBEB',
    GRAY_3: '#F2F2F2',
    GRAY_2: '#F9F9F9',
    GRAY_1: '#FBFBFB',

    WHITE: '#FFFFFF',

    GREEN: '#01B757',
    GREEN_DARK: '#00AB51',
    GREEN_LIGHT: '#DFFFEE',

    BLUE: '#1E7FF0',
    BLUE_DARK: '#1675E4',
    BLUE_LIGHT: '#E1EFFF',

    ORANGE: '#EB8A00',
    ORANGE_DARK: '#E28603',
    ORANGE_LIGHT: '#FFEFD9',

    RED: '#ED1212',
    RED_DARK: '#DC0E0E',
    RED_LIGHT: '#FFE9E9',
};

const theme = {
    default: {
        BACKGROUND: colors.GRAY_4,
        BODY: colors.GRAY_5,
        LANDING: colors.GRAY_2,
        MAIN: colors.WHITE,

        HEADER: colors.BLACK,

        TEXT: colors.GRAY_9,
        TEXT_PRIMARY: colors.GRAY_8,
        TEXT_SECONDARY: colors.GRAY_7,

        LABEL_COLOR: colors.GRAY_6,
        TOOLTIP_BACKGROUND: colors.GRAY_9,

        BORDER: colors.GRAY_3,
        INPUT_BORDER: colors.GRAY_5,
        INPUT_FOCUS_SHADOW: colors.GRAY_5,
        INPUT_FOCUS_BORDER: colors.GRAY_6,
        SELECT_HOVER: colors.GRAY_2,

        DIVIDER: colors.GRAY_5,

        INFO_PRIMARY: colors.BLUE,
        INFO_SECONDARY: colors.BLUE_DARK,
        INFO_BG: colors.BLUE_LIGHT,
        INFO_TEXT: colors.BLUE,

        SUCCESS_PRIMARY: colors.GREEN,
        SUCCESS_SECONDARY: colors.GREEN_DARK,
        SUCCESS_BG: colors.GREEN_LIGHT,
        SUCCESS_TEXT: colors.GREEN,

        WARNING_PRIMARY: colors.ORANGE,
        WARNING_SECONDARY: colors.ORANGE_DARK,
        WARNING_BG: colors.ORANGE_LIGHT,
        WARNING_TEXT: colors.ORANGE,

        ERROR_PRIMARY: colors.RED,
        ERROR_SECONDARY: colors.RED_DARK,
        ERROR_BG: colors.RED_LIGHT,
        ERROR_TEXT: colors.RED,
    },
    dark: {
        BACKGROUND: colors.BLACK,
        BODY: colors.GRAY_9,
        LANDING: colors.GRAY_8,
        MAIN: colors.BLACK,

        HEADER: colors.BLACK,

        TEXT: colors.GRAY_9,
        TEXT_PRIMARY: colors.WHITE,
        TEXT_SECONDARY: colors.GRAY_2,

        LABEL_COLOR: colors.GRAY_6,
        TOOLTIP_BACKGROUND: colors.GRAY_9,

        BORDER: colors.GRAY_8,
        INPUT_BORDER: colors.GRAY_6,
        INPUT_FOCUS_SHADOW: colors.BLACK,
        INPUT_FOCUS_BORDER: colors.GRAY_1,
        SELECT_HOVER: colors.GRAY_2,

        DIVIDER: colors.GRAY_8,

        INFO_PRIMARY: colors.BLUE,
        INFO_SECONDARY: colors.BLUE_DARK,
        INFO_BG: colors.BLUE_DARK,
        INFO_TEXT: colors.BLUE_LIGHT,

        SUCCESS_PRIMARY: colors.GREEN,
        SUCCESS_SECONDARY: colors.GREEN_DARK,
        SUCCESS_BG: colors.GREEN_DARK,
        SUCCESS_TEXT: colors.GREEN_LIGHT,

        WARNING_PRIMARY: colors.ORANGE,
        WARNING_SECONDARY: colors.ORANGE_DARK,
        WARNING_BG: colors.ORANGE_DARK,
        WARNING_TEXT: colors.ORANGE_LIGHT,

        ERROR_PRIMARY: colors.RED,
        ERROR_SECONDARY: colors.RED_DARK,
        ERROR_BG: colors.RED_DARK,
        ERROR_TEXT: colors.RED_LIGHT,
    },
};

export const getColors = () => {
    return { ...colors, ...theme.dark };
};
