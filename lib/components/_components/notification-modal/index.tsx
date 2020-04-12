import React, { memo, useEffect, TouchEvent, Props, useCallback } from 'react';
import classnames from 'classnames/bind';
// import { Close } from '@material-ui/icons';
// import { IconButton } from '@material-ui/core';
import { Text } from '@wildberries/ui-kit';
import {
  IMakeExternalActionParams,
  NotificationIconStatusType,
} from '../../_types';
// import { getNotificationIcon } from '../../_utils/get-notification-icon';
import styles from './index.scss';

const cn = classnames.bind(styles);

interface IProps extends Props<any> {
  closeModal: ({ id }: { id: string }) => void;
  id: string;
  text: string;
  status: NotificationIconStatusType;
  timeToHold: number;
  externalAction: ({
    id,
    additionalActionType,
  }: IMakeExternalActionParams) => void;
  additionalActionType?: string;
  additionalPayload?: any;
}

export const NotificationsModal = memo(
  ({
    closeModal,
    id, // status, // text,
    timeToHold,
    externalAction,
    additionalActionType,
    additionalPayload,
  }: IProps) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        closeModal({ id });
      }, timeToHold);
      return () => clearTimeout(timer);
    }, []); //eslint-disable-line

    let touchFromX = 0;
    let touchToX = 0;
    // const modalIcon = getNotificationIcon(status);

    const handleCloseClick = useCallback(() => {
      if (Boolean(additionalActionType)) {
        externalAction({ id, additionalActionType, additionalPayload });
      }

      closeModal({ id });
    }, [
      additionalPayload,
      closeModal,
      externalAction,
      additionalActionType,
      id,
    ]);

    const trackDeltaTouchMove = useCallback(() => {
      const delta = Math.abs(touchFromX - touchToX);

      if (delta > 60) {
        handleCloseClick();
      }
    }, [handleCloseClick, touchFromX, touchToX]);

    const handleTouchStart = useCallback(({ touches }: TouchEvent) => {
      touchFromX = touches[0].clientX; //eslint-disable-line
    }, []);

    const handleTouchEnd = useCallback(({ changedTouches }: TouchEvent) => {
      touchToX = changedTouches[0].clientX; //eslint-disable-line
      trackDeltaTouchMove();
    }, []);

    return (
      <div
        className={cn('notificationModal')}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Text text="test" size="h2" color="black" />
        {/* <div className={cn('notificationModalContent')}> */}
        {/* <div className={cn('iconContainer')}>{modalIcon}</div> */}
        {/* <div className={cn('textContainer')}>
            <Text text={text} size="h2" color="Black" />
          </div>
          <IconButton size="small" onClick={handleCloseClick}>
            <Close />
          </IconButton> */}
        {/* </div> */}
      </div>
    );
  },
);
