import React from 'react';
import styled from 'styled-components';
import { Button, H1, H5 } from '@trezor/components';
import { storiesOf } from '@storybook/react';

const Wrapper = styled.div`
    padding: 1.6rem;
`;

const Row = styled.div`
    display: flex;
    margin: 0.5rem 0 2rem;
    flex-wrap: wrap;

    button {
        margin: 10px 10px;
    }
`;

const Div = styled.div`
    margin: 0.5rem 0 2rem;
`;

const SnapshotWrapper = styled.div`
    display: inline-flex;
`;
const SnapshotWrapperDiv = styled.div``;

storiesOf('Buttons', module).add(
    'All',
    () => (
        <Wrapper>
            <H1>Basic </H1>
            <Row>
                <SnapshotWrapper data-test="button_basic">
                    <Button variant="success">Button</Button>
                    <Button variant="info">Button</Button>
                    <Button variant="warning">Button</Button>
                    <Button variant="error">Button</Button>
                    <Button variant="white">Button</Button>
                </SnapshotWrapper>
            </Row>
            <Row>
                <Button data-test="button_basic_transparent" isTransparent>
                    Transparent
                </Button>
                <Button data-test="button_basic_disabled" isDisabled>
                    Disabled
                </Button>
            </Row>

            <H5>with an icon</H5>
            <Row>
                <SnapshotWrapper data-test="button_basic_icon">
                    <Button icon="PLUS" variant="success">
                        Button
                    </Button>
                    <Button icon="PLUS" variant="info">
                        Button
                    </Button>
                    <Button icon="PLUS" variant="warning">
                        Button
                    </Button>
                    <Button icon="PLUS" variant="error">
                        Button
                    </Button>
                    <Button icon="PLUS" variant="white">
                        Button
                    </Button>
                </SnapshotWrapper>
            </Row>
            <Row>
                <Button icon="PLUS" isTransparent data-test="button_basic_icon_transparent">
                    Transparent
                </Button>
                <Button icon="PLUS" isDisabled data-test="button_basic_icon_disabled">
                    Disabled
                </Button>
            </Row>

            <H5>with loading </H5>
            <Row>
                <SnapshotWrapper data-test="button_basic_loading">
                    <Button isLoading variant="success">
                        Button
                    </Button>
                    <Button isLoading variant="info">
                        Button
                    </Button>
                    <Button isLoading variant="warning">
                        Button
                    </Button>
                    <Button isLoading variant="error">
                        Button
                    </Button>
                    <Button isLoading variant="white">
                        Button
                    </Button>
                </SnapshotWrapper>
            </Row>
            <Row>
                <Button isLoading isTransparent data-test="button_basic_loading_transparent">
                    Transparent
                </Button>
                <Button isLoading isDisabled data-test="button_basic_loading_disabled">
                    Disabled
                </Button>
            </Row>

            <H1>Basic - full width </H1>
            <Div>
                <SnapshotWrapperDiv data-test="button_basic_full_width">
                    <Button fullWidth variant="success">
                        Button
                    </Button>
                    <Button fullWidth variant="info">
                        Button
                    </Button>
                    <Button fullWidth variant="warning">
                        Button
                    </Button>
                    <Button fullWidth variant="error">
                        Button
                    </Button>
                    <Button fullWidth variant="white">
                        Button
                    </Button>
                </SnapshotWrapperDiv>
                <Button isTransparent fullWidth data-test="button_basic_transparent_full_width">
                    Transparent
                </Button>
                <Button isDisabled fullWidth data-test="button_basic_disabled_full_width">
                    Disabled
                </Button>
            </Div>

            <H5>with an icon</H5>
            <Div>
                <SnapshotWrapperDiv data-test="button_basic_full_width_icon">
                    <Button fullWidth icon="PLUS" variant="success">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="info">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="warning">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="error">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="white">
                        Button
                    </Button>
                </SnapshotWrapperDiv>
                <Button
                    fullWidth
                    icon="PLUS"
                    isTransparent
                    data-test="button_basic_icon_transparent_full_width"
                >
                    Transparent
                </Button>
                <Button
                    fullWidth
                    icon="PLUS"
                    isDisabled
                    data-test="button_basic_icon_disabled_full_width"
                >
                    Disabled
                </Button>
            </Div>

            <H5>with loading </H5>
            <Div>
                <SnapshotWrapperDiv data-test="button_basic_full_width_loading">
                    <Button fullWidth isLoading variant="success">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="info">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="warning">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="error">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="white">
                        Button
                    </Button>
                </SnapshotWrapperDiv>
                <Button
                    fullWidth
                    isLoading
                    isTransparent
                    data-test="button_basic_loading_transparent_full_width"
                >
                    Transparent
                </Button>
                <Button
                    fullWidth
                    isLoading
                    isDisabled
                    data-test="button_basic_loading_disabled_full_width"
                >
                    Disabled
                </Button>
            </Div>

            <H1>Basic - right aligned full with </H1>
            <Div>
                <SnapshotWrapperDiv data-test="button_basic_full_width_right">
                    <Button fullWidth variant="success" align="right">
                        Button
                    </Button>
                    <Button fullWidth variant="info" align="right">
                        Button
                    </Button>
                    <Button fullWidth variant="warning" align="right">
                        Button
                    </Button>
                    <Button fullWidth variant="error" align="right">
                        Button
                    </Button>
                    <Button fullWidth variant="white" align="right">
                        Button
                    </Button>
                </SnapshotWrapperDiv>
                <Button
                    isTransparent
                    fullWidth
                    data-test="button_basic_transparent_full_width_right"
                    align="right"
                >
                    Transparent
                </Button>
                <Button
                    isDisabled
                    fullWidth
                    data-test="button_basic_disabled_full_width_right"
                    align="right"
                >
                    Disabled
                </Button>
            </Div>

            <H5>with an icon</H5>
            <Div>
                <SnapshotWrapperDiv data-test="button_basic_icon_full_width_right">
                    <Button fullWidth icon="PLUS" variant="success" align="right">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="info" align="right">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="warning" align="right">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="error" align="right">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="white" align="right">
                        Button
                    </Button>
                </SnapshotWrapperDiv>
                <Button
                    fullWidth
                    icon="PLUS"
                    isTransparent
                    data-test="button_basic_icon_transparent_full_width_right"
                    align="right"
                >
                    Transparent
                </Button>
                <Button
                    fullWidth
                    icon="PLUS"
                    isDisabled
                    data-test="button_basic_icon_disabled_full_width_right"
                    align="right"
                >
                    Disabled
                </Button>
            </Div>

            <H5>with loading </H5>
            <Div>
                <SnapshotWrapperDiv data-test="button_basic_loading_full_width_right">
                    <Button fullWidth isLoading variant="success" align="right">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="info" align="right">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="warning" align="right">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="error" align="right">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="white" align="right">
                        Button
                    </Button>
                </SnapshotWrapperDiv>
                <Button
                    fullWidth
                    isLoading
                    isTransparent
                    data-test="button_basic_loading_transparent_full_width_right"
                    align="right"
                >
                    Transparent
                </Button>
                <Button
                    fullWidth
                    isLoading
                    isDisabled
                    data-test="button_basic_loading_disabled_full_width_right"
                    align="right"
                >
                    Disabled
                </Button>
            </Div>

            <H5>Basic - full width aligned left</H5>
            <Div>
                <SnapshotWrapperDiv data-test="button_basic_full_width_left">
                    <Button fullWidth variant="success" align="left">
                        Button
                    </Button>
                    <Button fullWidth variant="info" align="left">
                        Button
                    </Button>
                    <Button fullWidth variant="warning" align="left">
                        Button
                    </Button>
                    <Button fullWidth variant="error" align="left">
                        Button
                    </Button>
                    <Button fullWidth variant="white" align="left">
                        Button
                    </Button>
                </SnapshotWrapperDiv>
                <Button
                    isTransparent
                    fullWidth
                    data-test="button_basic_transparent_full_width_left"
                    align="left"
                >
                    Transparent
                </Button>
                <Button
                    isDisabled
                    fullWidth
                    data-test="button_basic_disabled_full_width_left"
                    align="left"
                >
                    Disabled
                </Button>
            </Div>

            <H5>with an icon</H5>
            <Div>
                <SnapshotWrapperDiv data-test="button_basic_icon_full_width_left">
                    <Button fullWidth icon="PLUS" variant="success" align="left">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="info" align="left">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="warning" align="left">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="error" align="left">
                        Button
                    </Button>
                    <Button fullWidth icon="PLUS" variant="white" align="left">
                        Button
                    </Button>
                </SnapshotWrapperDiv>
                <Button
                    fullWidth
                    icon="PLUS"
                    isTransparent
                    data-test="button_basic_icon_transparent_full_width_left"
                    align="left"
                >
                    Transparent
                </Button>
                <Button
                    fullWidth
                    icon="PLUS"
                    isDisabled
                    data-test="button_basic_icon_disabled_full_width_left"
                    align="left"
                >
                    Disabled
                </Button>
            </Div>

            <H5>with loading </H5>
            <Div>
                <SnapshotWrapperDiv data-test="button_basic_loading_full_width_left">
                    <Button fullWidth isLoading variant="success" align="left">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="info" align="left">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="warning" align="left">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="error" align="left">
                        Button
                    </Button>
                    <Button fullWidth isLoading variant="white" align="left">
                        Button
                    </Button>
                </SnapshotWrapperDiv>
                <Button
                    fullWidth
                    isLoading
                    isTransparent
                    data-test="button_basic_loading_transparent_full_width_left"
                    align="left"
                >
                    Transparent
                </Button>
                <Button
                    fullWidth
                    isLoading
                    isDisabled
                    data-test="button_basic_loading_disabled_full_width_left"
                    align="left"
                >
                    Disabled
                </Button>
            </Div>
        </Wrapper>
    ),
    {
        info: {
            disable: true,
        },
    }
);
