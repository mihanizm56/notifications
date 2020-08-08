import React, { Component, createRef } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Modal, Text } from '@wildberries/ui-kit';
import {
  getConfirmModalParams,
  getIsConfirmModalOpened,
  getModalStackSelector,
} from '@/redux-module/selectors';
import {
  removeModalAction,
  closeConfirmModalAction,
} from '@/redux-module/actions';
import {
  NotificationType,
  BaseAction,
  ActionsConfigType,
  ConfirmModalActionType,
} from '@/types/types';
import {
  TIME_TO_ENTER_MODAL,
  TIME_TO_EXIT_MODAL,
  TIME_TO_HOLD_MODAL,
} from '@/constants';
import styles from '../styles/index.module.css';
import { IMakeExternalActionParams } from './_types';
import { NotificationsModal } from './notification-modal';

const cn = classnames.bind(styles);

type PropsType = {
  modalStack: Array<NotificationType>;
  isConfirmModalOpened: boolean;
  confirmModalParams: ConfirmModalActionType;
  closeConfirmModal: BaseAction;
  dispatch: Dispatch;
};

export class WrappedContainer extends Component<PropsType> {
  notificationModalRef: any = createRef();

  closeModal = (id: string) => this.props.dispatch(removeModalAction(id));

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

  confirmModal = () =>
    this.props.confirmModalParams.confirmAction(
      this.props.confirmModalParams.confirmActionParams,
    );

  getModalConfrmPropsConfig = (): ActionsConfigType => ({
    actionButton: {
      onClick: this.confirmModal,
      type: 'button',
      withLoader: true,
      isLoading: false,
      size: 'big',
      title: this.props.confirmModalParams.confirmButtonProps.text,
      variant: 'main',
    },
    cancelButton: {
      onClick: this.props.closeConfirmModal,
      type: 'button',
      withLoader: true,
      isLoading: false,
      size: 'big',
      title: this.props.confirmModalParams.cancelButtonProps.text,
      variant: 'interface',
    },
  });

  render() {
    const {
      modalStack,
      confirmModalParams: { text: confirmModalText, title },
    } = this.props;

    return (
      <>
        <Modal
          actionsConfig={this.getModalConfrmPropsConfig()}
          isShowCloseIcon
          isOpened={this.props.isConfirmModalOpened}
          isTransparent
          onClose={this.props.closeConfirmModal}
          title={title}
          titleSize="h1"
        >
          <Text text={confirmModalText} size="h4" color="black" />
        </Modal>

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
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  modalStack: getModalStackSelector(state),
  isConfirmModalOpened: getIsConfirmModalOpened(state),
  confirmModalParams: getConfirmModalParams(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      closeConfirmModal: closeConfirmModalAction,
      dispatch,
    },
    dispatch,
  );

export const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedContainer);
