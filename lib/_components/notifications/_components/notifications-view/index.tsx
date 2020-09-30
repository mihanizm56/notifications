import React, { memo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames/bind';
import { Portal } from '@/_components/portal';
import { IMakeExternalActionParams, NotificationType } from '@/types';
import {
  TIME_TO_ENTER_MODAL,
  TIME_TO_EXIT_MODAL,
  TIME_TO_HOLD_MODAL,
} from '@/constants';
import styles from './index.scss';
import { NotificationsModal } from './_components/notification-modal';

const BLOCK_NAME = 'Notifications-modals-container';

const cn = classnames.bind(styles);

type PropsType = {
  modalStack: Array<NotificationType>;
  closeModal: (id: string) => void;
  makeExternalAction: (params: IMakeExternalActionParams) => void;
};

export const NotificationsView = memo(
  ({ modalStack, closeModal, makeExternalAction }: PropsType) => (
    <Portal prefix="notifications" zIndex={99}>
      <TransitionGroup className={cn(BLOCK_NAME)}>
        {modalStack.map(
          ({
            status,
            text,
            title,
            id,
            additionalActionType,
            additionalPayload,
            customHoldTimeout,
          }) => (
            <CSSTransition
              key={id}
              timeout={{
                enter: TIME_TO_ENTER_MODAL,
                exit: TIME_TO_EXIT_MODAL,
              }}
              classNames={{
                enter: cn(`${BLOCK_NAME}__modal-animation-box--enter`),
              }}
            >
              <div className={cn(`${BLOCK_NAME}__modal-animation-box`)}>
                <NotificationsModal
                  status={status}
                  text={text}
                  key={id}
                  title={title}
                  id={id}
                  closeModal={closeModal}
                  timeToHold={customHoldTimeout || TIME_TO_HOLD_MODAL}
                  externalAction={makeExternalAction}
                  additionalActionType={additionalActionType}
                  additionalPayload={additionalPayload}
                />
              </div>
            </CSSTransition>
          ),
        )}
      </TransitionGroup>
    </Portal>
  ),
);
