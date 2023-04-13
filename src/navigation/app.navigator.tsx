import {
  createAppContainer,
  createSwitchNavigator,
  NavigationNavigator,
} from 'react-navigation';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from 'react-navigation-stack';
import React from 'react';
import { Dimensions } from 'react-native';
import AuthLoadingScreen from '../features/Authentication/components/AuthLoadingScreen';
import appRoutes from './routes';
import EcoIdOnboardingScreen from '../features/EcoId/components/EcoIdOnboardingScreen';
import {
  lightNavigationOptions,
  whiteNavigationOptions,
} from '../config/navigation';
import EcoIdFailedScreen from '../features/EcoId/components/EcoIdFailed';
import EcoIdSuccessfulScreen from '../features/EcoId/components/EcoIdSuccessful';
import EcoIdPaymentScreen from '../features/EcoId/components/EcoIdPayment';
import EcoBusPaymentScreen from '../features/Bus/components/EcoBusPayment';
import HeaderBackIcon from '../components/HeaderBackIcon';
import { applicationColors } from '../../style.css';
import HomeDirectoryOnboardingScreen from '../features/HomeDirectoryOnboardingScreen';
import LixiOnboardingScreen from '../features/Lixi/components/LixiOnboarding';
import GotALixiScreen from '../features/Lixi/components/GotALixi';
import RateAppScreen from '../features/RateAppScreen';
import EcoIdPromotionSuccessfulScreen from '../features/EcoId/components/EcoIdPromotionSuccessful';
import i18n from '../i18n';

// The reason for having our navigation flow like this is to leverage react-navigation
// for the authentication flow: https://reactnavigation.org/docs/en/auth-flow.html

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: {
        screen: AuthLoadingScreen,
        path: 'auth',
      },
      App: {
        screen: getMainRoutes(),
      },
      Auth: appRoutes.auth,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

function getMainRoutes(): NavigationNavigator<any, any> {
  return createStackNavigator(
    {
      Main: {
        screen: appRoutes.appBottomTabs,
        path: 'Main',
        navigationOptions: () => ({
          headerShown: false,
        }),
      },
      LixiOnboardingScreen: {
        screen: LixiOnboardingScreen,
        navigationOptions: () => {
          return {
            headerShown: false,
            headerMode: 'none',
            header: undefined,
          };
        },
      },
      GotALixiScreen: {
        screen: GotALixiScreen,
        navigationOptions: () => {
          return {
            headerShown: false,
            transitionSpec: {
              open: TransitionSpecs.ScaleFromCenterAndroidSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            cardStyleInterpolator: ({ current }) => {
              return {
                cardStyle: {
                  opacity: current.progress,
                },
                overlayStyle: {
                  opacity: current.progress,
                },
              };
            },
          };
        },
      },
      EcoIdFailedScreen: {
        screen: EcoIdFailedScreen,
        navigationOptions: () => {
          return {
            ...lightNavigationOptions,
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#DAF4FF',
              elevation: 0,
              shadowRadius: 0,
              shadowOffset: {
                height: 0,
              },
            },
          };
        },
      },
      RateAppScreen: {
        screen: RateAppScreen,
        navigationOptions: () => {
          return {
            headerShown: false,
          };
        },
      },
      EcoIdSuccessfulScreen: {
        screen: EcoIdSuccessfulScreen,
        navigationOptions: () => {
          return {
            headerShown: false,
          };
        },
      },
      EcoIdOnboardingScreen: {
        screen: EcoIdOnboardingScreen,
        navigationOptions: () => ({
          ...lightNavigationOptions,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#DAF4FF',
            elevation: 0,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
        }),
      },
      EcoIdPaymentScreen: {
        screen: EcoIdPaymentScreen,
        navigationOptions: ({ navigation }) => {
          const { params = {} } = navigation.state;
          return {
            ...lightNavigationOptions,
            headerTitle: i18n.t('headers.payment'),
            headerShown: true,
            headerLeft: () => (
              <HeaderBackIcon
                color={applicationColors.neutral.shade900}
                onPress={params.onBackPress}
              />
            ),
          };
        },
      },
      EcoBusPaymentScreen: {
        screen: EcoBusPaymentScreen,
        navigationOptions: ({ navigation }) => {
          const { params = {} } = navigation.state;
          return {
            ...whiteNavigationOptions,
            headerTitle: i18n.t('headers.ecoBusPaymentScreen'),
            headerShown: true,
            headerLeft: () => (
              <HeaderBackIcon
                color={applicationColors.neutral.shade900}
                onPress={params.onBackPress}
              />
            ),
          };
        },
      },
      EcoIdPromotionSuccessful: {
        screen: EcoIdPromotionSuccessfulScreen,
        navigationOptions: () => {
          return {
            headerShown: false,
          };
        },
      },
      HomeDirectoryOnboarding: {
        navigationOptions: () => {
          return {
            headerShown: false,
            gestureDirection: 'horizontal',
            gestureEnabled: true,
            gestureResponseDistance: {
              horizontal: Dimensions.get('screen').width,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          };
        },
        screen: HomeDirectoryOnboardingScreen,
      },
    },
    {
      initialRouteName: 'Main',
    },
  );
}
