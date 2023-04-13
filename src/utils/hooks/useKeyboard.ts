import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

// handle when the keyboard is hidden or shown
export default function useKeyboard(): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setVisible(true);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setVisible(false);
    });
    return function cleanup() {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);
  return visible;
}
