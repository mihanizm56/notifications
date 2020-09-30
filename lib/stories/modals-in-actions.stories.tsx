import React from 'react';
import { createAppStore } from '@wildberries/redux-core-modules';
import { text, select, number } from '@storybook/addon-knobs';
import { useDispatch, Provider } from 'react-redux';
import { Button } from '@wildberries/ui-kit';
import { Notifications } from '@/_components/notifications';
import { setModalAction } from '@/redux-module';
import { BottomAligned } from './decorators/bottom-aligned';

export default {
  title: 'Notifications',
  decorators: [(story: any) => <BottomAligned>{story()}</BottomAligned>],
};

const store = createAppStore({});

const SetModalComponent = ({
  modalTitle,
  modalText,
  modalStatus,
  timeout: customHoldTimeout,
}: any) => {
  const dispatch = useDispatch();

  const setModal = () =>
    dispatch(
      setModalAction({
        title: modalTitle,
        text: modalText,
        status: modalStatus,
        customHoldTimeout,
      }),
    );

  return (
    <div style={{ width: '100%' }}>
      <Button
        text="Set notification"
        type="button"
        onClick={setModal}
        size="big"
        variant="main"
      />
    </div>
  );
};

export const ModalsInAction = () => (
  <Provider store={store}>
    <Notifications />
    <SetModalComponent
      modalTitle={text('Modal title', 'default title')}
      modalText={text('Modal text', 'default text')}
      timeout={number('Modal hold timeout value', 10000)}
      modalStatus={select(
        'Modal status',
        ['success', 'error', 'warning'],
        'success',
      )}
    />
  </Provider>
);
