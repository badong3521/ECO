import React from 'react';
import { Text, TextStyle } from 'react-native';
import { HandoverStatusType, STATUS_HANDOVER } from 'features/Csm/types';
import styles from './style.css';

const StatusHandoverSimple = ({
  handoverStatus,
  style,
}: {
  handoverStatus: HandoverStatusType;
  style?: TextStyle;
}) => {
  let textStyle: TextStyle = {};
  switch (handoverStatus.code) {
    case STATUS_HANDOVER.NOT_SCHEDULE:
      textStyle = styles.txtNotOrdered;
      break;
    case STATUS_HANDOVER.SCHEDULED:
      textStyle = styles.txtOrdered;
      break;
    case STATUS_HANDOVER.SCHEDULED_CONFIRMED:
      textStyle = styles.txtConfirmed;
      break;
    case STATUS_HANDOVER.HANDOVER_SUCCESS:
      textStyle = styles.txtSuccess;
      break;
    case STATUS_HANDOVER.HANDOVER_READY:
      textStyle = styles.txtReady;
      break;
    case STATUS_HANDOVER.WAIT_CALENDAR_AGREE:
      textStyle = styles.txtWait;
      break;
    case STATUS_HANDOVER.HANDOVER_FAILED:
      textStyle = styles.txtFail;
      break;
    case STATUS_HANDOVER.NOT_PAYMENT_COMPLETED:
      textStyle = styles.txtNotFinishPayment;
      break;
    default:
      break;
  }
  return <Text style={[style, textStyle]}>{handoverStatus.name}</Text>;
};

export default StatusHandoverSimple;
