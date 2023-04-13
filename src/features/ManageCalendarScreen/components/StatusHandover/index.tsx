import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import EText from 'components/Text';
import { HandoverStatusType, STATUS_HANDOVER } from 'features/Csm/types';
import styles from './style.css';

const StatusHandover = ({
  handoverStatus,
}: {
  handoverStatus: HandoverStatusType;
}) => {
  let style: ViewStyle = {};
  let textStyle: TextStyle = {};
  switch (handoverStatus.code) {
    case STATUS_HANDOVER.NOT_SCHEDULE:
      style = styles.statusContainerNotOrdered;
      textStyle = styles.txtNotOrdered;
      break;
    case STATUS_HANDOVER.SCHEDULED:
      style = styles.statusContainerOrdered;
      textStyle = styles.txtOrdered;
      break;
    case STATUS_HANDOVER.SCHEDULED_CONFIRMED:
      style = styles.statusContainerConfirmed;
      textStyle = styles.txtConfirmed;
      break;
    case STATUS_HANDOVER.HANDOVER_SUCCESS:
      style = styles.statusContainerSuccess;
      textStyle = styles.txtSuccess;
      break;
    case STATUS_HANDOVER.HANDOVER_READY:
      style = styles.statusContainerReady;
      textStyle = styles.txtReady;
      break;
    case STATUS_HANDOVER.WAIT_CALENDAR_AGREE:
      style = styles.statusContainerWait;
      textStyle = styles.txtWait;
      break;
    case STATUS_HANDOVER.HANDOVER_FAILED:
      style = styles.statusContainerFail;
      textStyle = styles.txtFail;
      break;
    case STATUS_HANDOVER.NOT_PAYMENT_COMPLETED:
      style = styles.statusContainerNotFinishPayment;
      textStyle = styles.txtNotFinishPayment;
      break;
    default:
      break;
  }
  return (
    <View style={[styles.statusContainer, style]}>
      <EText fontSize="tiny" bold="semiBold" style={textStyle}>
        {handoverStatus.name}
      </EText>
    </View>
  );
};

export default StatusHandover;
