import React from 'react';
import { ViewStyle, TouchableWithoutFeedback, View } from 'react-native';
import RadioButton from '../../../../components/RadioButton';
import Text from '../../../../components/Text';

interface Props {
  name: string;
  value: string;
  status: 'checked' | 'unchecked';
  tintColor: string;
  onPress: (value: string) => void;
  style: ViewStyle;
  label: string;
}

const COLOR_LINK = '#1990FF';

export default function ItemRadioButton(props: Props) {
  const { value, status, tintColor, onPress, style, label } = props;

  return (
    <TouchableWithoutFeedback onPress={() => onPress(value)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
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
        <Text>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

ItemRadioButton.defaultProps = {
  style: {},
  tintColor: COLOR_LINK,
  label: 'Label',
};
