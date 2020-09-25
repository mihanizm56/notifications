import React from 'react';
import { createAppStore } from '@wildberries/redux-core-modules';
import { Button } from '@wildberries/ui-kit';
import { useDispatch, Provider } from 'react-redux';
import { Notifications } from '@/components/container';
import { setModalAction } from '@/redux-module/actions';

export default {
  title: 'Notifications',
};

const store = createAppStore({});

const SetModalComponent = () => {
  const dispatch = useDispatch();

  const setModal = () =>
    dispatch(
      setModalAction({
        status: 'success',
      }),
    );

  return <Button text="set positive modal" type="button" onClick={setModal} />;
};

export const ModalsInAction = () => (
  <Provider store={store}>
    <Notifications />
    <SetModalComponent />
  </Provider>
);
