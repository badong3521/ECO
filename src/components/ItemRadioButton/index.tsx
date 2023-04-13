import React from 'react';
import { ViewStyle, TouchableWithoutFeedback, View } from 'react-native';
import RadioButton from '../RadioButton';
import Text from '../Text';

interface Props {
  name?: string;
  value: string;
  status: 'checked' | 'unchecked';
  tintColor: string;
  onPress: (value: string) => void;
  style: ViewStyle;
  label?: string;
  containerStyle?: ViewStyle;
  children?: React.ReactNode;
}

const COLOR_LINK = '#1990FF';

export default function ItemRadioButton(props: Props) {
  const {
    value,
    status,
    tintColor,
    onPress,
    style,
    label,
    containerStyle,
    children,
  } = props;

  return (
    <TouchableWithoutFeedback onPress={() => onPress(value)}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
          containerStyle,
        ]}
      >
        <RadioButton
          value={value}
          status={status}
          tintColor={tintColor}
          onPress={() => onPress(value)}
          style={{
            ...{
              paddingLeft: 0,
            },
            ...style,
          }}
        />
        { label && <Text>{label}</Text> }
        { children }
      </View>
    </TouchableWithoutFeedback>
  );
}

ItemRadioButton.defaultProps = {
  style: {},
  tintColor: COLOR_LINK,
};
