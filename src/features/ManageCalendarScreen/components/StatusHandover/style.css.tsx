import { StyleSheet } from 'react-native';
import { applicationColors } from '../../../../../style.css';

export default StyleSheet.create({
  statusContainer: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusContainerNotOrdered: {
    backgroundColor: applicationColors.calendarStatus.notOrdered.bgColor,
    borderColor: applicationColors.calendarStatus.notOrdered.color,
  },
  txtNotOrdered: {
    color: applicationColors.calendarStatus.notOrdered.color,
  },
  statusContainerOrdered: {
    backgroundColor: applicationColors.calendarStatus.ordered.bgColor,
    borderColor: applicationColors.calendarStatus.ordered.color,
  },
  txtOrdered: {
    color: applicationColors.calendarStatus.ordered.color,
  },
  statusContainerConfirmed: {
    backgroundColor: applicationColors.calendarStatus.confimred.bgColor,
    borderColor: applicationColors.calendarStatus.confimred.color,
  },
  txtConfirmed: {
    color: applicationColors.calendarStatus.confimred.color,
  },
  statusContainerSuccess: {
    backgroundColor: applicationColors.calendarStatus.success.bgColor,
    borderColor: applicationColors.calendarStatus.success.color,
  },
  txtSuccess: {
    color: applicationColors.calendarStatus.success.color,
  },
  statusContainerReady: {
    backgroundColor: applicationColors.calendarStatus.ready.bgColor,
    borderColor: applicationColors.calendarStatus.ready.color,
  },
  txtReady: {
    color: applicationColors.calendarStatus.ready.color,
  },
  statusContainerWait: {
    backgroundColor: applicationColors.calendarStatus.wait.bgColor,
    borderColor: applicationColors.calendarStatus.wait.color,
  },
  txtWait: {
    color: applicationColors.calendarStatus.wait.color,
  },
  statusContainerFail: {
    backgroundColor: applicationColors.calendarStatus.fail.bgColor,
    borderColor: applicationColors.calendarStatus.fail.color,
  },
  txtFail: {
    color: applicationColors.calendarStatus.fail.color,
  },
  statusContainerNotFinishPayment: {
    backgroundColor: applicationColors.calendarStatus.notFinishPayment.bgColor,
    borderColor: applicationColors.calendarStatus.notFinishPayment.color,
  },
  txtNotFinishPayment: {
    color: applicationColors.calendarStatus.notFinishPayment.color,
  },
});
