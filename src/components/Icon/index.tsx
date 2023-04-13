import React from 'react';
import { View, ViewStyle, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEvil from 'react-native-vector-icons/EvilIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

export type IconPackType = 'material' | 'evil' | 'ant' | 'feather';

export interface IconProps {
  size: number;
  name: string;
  color?: string | any;
  iconPack?: IconPackType;
  style?: ViewStyle;
}

const FeatherIcon = Animated.createAnimatedComponent(IconFeather);

// Render a material icon
export default function IconComponent(props: IconProps) {
  const { name, size, color, iconPack, style } = props;
  let iconColor;
  if (color === 'default') {
    iconColor = 'inherited';
  } else if (color === 'white') {
    iconColor = '#eee';
  } else if (color !== undefined) {
    iconColor = color;
  } else {
    iconColor = '#FFF';
  }

  return (
    <View pointerEvents="none" style={[{ height: size, width: size }, style]}>
      {iconPack === 'material' && (
        <Icon
          name={name}
          size={size}
          color={iconColor}
          style={{ textAlignVertical: 'center' }}
        />
      )}
      {iconPack === 'evil' && (
        <IconEvil
          name={name}
          size={size}
          color={iconColor}
          style={{ textAlignVertical: 'center', height: '100%' }}
        />
      )}
      {iconPack === 'ant' && (
        <IconAnt
          name={name}
          size={size}
          color={iconColor}
          style={{ textAlignVertical: 'center', height: '100%' }}
        />
      )}
      {iconPack === 'feather' && (
        <FeatherIcon
          // @ts-ignore
          name={name}
          size={size}
          style={{
            textAlignVertical: 'center',
            height: '100%',
            color: iconColor,
          }}
        />
      )}
    </View>
  );
}

IconComponent.defaultProps = {
  iconPack: 'material',
};
