import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as routerActions from '@suite-actions/routerActions';
import { AppState, Dispatch } from '@suite-types';
import OnlineStatus from './components/OnlineStatus';
import UpdateBridge from './components/UpdateBridge';
import UpdateFirmware from './components/UpdateFirmware';
import NoBackup from './components/NoBackup';
import FailedBackUp from './components/FailedBackUp';

const mapStateToProps = (state: AppState) => ({
    suite: state.suite,
    router: state.router,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    goto: bindActionCreators(routerActions.goto, dispatch),
});

export type Props = {
    children?: React.ReactNode;
} & ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Notifications = (props: Props & InjectedIntlProps) => {
    const { suite } = props;
    const { device, transport } = suite;

    const showFailedBackup = () => {
        return device && device.features && device.features.unfinished_backup;
    };
    const showBridgeUpdate = () => {
        return transport && transport.outdated;
    };
    const showOnlineStatus = () => {
        return suite.online;
    };
    const showNoBackup = () => {
        return device && device.features && device.features.needs_backup;
    };
    const showUpdateFirmware = () => {
        // return device || device.type == 'acquired';
    }


    if (showFailedBackup()) {
        return <FailedBackUp device={props.suite.device} />;
    }
    if (showBridgeUpdate()) {
        return <UpdateBridge transport={props.suite.transport} goto={props.goto} />;
    }
    if (showOnlineStatus) return <OnlineStatus isOnline={props.suite.online} />;
    if (showNoBackup) {
        return (
            <NoBackup
                device={props.suite.device}
                pathname={props.router.pathname}
                goto={props.goto}
            />
        );
    }
    return null;
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Notifications),
);
