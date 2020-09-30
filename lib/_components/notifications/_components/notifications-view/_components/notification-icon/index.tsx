import React, { memo } from 'react';
import {
  BasicCircleXIcon,
  BasicCircleCheckedIcon,
  NavigationWarningOrangeBigIcon,
} from '@/_components/icons';
import { notificationStatus } from '@/constants';

type PropType = {
  status: keyof typeof notificationStatus;
};

export const NotificationsIcon = memo(({ status }: PropType) => {
  switch (status) {
    case notificationStatus.success:
      return <BasicCircleCheckedIcon fill="success" />;

    case notificationStatus.error:
      return <BasicCircleXIcon fill="error" />;

    case notificationStatus.warning:
      return <NavigationWarningOrangeBigIcon />;

    default:
      return <NavigationWarningOrangeBigIcon />;
  }
});
