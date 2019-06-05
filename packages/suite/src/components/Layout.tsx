import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { fetchLocale } from '@suite/actions/languageActions.useNative';
import { LANGUAGES } from '@suite/config/app';
import { Header as AppHeader, LanguagePicker, colors } from '@trezor/components';
import Router from '@suite/support/Router';
import { State } from '@suite/types';
import { TREZOR_URL, SUPPORT_URL, WIKI_URL, BLOG_URL } from '@suite/constants/urls';
import l10nMessages from './Layout.messages';

const PageWrapper = styled.div<Props>`
    display: flex;
    flex: 1;
    flex-direction: column;
    background: ${props => (props.isLanding ? colors.LANDING : 'none')};
    align-items: center;
`;

const AppWrapper = styled.div<Props>`
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    flex: 1;
    background: ${props => (props.isLanding ? 'none' : colors.WHITE)};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px 4px 0px 0px;
    margin-top: 30px;

    @media screen and (max-width: 1170px) {
        border-radius: 0px;
        margin-top: 0px;
    }
`;

interface Props {
    router: State['router'];
    suite: State['suite'];
    devices: State['devices'];
    fetchLocale: typeof fetchLocale;
    isLanding?: boolean;
}

const Layout = (props: Props & InjectedIntlProps) => (
    <PageWrapper>
        <Router />
        <AppHeader
            sidebarEnabled={false}
            rightAddon={
                <LanguagePicker
                    language={props.suite.language}
                    languages={LANGUAGES}
                    onChange={option => {
                        props.fetchLocale(option.value);
                    }}
                />
            }
            links={[
                {
                    href: TREZOR_URL,
                    title: 'Trezor',
                },
                {
                    href: WIKI_URL,
                    title: props.intl.formatMessage(l10nMessages.TR_WIKI),
                },
                {
                    href: BLOG_URL,
                    title: props.intl.formatMessage(l10nMessages.TR_BLOG),
                },
                {
                    href: SUPPORT_URL,
                    title: props.intl.formatMessage(l10nMessages.TR_SUPPORT),
                },
            ]}
        />
        <AppWrapper isLanding={props.isLanding}>{props.children}</AppWrapper>
    </PageWrapper>
);

const mapStateToProps = (state: State) => ({
    router: state.router,
    suite: state.suite,
    devices: state.devices,
});

export default injectIntl(
    connect(
        mapStateToProps,
        dispatch => ({
            fetchLocale: bindActionCreators(fetchLocale, dispatch),
        }),
    )(Layout),
);