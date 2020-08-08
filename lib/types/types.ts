import { MouseEvent } from 'react';
import {
  ButtonVariant,
  ButtonType,
  ButtonSize,
} from '@wildberries/ui-kit/lib/button/types';
import { notificationIconStatus } from '@/constants';
import { NOTIFICATIONS_REDUCER_NAME } from '@/redux-module/constants';

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
  isModalOpened: boolean;
  modalParams: ConfirmModalActionType;
  isConfirmModalLoading: boolean;
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

export type BaseButtonType = {
  title: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  withLoader?: boolean;
};
export type ActionButtonType = BaseButtonType & {
  onClick: () => void;
};
export type ActionsConfigType = {
  actionButton?: ActionButtonType;
  cancelButton?: ActionButtonType;
};

export type ConfirmModalActionType = {
  title: string;
  text: string;
  confirmAction: Action<any>;
  confirmActionParams: any;
  confirmButtonProps: {
    text: string;
  };
  cancelButtonProps: {
    text: string;
    action?: Action<any> | BaseAction;
  };
};
