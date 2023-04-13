import { useEffect } from 'react';
import { BackHandler } from 'react-native';

// handle when the hard back button is pressed
export default function useBackButton(handler: () => boolean) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
}
