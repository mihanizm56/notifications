import { NotificationType, Action } from '@/types/types';

export const SET_MODAL = 'SET_MODAL';
export const setModalAction: Action<NotificationType> = payload => ({
  type: SET_MODAL,
  payload,
});

export const REMOVE_MODAL = 'REMOVE_MODAL';
export const removeModalAction: Action<{ id: string }> = payload => ({
  type: REMOVE_MODAL,
  payload,
});
