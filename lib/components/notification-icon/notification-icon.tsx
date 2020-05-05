import React, { memo } from 'react';
import {
  ErrorOutlineOutlined,
  CheckCircleOutlineSharp,
} from '@material-ui/icons';
import { NotificationIconStatusType } from '@/types/types';
import { SUCCESS_STATUS } from '@/constants';

type PropsType = {
  status: NotificationIconStatusType;
};

export const NotificationIcon = memo(({ status }: PropsType) =>
  status === SUCCESS_STATUS ? (
    <CheckCircleOutlineSharp style={{ color: '#00C143', }} />
  ) : (
    <ErrorOutlineOutlined color="error" />
  ),
);
