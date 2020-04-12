import { MouseEvent } from 'react';

export type IMakeExternalActionParams = {
  id: string;
  additionalActionType?: string;
  additionalPayload?: any;
};

export type NotificationIconStatusType = 'success' | 'error';

export type INotificationsModalsParams = {
  text?: string;
  handleCloseClick: (event: MouseEvent<any>) => void;
  status: NotificationIconStatusType;
};

export type NotificationType = {
  status: 'success' | 'error';
  text: string;
  id: string;
  externalActionType?: string;
  additionalPayload?: any;
  additionalActionType?: string;
};

export interface INotificationsStorage {
  modals: Array<NotificationType>;
}

export interface INotificationsStoragePart {
  notificationsState: INotificationsStorage;
}

export type BaseAction = () => {
  type: string;
};
export type Action<T> = (
  payload: T,
) => {
  type: string;
  payload: T;
};
