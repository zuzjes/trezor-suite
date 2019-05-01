import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';
import { H1, H5 } from 'components/Heading';

import styled from 'styled-components';

import Notification from 'components/Notification';
import colors from 'config/colors';

const Wrapper = styled.div`
    padding: 1.6rem;
`;

const StyledNotification = styled(Notification)``;

const Row = styled.div`
    display: flex;
    margin: 0.5rem 0 2rem;
    flex-wrap: wrap;

    ${StyledNotification} {
        margin: 10px 0px;
    }
`;

const BtnLink = styled.button`
    font-size: 1rem;
    color: ${colors.TEXT_SECONDARY};
    vertical-align: middle;
    background: ${colors.LANDING};
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        color: ${colors.TEXT};
    }
`;
Wrapper.displayName = 'Wrapper';

const notMessage = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sapien elit.';

storiesOf('Notifications', module).add('All', () => (
    <Wrapper>
        <H1>
            Basic{' '}
            <BtnLink onClick={linkTo('Notifications', 'Notification')}>
                {'<Notification />'}
            </BtnLink>
        </H1>
        <Row>
            <StyledNotification type="info" title="Notification title" message={notMessage} />
            <StyledNotification type="success" title="Notification title" message={notMessage} />
            <StyledNotification type="warning" title="Notification title" message={notMessage} />
            <StyledNotification type="error" title="Notification title" message={notMessage} />
        </Row>
        <Row />

        <H5>cancellable </H5>
        <Row>
            <StyledNotification
                type="info"
                title="Notification title"
                message={notMessage}
                cancelable
            />
            <StyledNotification
                type="success"
                title="Notification title"
                message={notMessage}
                cancelable
            />
            <StyledNotification
                type="warning"
                title="Notification title"
                message={notMessage}
                cancelable
            />
            <StyledNotification
                type="error"
                title="Notification title"
                message={notMessage}
                cancelable
            />
        </Row>
        <H5>
            with an action button
            <BtnLink onClick={linkTo('Notifications', 'Notification with CTA')}>
                {'<Notification actions={[...]} cancelable/>'}
            </BtnLink>
        </H5>
        <Row>
            <StyledNotification
                type="info"
                title="Notification title"
                message={notMessage}
                cancelable
                actions={[
                    {
                        label: 'Call To Action',
                        callback: () => {},
                    },
                ]}
            />
            <StyledNotification
                type="success"
                title="Notification title"
                message={notMessage}
                cancelable
                actions={[
                    {
                        label: 'Call To Action',
                        callback: () => {},
                    },
                ]}
            />
            <StyledNotification
                type="warning"
                title="Notification title"
                message={notMessage}
                cancelable
                actions={[
                    {
                        label: 'Call To Action',
                        callback: () => {},
                    },
                ]}
            />
            <StyledNotification
                type="error"
                title="Notification title"
                message={notMessage}
                cancelable
                actions={[
                    {
                        label: 'Call To Action',
                        callback: () => {},
                    },
                ]}
            />
        </Row>

        <H5>
            with an action in progress
            <BtnLink onClick={linkTo('Notifications', 'Notification with CTA')}>
                {'<Notification actions={[...]} cancelable/>'}
            </BtnLink>
        </H5>
        <Row>
            <StyledNotification
                type="info"
                title="Notification title"
                message={notMessage}
                cancelable
                isActionInProgress
                actions={[
                    {
                        label: 'Call To Action',
                        callback: () => {},
                    },
                ]}
            />
            <StyledNotification
                type="success"
                title="Notification title"
                message={notMessage}
                cancelable
                isActionInProgress
                actions={[
                    {
                        label: 'Call To Action',
                        callback: () => {},
                    },
                ]}
            />
            <StyledNotification
                type="warning"
                title="Notification title"
                message={notMessage}
                cancelable
                isActionInProgress
                actions={[
                    {
                        label: 'Call To Action',
                        callback: () => {},
                    },
                ]}
            />
            <StyledNotification
                type="error"
                title="Notification title"
                message={notMessage}
                cancelable
                isActionInProgress
                actions={[
                    {
                        label: 'Call To Action',
                        callback: () => {},
                    },
                ]}
            />
        </Row>
    </Wrapper>
));

storiesOf('Notifications', module)
    .addDecorator(
        withInfo({
            header: false,
            inline: true,
            maxPropsIntoLine: 1,
            styles: {
                infoStory: {
                    background: colors.LANDING,
                    borderBottom: `1px solid ${colors.DIVIDER}`,
                    padding: '30px',
                    margin: '-8px',
                },
                infoBody: {
                    border: 'none',
                    padding: '15px',
                },
            },
        })
    )
    .addDecorator(withKnobs)
    .add(
        'Notification',
        () => {
            const type = select(
                'Type',
                {
                    Success: 'success',
                    Warning: 'warning',
                    Info: 'info',
                    Error: 'error',
                },
                'success'
            );
            const title = text('Title', 'Notification title');
            const message = text('Text', 'Text of the notification.');
            const cancelable = boolean('Cancelable', false);

            if (cancelable) {
                return <Notification type={type} title={title} message={message} cancelable />;
            }
            return <Notification type={type} title={title} message={message} />;
        },
        {
            info: {
                text: `
            ## Import
            ~~~js
            import { Notification } from 'trezor-ui-components';
            ~~~
            `,
            },
        }
    )
    .add(
        'Notification with CTA',
        () => (
            <Notification
                type={select(
                    'Type',
                    {
                        Success: 'success',
                        Warning: 'warning',
                        Info: 'info',
                        Error: 'error',
                    },
                    'success'
                )}
                title={text('Title', 'Notification title')}
                message={text('Text', 'Text of the notification.')}
                isActionInProgress={boolean('isActionInProgress', false)}
                cancelable={boolean('Cancelable', false)}
                actions={[
                    {
                        label: 'Create a backup in 3 minutes',
                        callback: () => {},
                    },
                ]}
            />
        ),
        {
            info: {
                text: `
            ## Import
            ~~~js
            import { Notification } from 'trezor-ui-components';
            ~~~
            `,
            },
        }
    );
