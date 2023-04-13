import React from 'react';
import {
  GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import Firebase, { EventParams, EventIdType } from '../../services/firebase';

interface TouchableComponentPropType {
  useForeground?: boolean;
  onPress?: (event?: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  eventId?: EventIdType; // push this event to firebase tracking when onPress is called
  eventParams?: EventParams; // more data of the event
  disabled?: boolean;
}

// Wrap a child that should be Touchable with platform specific component.
export default function TouchableComponent(props: TouchableComponentPropType) {
  const {
    useForeground,
    onPress,
    children,
    eventId,
    eventParams,
    disabled,
    style,
  } = props;

  function onPressCallback(e: GestureResponderEvent) {
    if (onPress) {
      onPress(e);
    }
    if (eventId) {
      Firebase.track(eventId, eventParams);
    }
  }

  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback
      disabled={disabled}
      useForeground={useForeground}
      onPress={onPressCallback}
      background={TouchableNativeFeedback.SelectableBackground()}
      style={style}
    >
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableWithoutFeedback
      onPress={onPressCallback}
      style={style}
      disabled={disabled}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
