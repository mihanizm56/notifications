import React, { Component, createRef } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getModalStackSelector, removeModalAction } from '@/redux-module';
import { NotificationType, Action, IMakeExternalActionParams } from '@/types';
import { NotificationsView } from './_components/notifications-view';

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
    return (
      <NotificationsView
        modalStack={this.props.modalStack}
        closeModal={this.closeModal}
        makeExternalAction={this.makeExternalAction}
      />
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
