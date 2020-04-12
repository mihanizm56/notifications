import React, { Component, createRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { removeModalAction } from '@/redux-module/actions';
import { getModalStack } from '@/redux-module/selectors';
import { NotificationType, IMakeExternalActionParams } from '@/types/types';
import { NotificationsModal } from './_components/notification-modal';
import styles from './index.scss';

const cn = classnames.bind(styles);

const TIME_TO_ENTER_MODAL = 500;
const TIME_TO_EXIT_MODAL = 500;
const TIME_TO_HOLD_MODAL = 10000;

interface IProps {
  dispatch: Dispatch;
  modalStack: Array<NotificationType>;
}

export class WrappedContainer extends Component<IProps> {
  notificationModalRef: any = createRef();

  closeModal = (id: string) => this.props.dispatch(removeModalAction({ id }));

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
