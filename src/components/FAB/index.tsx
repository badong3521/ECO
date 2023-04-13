import React from 'react';
import { FAB as RFAB } from 'react-native-paper';
import { View, ViewStyle } from 'react-native';
import TouchableComponent from '../TouchableComponent';
import styles from './style.css';
import IconComponent from '../Icon';
import Text from '../Text';
import Firebase, { EventIdType, EventParams } from '../../services/firebase';

interface FABPropTypes {
  icon: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  color?: string;
  visible?: boolean;
  label?: string;
  labelStyle?: ViewStyle;
  iconSize?: number;
  eventId?: EventIdType; // push this event to firebase tracking when onPress is called
  eventParams?: EventParams; // more data of the event
}

// Render a floating action button like the ones seen on Android
// if label is set, label will below of the icon
export default function FAB(props: FABPropTypes) {
  const {
    icon,
    onPress,
    color,
    style,
    visible,
    label,
    labelStyle,
    iconSize,
    eventId,
    eventParams,
  } = props;

  function onPressCallback() {
    onPress();
    if (eventId) {
      Firebase.track(eventId, eventParams);
    }
  }

  return label ? (
    <TouchableComponent onPress={onPressCallback}>
      <View style={[styles.floating, style]}>
        <IconComponent size={iconSize!} name={icon} color={color} />
        <Text bold="bold" style={[styles.label, labelStyle]} fontSize="tiny">
          {label}
        </Text>
      </View>
    </TouchableComponent>
  ) : (
    <RFAB
      icon={icon}
      onPress={onPressCallback}
      color={color}
      visible={visible}
      style={style}
      small
      label={label}
    />
  );
}
