import { useEffect } from 'react';
import RNShake from 'react-native-shake';

// handle when the device is shaking
export default function useOnShaking(onShaking: () => void) {
  useEffect(() => {
    RNShake.addEventListener('ShakeEvent', onShaking);

    return function cleanup() {
      RNShake.removeEventListener('ShakeEvent');
    };
  }, []);
}
