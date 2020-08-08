import { Dispatch } from 'redux';
import { Action } from '@/types/types';
import { confirmModalLoadingStop, confirmModalLoadingStart } from './actions';

type ParamsType = {
  dispatch: Dispatch;
  comfirmModalParams: {
    confirmAction: Action<any>;
    confirmActionParams: any;
  };
};

export const confirmModalActionCreator = ({
  dispatch,
  comfirmModalParams: { confirmAction, confirmActionParams },
}: ParamsType) => {
  dispatch(confirmModalLoadingStart());

  dispatch(confirmAction(confirmActionParams));

  dispatch(confirmModalLoadingStop());
};
