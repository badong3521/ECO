import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Polygon, Svg } from 'react-native-svg';
import { Portal } from 'react-native-paper';
import styles from './style.css';
import TouchableComponent from '../TouchableComponent';
import { applicationColors, applicationDimensions } from '../../../style.css';
import Text from '../Text';
import Icon from '../Icon';

interface MessageOverlayProps {
  visible: boolean;
  message: string;
  onPress: () => void;
  onBlur: () => void;
  messageContainerStyle: ViewStyle;
}

const SQUARE_SIDE = 10;
const BOX_WIDTH = SQUARE_SIDE * Math.sqrt(2);
const BOX_HEIGHT = (SQUARE_SIDE * Math.sqrt(2)) / 2;
const TRIANGLE_SVG = `0,${BOX_HEIGHT} ${BOX_HEIGHT},0 ${BOX_WIDTH},${BOX_HEIGHT}`;

// put an overlay on current screen and display a message
export default function MessageOverlay(props: MessageOverlayProps) {
  const { visible, message, onPress, onBlur, messageContainerStyle } = props;
  return (
    <Portal>
      {visible && (
        <>
          <View style={styles.warningMessageBackground} onTouchStart={onBlur} />
          <TouchableComponent onPress={onPress} useForeground>
            <View style={messageContainerStyle}>
              <Svg style={styles.svg} height={BOX_HEIGHT} width={BOX_WIDTH}>
                <Polygon
                  points={TRIANGLE_SVG}
                  fill={applicationColors.primary.white}
                />
              </Svg>
              <View style={styles.warningMessage}>
                <View style={styles.warningMessageText}>
                  <Text>{message}</Text>
                </View>
                <View style={styles.warningMessageAction}>
                  <Icon
                    size={applicationDimensions.iconSize}
                    name="chevron-right"
                    iconPack="material"
                    color={applicationColors.primary.shade900}
                  />
                </View>
              </View>
            </View>
          </TouchableComponent>
        </>
      )}
    </Portal>
  );
}
