import { MouseEvent } from 'react';
import { SUCCESS_STATUS, ERROR_STATUS } from '@/constants';

export type IMakeExternalActionParams = {
  id: string;
  additionalActionType?: string;
  additionalPayload?: any;
};

export type NotificationIconStatusType =
  | typeof SUCCESS_STATUS
  | typeof ERROR_STATUS;

export type INotificationsModalsParams = {
  text?: string;
  handleCloseClick: (event: MouseEvent<any>) => void;
  status: NotificationIconStatusType;
};

export type NotificationType = {
  status: NotificationIconStatusType;
  text: string;
  id: string;
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
