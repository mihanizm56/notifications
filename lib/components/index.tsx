import React, { Component, createRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getModalStack } from '@/redux-module/selectors';
import { removeModalAction } from '@/redux-module/actions';
import { NotificationType } from '@/types/types';
import {
  TIME_TO_ENTER_MODAL,
  TIME_TO_EXIT_MODAL,
  TIME_TO_HOLD_MODAL,
} from '@/constants';
import { IMakeExternalActionParams } from './_types';
import { NotificationsModal } from './notification-modal';
import styles from './index.css';

const cn = classnames.bind(styles);

type PropsType = {
  dispatch: Dispatch;
  modalStack: Array<NotificationType>;
};

export class WrappedContainer extends Component<PropsType> {
  notificationModalRef: any = createRef();

  closeModal = (id: string) => {
    const { dispatch } = this.props;

    dispatch(removeModalAction(id));
  };

  makeExternalAction = ({
    id,
    additionalActionType,
    additionalPayload,
  }: IMakeExternalActionParams) => {
    if (additionalActionType) {
      this.props.dispatch({
        type: additionalActionType,
        payload: { id, ...additionalPayload },
      });
    }
  };

  render() {
    const { modalStack } = this.props;

    return (
      <TransitionGroup className={cn('notificationModalsTransitionGroup')}>
        {modalStack.map(
          ({ status, text, id, additionalActionType, additionalPayload }) => (
            <CSSTransition
              key={id}
              timeout={{
                enter: TIME_TO_ENTER_MODAL,
                exit: TIME_TO_EXIT_MODAL,
              }}
              classNames={{
                enter: cn('modalAnimationBox-enter'),
                exit: cn('modalAnimationBox-exit'),
              }}
            >
              <div className={cn('modalAnimationBox')}>
                <NotificationsModal
                  status={status}
                  text={text}
                  key={id}
                  id={id}
                  closeModal={this.closeModal}
                  timeToHold={TIME_TO_HOLD_MODAL}
                  externalAction={this.makeExternalAction}
                  additionalActionType={additionalActionType}
                  additionalPayload={additionalPayload}
                />
              </div>
            </CSSTransition>
          ),
        )}
      </TransitionGroup>
    );
  }
}

const mapStateToProps = (store: any) => ({ modalStack: getModalStack(store) });

export const Notifications = connect(mapStateToProps)(WrappedContainer);
