import { INotificationsStorage } from '@/types/types';
import {
  SET_MODAL,
  REMOVE_MODAL,
  OPEN_CONFIRM_MODAL,
  CLOSE_CONFIRM_MODAL,
} from './actions';

export const initialState: INotificationsStorage = {
  modals: [],
  isModalOpened: false,
  modalParams: {},
};

export const notificationsModuleReducer = (
  state: INotificationsStorage = initialState,
  { type, payload }: any,
) => {
  switch (type) {
    case SET_MODAL:
      return {
        ...state,
        modals: [...state.modals, payload],
      };

    case REMOVE_MODAL:
      return {
        ...state,
        modals: state.modals.filter(modal => modal.id !== payload),
      };

    case OPEN_CONFIRM_MODAL:
      return {
        ...state,
        isModalOpened: true,
      };

    case CLOSE_CONFIRM_MODAL:
      return {
        ...state,
        isModalOpened: false,
      };

    default:
      return state;
  }
};
