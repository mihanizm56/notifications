import React, {
  memo,
  useEffect,
  TouchEvent,
  Props,
  useCallback,
  useRef,
} from 'react';
import classnames from 'classnames/bind';
import { Close } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Text } from '@wildberries/ui-kit';
import styles from '../../styles/index.module.css';
import {
  IMakeExternalActionParams,
  NotificationIconStatusType,
} from '../_types';
import { NotificationIcon } from '../notification-icon/notification-icon';

const cn = classnames.bind(styles);

type PropType = {
  closeModal: (id: string) => void;
  id: string;
  text: string;
  status: NotificationIconStatusType;
  timeToHold: number;
  externalAction?: ({
    id,
    additionalActionType,
  }: IMakeExternalActionParams) => void;
  additionalActionType?: string;
  additionalPayload?: any; // any because we dont know this type
} & Props<any>;

export const NotificationsModal = memo(
  ({
    closeModal,
    id,
    text,
    status,
    timeToHold,
    externalAction,
    additionalActionType,
    additionalPayload,
  }: PropType) => {
    const notificationModalRef = useRef(null);

    useEffect(() => {
      if (Boolean(notificationModalRef.current)) {
        const modalComputedStyles = getComputedStyle(
          // eslint-disable-next-line
          // @ts-ignore
          notificationModalRef.current,
        );

        const modalHeight = Number(
          modalComputedStyles.getPropertyValue('height').slice(0, 2),
        );

        const modalPaddingTop = Number(
          modalComputedStyles.getPropertyValue('padding-top').slice(0, 2),
        );

        const modalPaddingBottom = Number(
          modalComputedStyles.getPropertyValue('padding-bottom').slice(0, 2),
        );

        document.documentElement.style.setProperty(
          '--notification-max-height',
          `${(modalHeight + modalPaddingTop + modalPaddingBottom) * 2}px`,
        );
      }

      const timer = setTimeout(() => closeModal(id), timeToHold);
      return () => clearTimeout(timer);
    }, []); //eslint-disable-line

    let touchFromX = 0;
    let touchToX = 0;

    const handleCloseClick = useCallback(() => {
      if (additionalActionType && externalAction) {
        externalAction({ id, additionalActionType, additionalPayload });
      }

      closeModal(id);
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
        ref={notificationModalRef}
      >
        <div className={cn('notificationModalContent')}>
          <div className={cn('iconContainer')}>
            <NotificationIcon status={status} />
          </div>
          <div className={cn('textContainer')}>
            <Text text={text} size="h2" color="black" />
          </div>
          <IconButton size="small" onClick={handleCloseClick}>
            <Close />
          </IconButton>
        </div>
      </div>
    );
  },
);
