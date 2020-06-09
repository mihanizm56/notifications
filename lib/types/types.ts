import { MouseEvent } from 'react';
import { notificationIconStatus } from '@/constants';

export type IMakeExternalActionParams = {
  id: string;
  additionalActionType?: string;
  additionalPayload?: any;
};

export type INotificationsModalsParams = {
  text?: string;
  handleCloseClick: (event: MouseEvent<any>) => void;
  status: keyof typeof notificationIconStatus;
};

export type NotificationType = {
  status: keyof typeof notificationIconStatus;
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
