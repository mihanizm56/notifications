import React, {
  memo,
  useEffect,
  TouchEvent,
  Props,
  useCallback,
  useRef,
} from 'react';
import classnames from 'classnames/bind';
import { Button, Text, NavigationCloseMediumIcon } from '@wildberries/ui-kit';
import { notificationStatus } from '@/constants';
import { IMakeExternalActionParams } from '../_types';
import { NotificationsIcon } from '../nitification-icon';
import styles from '../../styles/index.module.css';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'Notification-modal';

type PropType = {
  closeModal: (id: string) => void;
  id: string;
  text?: string;
  title?: string;
  status: keyof typeof notificationStatus;
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
    title,
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
          modalComputedStyles.getPropertyValue('height').slice(0, -2),
        );

        const modalMarginTop = Number(
          modalComputedStyles.getPropertyValue('margin-top').slice(0, -2),
        );

        const modalMarginBottom = Number(
          modalComputedStyles.getPropertyValue('margin-bottom').slice(0, -2),
        );

        const modalPaddingTop = Number(
          modalComputedStyles.getPropertyValue('padding-top').slice(0, -2),
        );

        const modalPaddingBottom = Number(
          modalComputedStyles.getPropertyValue('padding-bottom').slice(0, -2),
        );

        document.documentElement.style.setProperty(
          '--notification-max-height',
          `${modalHeight +
            modalMarginTop +
            modalMarginBottom +
            modalPaddingTop +
            modalPaddingBottom +
            5}px`,
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
        className={cn(BLOCK_NAME, {
          [`${BLOCK_NAME}--success`]: status === notificationStatus.success,
          [`${BLOCK_NAME}--error`]: status === notificationStatus.error,
          [`${BLOCK_NAME}--warning`]: status === notificationStatus.warning,
          [`${BLOCK_NAME}--no-text`]: !text,
        })}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={notificationModalRef}
      >
        <div className={cn(`${BLOCK_NAME}__info-icon`)}>
          <NotificationsIcon status={status} />
        </div>
        <div className={cn(`${BLOCK_NAME}__content`)}>
          {title && (
            <div
              className={cn(`${BLOCK_NAME}__title`, {
                [`${BLOCK_NAME}__title--no-text`]: !text,
              })}
            >
              <Text text={title} size="h2" color="black" isBold />
            </div>
          )}
          {text && (
            <div className={cn(`${BLOCK_NAME}__text`)}>
              <Text text={text} size="h4" color="black" />
            </div>
          )}
        </div>
        <div className={cn(`${BLOCK_NAME}__close-button`)}>
          <Button onClick={handleCloseClick} size="small" type="button">
            {NavigationCloseMediumIcon}
          </Button>
        </div>
      </div>
    );
  },
);
