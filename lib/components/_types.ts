import { MouseEvent } from 'react';
import { notificationStatus } from '@/constants';

export interface IMakeExternalActionParams {
  id: string;
  additionalActionType?: string;
  additionalPayload?: any;
}

export interface INotificationsModalsParams {
  text?: string;
  handleCloseClick: (event: MouseEvent<any>) => void;
  status: keyof typeof notificationStatus;
}
