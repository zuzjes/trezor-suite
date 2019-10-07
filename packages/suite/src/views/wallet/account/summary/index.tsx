import React from 'react';
import Content from '@wallet-components/Content';
import LayoutAccount from '@wallet-components/LayoutAccount';
import { Helmet } from 'react-helmet';

import AccountHeader from './components/AccountHeader';
import Tokens from './components/Tokens';
import { Props } from './Container';

const AccountSummary = (props: Props) => {
    const { device } = props.suite;
    const { account, network, shouldRender } = props.wallet.selectedAccount;
    if (!device || !account || !network || !shouldRender) {
        const { loader, exceptionPage } = props.wallet.selectedAccount;
        return (
            <LayoutAccount>
                <Content loader={loader} exceptionPage={exceptionPage} isLoading />
            </LayoutAccount>
        );
    }

    return (
        <>
            <Helmet>
                <title>Summary</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <LayoutAccount>
                <AccountHeader
                    account={account}
                    network={network}
                    fiatRates={props.fiat}
                    localCurrency={props.wallet.settings.localCurrency}
                    isHidden={props.wallet.settings.hideBalance}
                />
                {account.networkType === 'ethereum' && (
                    <Tokens
                        tokens={account.tokens || []}
                        hideBalance={props.wallet.settings.hideBalance}
                    />
                )}
            </LayoutAccount>
        </>
    );
};

export default AccountSummary;
