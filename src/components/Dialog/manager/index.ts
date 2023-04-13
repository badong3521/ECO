import { RefObject } from 'react';
import {
  MessageDialogRef,
  MessageDialogType,
} from '../components/MessageDialog';
import {
  ConfirmDialogRef,
  ConfirmDialogType,
} from '../components/ConfirmDialog';
import {
  LoadingDialogRef,
  LoadingDialogType,
} from '../components/LoadingDialog';

// Manage all custom dialog of whole app: MessageDialog and CustomDialog
// allow 1 dialog can show at a time
// Import this file and call below functions to show or dismiss a dialog

let messageRef: RefObject<MessageDialogRef>;
let confirmDialogRef: RefObject<ConfirmDialogRef>;
let loadingDialogRef: RefObject<LoadingDialogRef>;

function setMessageRef(ref: RefObject<MessageDialogRef>) {
  messageRef = ref;
}

function setConfirmDialogRef(ref: RefObject<ConfirmDialogRef>) {
  confirmDialogRef = ref;
}

function setLoadingDialogRef(ref: RefObject<LoadingDialogRef>) {
  loadingDialogRef = ref;
}

function showMessageDialog(props: MessageDialogType) {
  messageRef?.current?.show(props);
}

function showConfirmDialog(props: ConfirmDialogType) {
  confirmDialogRef?.current?.show(props);
}

function showLoadingDialog(props: LoadingDialogType) {
  loadingDialogRef?.current?.show(props);
}

function showErrorDialog(props: LoadingDialogType) {
  loadingDialogRef?.current?.showError(props);
}

function dismissMessageDialog() {
  messageRef?.current?.dismiss();
}

function dismissConfirmDialog() {
  confirmDialogRef?.current?.dismiss();
}

function dismissLoadingDialog() {
  loadingDialogRef?.current?.dismiss();
}

export default {
  setMessageRef,
  setConfirmDialogRef,
  setLoadingDialogRef,
  showMessageDialog,
  showConfirmDialog,
  showLoadingDialog,
  showErrorDialog,
  dismissMessageDialog,
  dismissConfirmDialog,
  dismissLoadingDialog,
};
