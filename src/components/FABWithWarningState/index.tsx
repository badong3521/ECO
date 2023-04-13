import React from 'react';
import { ViewStyle } from 'react-native';
import FAB from '../FAB';
import { applicationColors } from '../../../style.css';
import { EventIdType, EventParams } from '../../services/firebase';

interface FABWithWarningStatePropTypes {
  showWarning: boolean;
  onButtonPress: () => void;
  onWarningPress: () => void;
  style: ViewStyle;
  icon: string;
  color: string;
  eventId?: EventIdType; // push this event to firebase tracking when onPress is called
  eventParams?: EventParams; // more data of the event
}

export default function FABWithWarningState(
  props: FABWithWarningStatePropTypes,
) {
  const {
    showWarning,
    onButtonPress,
    onWarningPress,
    style,
    icon,
    color,
    eventId,
    eventParams,
  } = props;
  return (
    <>
      {showWarning ? (
        <FAB
          icon="warning"
          onPress={onWarningPress}
          color={applicationColors.primary.white}
          style={[
            style,
            { backgroundColor: applicationColors.semantic.error.shade700 },
          ]}
          eventParams={eventParams}
          eventId={eventId}
        />
      ) : (
        <FAB
          icon={icon}
          onPress={onButtonPress}
          color={color}
          style={style}
          eventParams={eventParams}
          eventId={eventId}
        />
      )}
    </>
  );
}
