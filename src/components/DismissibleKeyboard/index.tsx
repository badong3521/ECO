import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

interface DismissibleKeyboardProps {
  children: React.ReactElement;
}

// Use to wrap component that want to dismiss the keyboard when click outside
export default function DismissibleKeyboard(props: DismissibleKeyboardProps) {
  const { children } = props;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
