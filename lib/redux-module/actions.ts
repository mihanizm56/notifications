import { Action } from '@mihanizm56/redux-core-modules';
import { NotificationType } from '@/types';

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
