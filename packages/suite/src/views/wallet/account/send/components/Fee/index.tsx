import React from 'react';
import { colors, variables, Select, P } from '@trezor/components';
import styled from 'styled-components';
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';
import accountMessages from '@wallet-views/account/messages';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const FeeLabel = styled.span`
    color: ${colors.TEXT_SECONDARY};
`;

const FeeOptionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const OptionValue = styled(P)`
    flex: 1 0 auto;
    min-width: 70px;
    margin-right: 5px;
`;

const OptionLabel = styled(P)`
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
    word-break: break-all;
`;

interface Props {
    intl: InjectedIntl;
}

const Fee = (props: Props) => (
    <Wrapper>
        <FeeLabel>
            <FormattedMessage {...accountMessages.TR_FEE} />
        </FeeLabel>
        <Select
            isSearchable={false}
            isClearable={false}
            value="test"
            onChange={() => {}}
            options="aaa"
            formatOptionLabel={option => (
                <FeeOptionWrapper>
                    <OptionValue>
                        {option.localizedValue ? (
                            <FormattedMessage {...option.localizedValue} />
                        ) : (
                            option.value
                        )}
                    </OptionValue>
                    <OptionLabel>{option.label}</OptionLabel>
                </FeeOptionWrapper>
            )}
        />
    </Wrapper>
);

export default injectIntl(Fee);
