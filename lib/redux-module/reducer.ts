import { INotificationsStorage } from '@/types/types';
import {
  SET_MODAL,
  REMOVE_MODAL,
  SET_CONFIRM_MODAL,
  CLOSE_CONFIRM_MODAL,
  CONFIRM_MODAL_LOADING_START,
  CONFIRM_MODAL_LOADING_STOP,
} from './actions';

export const initialState: INotificationsStorage = {
  modals: [],
  isModalOpened: false,
  modalParams: {
    confirmAction: () => ({ type: 'DEFAULT_ACTION_TYPE', payload: {} }),
    confirmActionParams: null,
    confirmButtonProps: {
      text: '',
    },
    cancelButtonProps: {
      text: '',
    },
    title: '',
    text: '',
  },
  isConfirmModalLoading: false,
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

    case SET_CONFIRM_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalParams: payload,
      };

    case CLOSE_CONFIRM_MODAL:
      return {
        ...state,
        isModalOpened: false,
      };

    case CONFIRM_MODAL_LOADING_START:
      return {
        ...state,
        isConfirmModalLoading: true,
      };
    case CONFIRM_MODAL_LOADING_STOP:
      return {
        ...state,
        isConfirmModalLoading: false,
      };

    default:
      return state;
  }
};
