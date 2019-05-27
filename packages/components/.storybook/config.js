import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { configureViewport } from '@storybook/addon-viewport';
import { getColors } from '../src/config/colors';

const colors = getColors();

addDecorator(
    withOptions({
        name: 'Trezor UI Components',
        url: '#',
        addonPanelInRight: true,
        theme: {
            mainBackground: colors.BODY,
            mainBorder: `1px solid ${colors.BORDER}`,
            mainBorderColor: colors.BORDER,
            mainBorderRadius: '3px',
            mainFill: colors.MAIN,
            barFill: colors.MAIN,
            inputFill: '#ffffff',
            mainTextFace: 'Roboto',
            mainTextColor: colors.TEXT_PRIMARY,
            layoutMargin: 10,
            mainTextSize: 14,
            successColor: colors.SUCCESS_PRIMARY,
            failColor: colors.ERROR_PRIMARY,
            warnColor: colors.WARNING_PRIMARY,
            overlayBackground: colors.BACKGROUND,
            treeMenuHeader: {
                color: colors.TEXT_PRIMARY,
                lineHeight: '1.4rem',
            },
            menuLink: {
                color: colors.TEXT_SECONDARY,
                fontSize: '.9rem',
                lineHeight: '1.2rem',
                marginLeft: 0,
            },
            activeMenuLink: {
                color: colors.GREEN,
                background: 'none',
            },
        },
    }),
);

configureViewport();

function loadStories() {
    require('../src/stories/components/text.js');
    require('../src/stories/components/buttons.js');
    require('../src/stories/components/form.js');
    require('../src/stories/components/notifications.js');
    require('../src/stories/components/modal.js');
    require('../src/stories/components/other.js');
    require('../src/stories/components/loader.js');
    require('../src/stories/components/colors.js');
}

configure(loadStories, module);
