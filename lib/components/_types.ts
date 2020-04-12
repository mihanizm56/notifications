import { MouseEvent } from 'react';

export interface IMakeExternalActionParams {
  id: string;
  additionalActionType?: string;
  additionalPayload?: any;
}

export type NotificationIconStatusType = 'success' | 'error';

export interface INotificationsModalsParams {
  text?: string;
  handleCloseClick: (event: MouseEvent<any>) => void;
  status: NotificationIconStatusType;
}
