import React, { memo } from 'react';
import {
  BasicCircleXIcon,
  BasicCircleCheckedIcon,
  NotificationsAlertCircleIcon,
} from '@wildberries/ui-kit';
import { notificationStatus } from '@/constants';

type PropType = {
  status: keyof typeof notificationStatus;
};

export const NotificationsIcon = memo(({ status }: PropType) => {
  switch (status) {
    case notificationStatus.success:
      return <BasicCircleCheckedIcon colorType="successTextColorColor" />;

    case notificationStatus.error:
      return <BasicCircleXIcon colorType="redColor" />;

    case notificationStatus.warning:
      return <NotificationsAlertCircleIcon colorType="orangeColor" />;

    default:
      return <NotificationsAlertCircleIcon />;
  }
});
