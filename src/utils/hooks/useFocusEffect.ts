import { useContext, useEffect } from 'react';
import { NavigationContext } from 'react-navigation';

// Allow you to call a function when a component is focused
export default function useFocusEffect(callback: () => void) {
  const navigation = useContext(NavigationContext);
  let listener: any;

  useEffect(() => {
    listener = navigation.addListener('didFocus', () => {
      callback();
    });

    return function cleanup() {
      listener.remove();
    };
  }, []);
}
