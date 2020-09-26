import React, { useState } from 'react';
import { createAppStore } from '@wildberries/redux-core-modules';
import {
  Button,
  SimpleInput,
  Select,
  SelectOptionType,
} from '@wildberries/ui-kit';
import { useDispatch, Provider } from 'react-redux';
import { Notifications } from '@/components/container';
import { setModalAction } from '@/redux-module/actions';

export default {
  title: 'Notifications',
};

const store = createAppStore({});

const statusOptions: Array<SelectOptionType> = [
  {
    id: '1',
    value: 'success',
    title: 'Успех',
  },
  {
    id: '2',
    value: 'error',
    title: 'Ошибка',
  },
  {
    id: '3',
    value: 'warning',
    title: 'Предупреждение',
  },
];

const SetModalComponent = () => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [timeoutValue, setTimeoutValue] = useState('');
  const [statusValue, setStatusValue] = useState(statusOptions[0]);

  const setModal = () =>
    dispatch(
      setModalAction({
        title: titleValue,
        text: textValue,
        // eslint-disable-next-line
        // @ts-ignore
        status: statusValue.value,
        customHoldTimeout: Number(timeoutValue),
      }),
    );

  return (
    <div style={{ paddingBottom: '30px' }}>
      <div style={{ marginBottom: '30px' }}>
        <SimpleInput
          name="title"
          id="title"
          placeholder="Введите title"
          value={titleValue}
          onChange={({ value }) => setTitleValue(value)}
        />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <SimpleInput
          name="text"
          id="text"
          placeholder="Введите text"
          value={textValue}
          onChange={({ value }) => setTextValue(value)}
        />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <SimpleInput
          name="timeout"
          id="timeout"
          placeholder="Введите timeout показа модалки (если пуст то 10 секунд)"
          value={timeoutValue}
          onChange={({ value }) => setTimeoutValue(value)}
        />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <Select
          placeholder="Введите status"
          value={statusValue}
          options={statusOptions}
          name="status"
          id="status"
          onChange={({ value }) => setStatusValue(value)}
        />
      </div>
      <div>
        <Button text="set positive modal" type="button" onClick={setModal} />
      </div>
    </div>
  );
};

export const ModalsInAction = () => (
  <Provider store={store}>
    <Notifications />
    <SetModalComponent />
  </Provider>
);

export const ModalsInAction1 = () => (
  <Provider store={store}>
    <Notifications />
    <SetModalComponent />
  </Provider>
);
