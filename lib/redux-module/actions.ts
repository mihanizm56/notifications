import { uniqueId } from 'lodash-es';
import { NotificationType, Action } from '@/types/types';

export const SET_MODAL = 'SET_MODAL';
export const setModalAction: Action<
  Omit<NotificationType, 'id'>
> = actionPayload => ({
  type: SET_MODAL,
  payload: {
    ...actionPayload,
    id: uniqueId('notification_'),
  },
});

export const REMOVE_MODAL = 'REMOVE_MODAL';
export const removeModalAction: Action<string> = payload => ({
  type: REMOVE_MODAL,
  payload,
});
