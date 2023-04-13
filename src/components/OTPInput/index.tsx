import {
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import styles from './style.css';
import Text from '../Text';
import { applicationDimensions } from '../../../style.css';
import Input from '../Input';
import useKeyboard from '../../utils/hooks/useKeyboard';

// inherit all props of Input
interface OTPInputProps {
  length: number;
  error?: boolean;
  value?: string;
  autoFocus?: boolean;
  onChangeText?: (value: string) => void;
}

// OTP code input
// This component can be used as an input in Form
export default function OTPInput(props: OTPInputProps) {
  const { length, value, error, onChangeText, autoFocus = true } = props;
  const width =
    Dimensions.get('screen').width / length -
    applicationDimensions.defaultPadding;
  const height = width * 1.5;
  const inputRef = React.useRef<TextInput>();
  const keyboardVisible = useKeyboard();
  const numberArray = Array(length).fill(0);

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!keyboardVisible) {
            inputRef?.current?.blur();
          }
          inputRef?.current?.focus();
        }}
      >
        <View style={styles.container}>
          {numberArray.map((_, index) => {
            return (
              <View
                key={index.toString()}
                style={[
                  error ? styles.errorContainer : styles.inputContainer,
                  {
                    width,
                    height,
                  },
                ]}
              >
                <Text style={styles.input}>{(value || '')[index]}</Text>
              </View>
            );
          })}
        </View>
      </TouchableWithoutFeedback>
      <Input
        inputRef={inputRef}
        keyboardType="numeric"
        maxLength={length}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        inputStyle={styles.hiddenInput}
      />
    </View>
  );
}
