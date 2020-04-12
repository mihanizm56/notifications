import {
  INotificationsStorage,
  // NotificationType
} from '@/types/types';
import { SET_MODAL, REMOVE_MODAL } from './actions';

// type NotificationsActionsType = {
//   type: string;
//   payload?: NotificationType | { id: string };
// };

const initialState: INotificationsStorage = {
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
        modals: [...state.modals, payload],
      };

    case REMOVE_MODAL:
      return {
        ...state,
        modals: state.modals.filter(modal => modal.id !== payload.id),
      };

    default:
      return state;
  }
};
