import React from 'react';
import { Notification } from '@trezor/components';
import { FormattedMessage } from 'react-intl';
import l10nCommonMessages from '@suite-views/index.messages';
import { getRoute } from '@suite-utils/router';
import { Props as BaseProps } from '../../index';

interface Props {
    device: BaseProps['suite']['device'];
    pathname: string;
    goto: BaseProps['goto'];
}

export default ({ device, pathname, goto }: Props) => {
    const failedBackup = device && device.features && device.features.needs_backup;
    if (!failedBackup) return null;
    if (pathname === getRoute('suite-device-backup')) return null;
    return (
        <Notification
            key="failed-backup"
            variant="warning"
            title={<FormattedMessage {...l10nCommonMessages.TR_BACKUP_FAILED} />}
            message={<FormattedMessage {...l10nCommonMessages.TR_BACKUP_PROCESS_WAS_INTERRUPTED} />}
            actions={[
                {
                    label: <FormattedMessage {...l10nCommonMessages.TR_FOLLOW_THIS_GUIDE} />,
                    // label: 'Create backup in 3 minutes',
                    callback: () => goto('suite-device-backup'),
                },
            ]}
        />
    );
};
