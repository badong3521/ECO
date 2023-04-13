import React from 'react';
import { TransitionPresets } from 'react-navigation-stack';
import { NavigationScreenConfig } from 'react-navigation';
import { getStatusBarHeight } from 'utils/statusBar';
import HeaderBackIcon from '../components/HeaderBackIcon';
import {
  applicationColors,
  applicationFontFamily,
  navigationColors,
} from '../../style.css';
import Text from '../components/Text';
import BottomTabBar from '../components/BottomTabBar';

// Options for React Navigation
export default {
  // Set logo as header content
  headerTitle: '',
  headerBackTitle: ' ',
  headerTitleAlign: 'center' as const,
  headerMode: 'screen',
  // Set background color of app
  cardStyle: {
    backgroundColor: '#FFFFFF',
  },
  // Fixes a bug where header gets duplicate size when keyboard is dismissed
  // See: https://github.com/react-navigation/stack/issues/326
  safeAreaInsets: { top: getStatusBarHeight() },
  // Transition from right when navigating
  ...TransitionPresets.DefaultTransition,
  // Remove header shadow
  headerStyle: {
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 0,
    borderBottomWidth: 0,
    elevation: 0,
    fontFamily: applicationFontFamily,
  },
};

export const backNavigationOptions: NavigationScreenConfig<any, any> = {
  headerShown: true,
  headerBackImage: HeaderBackIcon,
  headerStyle: {
    backgroundColor: applicationColors.primary.shade900,
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: applicationColors.primary.white,
    fontFamily: applicationFontFamily,
  },
  headerBackTitle: ' ',
  headerTintColor: applicationColors.primary.white,
};

// use for light app bar
export const lightNavigationOptions: NavigationScreenConfig<any, any> = {
  headerShown: true,
  headerBackImage: () => (
    <HeaderBackIcon color={applicationColors.neutral.shade900} />
  ),
  headerStyle: {
    backgroundColor: applicationColors.secondary.background,
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: applicationColors.neutral.shade900,
    fontSize: 18,
    fontFamily: applicationFontFamily,
  },
  headerBackTitle: ' ',
  headerTintColor: applicationColors.primary.white,
};

// use for light app bar
export const whiteNavigationOptions: NavigationScreenConfig<any, any> = {
  headerShown: true,
  headerBackImage: () => (
    <HeaderBackIcon color={applicationColors.neutral.shade900} />
  ),
  headerStyle: {
    backgroundColor: applicationColors.primary.white,
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: applicationColors.neutral.shade900,
    fontSize: 18,
    fontFamily: applicationFontFamily,
  },
  headerBackTitle: ' ',
  headerTintColor: applicationColors.primary.white,
};

export const bottomTabNavigationOptions = (
  icon: string,
  title: string,
): NavigationScreenConfig<any, any> => ({
  tabBarIcon: (options: any) => {
    const { focused, tintColor } = options;
    return (
      <BottomTabBar
        focused={focused}
        icon={icon}
        tintColor={tintColor}
        title={title}
      />
    );
  },
  // @ts-ignore
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    const { callback } = navigation.state.routes[0].params;
    if (callback) {
      callback();
    }
    defaultHandler();
  },
  tabBarColor: navigationColors.landing,
  tabBarLabel: <Text> </Text>, // avoid missing the padding between tabBar and bottom on Android
});
