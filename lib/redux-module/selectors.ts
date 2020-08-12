import { createSelector } from 'reselect';
import {
  INotificationsStoragePart,
  INotificationsStorage,
} from '@/types/types';
import { NOTIFICATIONS_REDUCER_NAME } from './constants';
import { initialState } from './reducer';

const modalStorageSelector = (store: INotificationsStoragePart) =>
  store[NOTIFICATIONS_REDUCER_NAME] || initialState;

export const getModalStackSelector = createSelector(
  [modalStorageSelector],
  ({ modals }: INotificationsStorage) => modals,
);
