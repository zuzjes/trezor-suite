import React from 'react';
import { Notification } from '@trezor/components';
import { FormattedMessage } from 'react-intl';
import l10nCommonMessages from '@suite-views/index.messages';
import { Props as BaseProps } from '../../index';

interface Props {
    device: BaseProps['suite']['device'];
}

export default ({ device }: Props) => {
    const failedBackup = device && device.features && device.features.unfinished_backup;
    if (!failedBackup) return null;
    return (
        <Notification
            key="failed-backup"
            variant="error"
            title={<FormattedMessage {...l10nCommonMessages.TR_BACKUP_FAILED} />}
            message={<FormattedMessage {...l10nCommonMessages.TR_BACKUP_PROCESS_WAS_INTERRUPTED} />}
        />
    );
};