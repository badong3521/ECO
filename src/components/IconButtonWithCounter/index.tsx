import React, { ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles, { badgeSize } from './style.css';
import { applicationColors } from '../../../style.css';
import Text from '../Text';

interface PropTypes {
  onPress: () => void;
  count?: number;
  badgeColor?: string;
  iconComponent: ReactNode;
  borderWidth?: number;
}

export default function IconButtonWithCounter(props: PropTypes) {
  const {
    onPress,
    count,
    iconComponent,
    badgeColor = applicationColors.semantic.warning.shade500,
    borderWidth = 0,
  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        {iconComponent}
        {count !== undefined && count > 0 && (
          <View
            style={[
              styles.badgeContainer,
              {
                width: badgeSize + borderWidth * 2,
                height: badgeSize + borderWidth * 2,
                right: 8 - borderWidth,
              },
            ]}
          >
            <View style={[styles.badge, { backgroundColor: badgeColor }]}>
              <Text
                fontSize="tiny"
                style={styles.count}
                allowFontScaling={false}
                bold="bold"
              >
                {count.toString(10)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
