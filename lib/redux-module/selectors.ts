import { createSelector } from 'reselect';
import {
  INotificationsStoragePart,
  INotificationsStorage,
} from '@/types/types';

const modalStorageSelector = (store: INotificationsStoragePart) =>
  store.notificationsState;

export const getModalStack = createSelector(
  [modalStorageSelector],
  (storage: INotificationsStorage) => (storage ? storage.modals : []),
);
