import React, { memo } from 'react';
import { notificationIconStatus } from '@/constants';
import { SuccessIcon } from './icons/success-icon';
import { WarningIcon } from './icons/warning-icon';
import { ErrorIcon } from './icons/error-icon';

type PropsType = {
  status: keyof typeof notificationIconStatus;
};

export const NotificationIcon = memo(({ status }: PropsType) => {
  switch (status) {
    case notificationIconStatus.success:
      return <SuccessIcon />;

    case notificationIconStatus.warning:
      return <WarningIcon />;

    case notificationIconStatus.error:
      return <ErrorIcon />;

    default:
      return <ErrorIcon />;
  }
});
