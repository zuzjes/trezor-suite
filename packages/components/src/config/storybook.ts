import { getColors } from './colors';

const colors = getColors();

export default {
    infoStory: {
        background: colors.BACKGROUND,
        borderBottom: `1px solid ${colors.DIVIDER}`,
        padding: '30px',
        margin: '-8px',
    },
    infoBody: {
        border: 'none',
        padding: '15px',
        background: colors.BACKGROUND,
        color: colors.TEXT_PRIMARY,
    },
};
