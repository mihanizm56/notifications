import { MouseEvent } from 'react';
import { notificationStatus } from '@/constants';
import { NOTIFICATIONS_REDUCER_NAME } from '@/redux-module/constants';

export type IMakeExternalActionParams = {
  id: string;
  additionalActionType?: string;
  additionalPayload?: any;
};

export type INotificationsModalsParams = {
  text?: string;
  handleCloseClick: (event: MouseEvent<any>) => void;
  status: keyof typeof notificationStatus;
};

export type NotificationType = {
  status: keyof typeof notificationStatus;
  text?: string;
  title?: string;
  id: string;
  additionalPayload?: any;
  additionalActionType?: string;
  customHoldTimeout?: number;
};

export interface INotificationsStorage {
  modals: Array<NotificationType>;
}

export interface INotificationsStoragePart {
  [NOTIFICATIONS_REDUCER_NAME]: INotificationsStorage;
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
