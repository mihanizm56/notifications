export { setModalAction, removeModalAction } from './redux-module/actions';
export {
  notificationsModuleReducer as notificationsState,
} from './redux-module/reducer';
export { Notifications } from './components';
export {
  NotificationsModal,
} from './components/_components/notification-modal';

export {
  DEFAULT_SUCCESS_NOTIFICATION_MESSAGE,
  DEFAULT_ERROR_NOTIFICATION_MESSAGE,
} from './constants';
