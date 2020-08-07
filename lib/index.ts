export {
  setModalAction,
  removeModalAction,
  openConfirmModalAction,
  closeConfirmModalAction,
} from './redux-module/actions';
export {
  notificationsModuleReducer as notificationsState,
} from './redux-module/reducer';
export { Notifications } from './components/container';
export { NOTIFICATIONS_REDUCER_NAME } from './redux-module/constants';
export { NotificationsModal } from './components/notification-modal';
