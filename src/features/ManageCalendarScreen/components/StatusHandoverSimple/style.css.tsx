import { StyleSheet } from 'react-native';
import { applicationColors } from '../../../../../style.css';

export default StyleSheet.create({
  txtNotOrdered: {
    color: applicationColors.calendarStatus.notOrdered.color,
  },
  txtOrdered: {
    color: applicationColors.calendarStatus.ordered.color,
  },
  txtConfirmed: {
    color: applicationColors.calendarStatus.confimred.color,
  },
  txtSuccess: {
    color: applicationColors.calendarStatus.success.color,
  },
  txtReady: {
    color: applicationColors.calendarStatus.ready.color,
  },
  txtWait: {
    color: applicationColors.calendarStatus.wait.color,
  },
  txtFail: {
    color: applicationColors.calendarStatus.fail.color,
  },
  txtNotFinishPayment: {
    color: applicationColors.calendarStatus.notFinishPayment.color,
  },
});
