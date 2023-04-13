import { View } from 'react-native';
import React from 'react';
import IconComponent from '../Icon';
import { applicationColors, applicationIcons } from '../../../style.css';
import styles from './style.css';
import TouchableComponent from '../TouchableComponent';

interface HeaderBackIconProps {
  color?: string;
  onPress?: () => void;
  type?: 'back' | 'close';
}

// Custom back icon for header
export default function HeaderBackIcon(props: HeaderBackIconProps) {
  const { color, onPress, type } = props;

  function renderBackButton() {
    return (
      <View style={styles.container}>
        <IconComponent
          size={24}
          name={type === 'back' ? applicationIcons.back : 'x'}
          color={color || applicationColors.primary.white}
          iconPack="feather"
        />
      </View>
    );
  }
  return onPress ? (
    <TouchableComponent onPress={onPress}>
      {renderBackButton()}
    </TouchableComponent>
  ) : (
    renderBackButton()
  );
}

HeaderBackIcon.defaultProps = {
  type: 'back',
};
