import { INotificationsStorage } from '@/types';
import { SET_MODAL, REMOVE_MODAL } from './actions';

export const initialState: INotificationsStorage = {
  modals: [],
};

export const notificationsModuleReducer = (
  state: INotificationsStorage = initialState,
  { type, payload }: any,
) => {
  switch (type) {
    case SET_MODAL:
      return {
        ...state,
        modals: [payload, ...state.modals],
      };

    case REMOVE_MODAL:
      return {
        ...state,
        modals: state.modals.filter(modal => modal.id !== payload),
      };

    default:
      return state;
  }
};
