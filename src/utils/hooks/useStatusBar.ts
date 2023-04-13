import { useContext, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContext } from 'react-navigation';

type StatusBarType = 'light-content' | 'dark-content';
interface StatusBarBoundary {
  lightBoundary?: number;
  darkBoundary?: number;
}

export default function useStatusBar(type: StatusBarType) {
  const navigation = useContext(NavigationContext);
  useEffect(() => {
    // for first render
    setStatusBarType(type);
    const willFocusListener = navigation.addListener('willFocus', () => {
      setStatusBarType(type);
    });

    return function cleanup() {
      willFocusListener.remove();
    };
  }, []);
}

// use this function to update statusBar on `onScroll` event of ScrollView or Flatlist...
// lightBoundary: from this position, statusBar will be light
// darkBoundary: from this position, statusBar will be dark
export function updateStatusBarWhenScrolling(
  event: any,
  statusBarBoundary: StatusBarBoundary,
) {
  const contentOffsetY = event.nativeEvent.contentOffset.y;
  const { lightBoundary, darkBoundary } = statusBarBoundary;
  if (lightBoundary) {
    if (contentOffsetY > lightBoundary) {
      setStatusBarType('light-content');
    } else {
      setStatusBarType('dark-content');
    }
  }
  if (darkBoundary) {
    if (contentOffsetY > darkBoundary) {
      setStatusBarType('dark-content');
    } else {
      setStatusBarType('light-content');
    }
  }
}

function setStatusBarType(type: StatusBarType) {
  StatusBar.setBarStyle(type);
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
  }
}

export function setStatusBarBackground(color: string) {
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(color);
  }
}
