import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import IconComponent, { IconPackType } from '../Icon';
import styles from './style.css';
import { applicationColors, applicationDimensions } from '../../../style.css';
import TouchableComponent from '../TouchableComponent';
import Firebase, { EventIdType, EventParams } from '../../services/firebase';

export type IconButtonTypes = 'clear' | 'button' | 'square' | 'circle';
export interface IconButtonProps {
  onPress?: () => void;
  iconName?: string;
  icon?: React.ReactNode;
  iconSize?: number;
  iconColor?: string | any;
  padding?: number;
  buttonBackgroundColor?: string;
  type?: IconButtonTypes;
  iconPack?: IconPackType;
  eventId?: EventIdType; // push this event to firebase tracking when onPress is called
  eventParams?: EventParams; // more data of the event
  style?: ViewStyle;
}

// Use this component for clickable icon
export default function IconButton(props: IconButtonProps) {
  const {
    onPress,
    iconColor = applicationColors.primary.shade900,
    iconName,
    iconSize = applicationDimensions.iconSize,
    padding = applicationDimensions.defaultPadding,
    type = 'clear',
    buttonBackgroundColor = applicationColors.primary.white,
    iconPack,
    icon,
    eventId,
    eventParams,
    style,
  } = props;
  const buttonSize = iconSize! * 1.5;

  function onPressCallback() {
    if (onPress) {
      onPress();
      if (eventId) {
        Firebase.track(eventId, eventParams);
      }
    }
  }

  function renderIcon(): React.ReactNode {
    if (iconName) {
      return (
        <IconComponent
          size={iconSize!}
          name={iconName}
          color={iconColor}
          iconPack={iconPack}
        />
      );
    }
    return icon;
  }

  return (
    <>
      {type === 'square' || type === 'circle' ? (
        <TouchableComponent onPress={onPressCallback} useForeground>
          <View
            style={[
              styles.button,
              styles[type],
              {
                width: iconSize! * 2,
                height: iconSize! * 2,
                backgroundColor: buttonBackgroundColor,
              },
              style,
            ]}
          >
            {renderIcon()}
          </View>
        </TouchableComponent>
      ) : (
        <TouchableOpacity
          style={{ padding }}
          onPress={onPressCallback}
          activeOpacity={0.5}
        >
          {type === 'clear' && renderIcon()}
          {type === 'button' && (
            <View
              style={[
                styles.button,
                {
                  height: buttonSize,
                  width: buttonSize,
                  backgroundColor: buttonBackgroundColor,
                },
                style,
              ]}
            >
              {renderIcon()}
            </View>
          )}
        </TouchableOpacity>
      )}
    </>
  );
}
