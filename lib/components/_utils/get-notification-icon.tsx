import React from 'react';
import {
  ErrorOutlineOutlined,
  CheckCircleOutlineSharp,
} from '@material-ui/icons';
import { NotificationIconStatusType } from '@/types/types';

export const getNotificationIcon = (status: NotificationIconStatusType) => {
  switch (status) {
    case 'success':
      return <CheckCircleOutlineSharp style={{ color: '#00C143' }} />;

    case 'error':
      return <ErrorOutlineOutlined color="error" />;

    default:
      return null;
  }
};
