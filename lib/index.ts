export { setModalAction, removeModalAction } from './redux-module/actions';
export {
  notificationsModuleReducer as notificationsState,
  NOTIFICATIONS_REDUCER_NAME,
} from './redux-module';
export { Notifications } from './_components/notifications';

export {
  NotificationType,
  INotificationsStorage,
  INotificationsStoragePart,
} from './types';
