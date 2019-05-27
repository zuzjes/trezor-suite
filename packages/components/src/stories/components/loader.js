import React from 'react';
import Loader from '../../components/Loader';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import { getColors } from '../../config/colors';
import storybookStyle from '../../config/storybook';

const colors = getColors();

storiesOf('Other', module)
    .addDecorator(
        withInfo({
            header: false,
            inline: true,
            maxPropsIntoLine: 1,
            styles: storybookStyle,
        })
    )
    .addDecorator(withKnobs)
    .add(
        'Loader',
        () => {
            const isWhiteText = boolean('White text', false);
            const isSmallText = boolean('Small text', false);
            const transparentRoute = boolean('Transparent route', false);

            return (
                <Loader
                    size={number('Size', 100)}
                    strokeWidth={number('Stroke width', 1)}
                    text={text('Text', 'loading')}
                    {...(isWhiteText ? { isWhiteText } : {})}
                    {...(isSmallText ? { isSmallText } : {})}
                    {...(transparentRoute ? { transparentRoute } : {})}
                />
            );
        },
        {
            info: {
                text: `
            ## Import
            ~~~js
            import { Loader } from 'trezor-ui-components';
            ~~~
            `,
            },
        }
    );
