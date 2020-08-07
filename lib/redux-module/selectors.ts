import { createSelector } from 'reselect';
import {
  INotificationsStoragePart,
  INotificationsStorage,
} from '@/types/types';
import { REDUCER_NAME } from './constants';
import { initialState } from './reducer';

const modalStorageSelector = (store: INotificationsStoragePart) =>
  store[REDUCER_NAME] || initialState;

export const getModalStackSelector = createSelector(
  [modalStorageSelector],
  ({ modals }: INotificationsStorage) => modals,
);

export const getIsConfirmModalOpened = createSelector(
  [modalStorageSelector],
  ({ isModalOpened }: INotificationsStorage) => isModalOpened,
);

export const getConfirmModalParams = createSelector(
  [modalStorageSelector],
  ({ modalParams }: INotificationsStorage) => modalParams,
);
