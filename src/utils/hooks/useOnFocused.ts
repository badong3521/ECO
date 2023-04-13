import { useEffect } from 'react';

// handle when the screen is focused
export default function useOnFocused(navigation: any, onFocus: () => void) {
  useEffect(() => {
    onFocus(); // call for the first time
    const willFocusListener = navigation.addListener('willFocus', () => {
      onFocus();
    });

    return function cleanup() {
      willFocusListener.remove();
    };
  }, [navigation]);
}
