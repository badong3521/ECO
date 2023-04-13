import { createStackNavigator } from 'react-navigation-stack';
import config from '../../config';
import SignUpScreen from '../../features/Authentication/components/SignUpScreen';
import VerificationScreen from '../../features/Authentication/components/VerificationScreen';
import AddPhoneNumberScreen from '../../features/Authentication/components/AddPhoneNumberScreen';
import { lightNavigationOptions } from '../../config/navigation';
import i18n from '../../i18n';
import SignInScreen from '../../features/Authentication/components/SignInScreen';
import ForgotPasswordScreen from '../../features/Authentication/components/ForgotPasswordScreen';
import ResetPasswordScreen from '../../features/Authentication/components/ResetPasswordScreen';
import AppleSignInScreen from '../../features/Authentication/components/AppleSignInScreen';

export default createStackNavigator(
  {
    SignUp: {
      screen: SignUpScreen,
      params: {
        eventId: 'authentication_started',
      },
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Verification: {
      screen: VerificationScreen,
      params: {
        eventId: 'otp_started',
        eventScreenName: 'OTPVerificationScreen',
      },
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.verificationScreen'),
      }),
    },
    AddPhoneNumber: {
      screen: AddPhoneNumberScreen,
      params: {
        eventScreenName: 'AddPhoneNumberScreen',
      },
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.addPhoneNumberScreen'),
      }),
    },
    SignIn: {
      screen: SignInScreen,
      params: {
        eventId: 'sign_in_started',
        eventScreenName: 'SignInScreen',
      },
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerLeft: () => null,
        headerTitle: i18n.t('headers.signInScreen'),
      }),
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      params: {
        eventScreenName: 'ForgotPasswordScreen',
      },
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.forgotPasswordScreen'),
      }),
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      params: {
        eventScreenName: 'ResetPasswordScreen',
      },
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.resetPasswordScreen'),
      }),
    },
    AppleSignIn: {
      screen: AppleSignInScreen,
      params: {
        eventScreenName: 'AppleSignInScreen',
      },
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
  },
  {
    defaultNavigationOptions: config.navigationConfig,
  },
);
