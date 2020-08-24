import React, { Component, createRef } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getModalStackSelector } from '@/redux-module/selectors';
import { removeModalAction } from '@/redux-module/actions';
import { NotificationType, Action } from '@/types/types';
import {
  TIME_TO_ENTER_MODAL,
  TIME_TO_EXIT_MODAL,
  TIME_TO_HOLD_MODAL,
} from '@/constants';
import styles from '../styles/index.module.css';
import { IMakeExternalActionParams } from './_types';
import { NotificationsModal } from './notification-modal';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'Notifications-modals-container';

type PropsType = {
  modalStack: Array<NotificationType>;
  dispatch: Dispatch;
  removeModal: Action<string>;
};

export class WrappedContainer extends Component<PropsType> {
  notificationModalRef: any = createRef();

  closeModal = (id: string) => this.props.removeModal(id);

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
      <TransitionGroup className={cn(BLOCK_NAME)}>
        {modalStack.map(
          ({
            status,
            text,
            title,
            id,
            additionalActionType,
            additionalPayload,
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

const mapStateToProps = (state: any) => ({
  modalStack: getModalStackSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      dispatch,
      removeModal: removeModalAction,
    },
    dispatch,
  );

export const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedContainer);
