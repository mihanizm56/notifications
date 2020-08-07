import { uniqueId } from 'lodash-es';
import { NotificationType, Action, BaseAction } from '@/types/types';

export const SET_MODAL = '@notifications/SET_MODAL';
export const setModalAction: Action<
  Omit<NotificationType, 'id'>
> = actionPayload => ({
  type: SET_MODAL,
  payload: {
    ...actionPayload,
    id: uniqueId('notification_'),
  },
});

export const REMOVE_MODAL = '@notifications/REMOVE_MODAL';
export const removeModalAction: Action<string> = payload => ({
  type: REMOVE_MODAL,
  payload,
});

export const OPEN_CONFIRM_MODAL = '@notifications/OPEN_CONFIRM_MODAL';
export const openConfirmModalAction: Action<any> = payload => ({
  type: OPEN_CONFIRM_MODAL,
  payload,
});

export const CLOSE_CONFIRM_MODAL = '@notifications/CLOSE_CONFIRM_MODAL';
export const closeConfirmModalAction: BaseAction = () => ({
  type: CLOSE_CONFIRM_MODAL,
});
