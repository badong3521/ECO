import React, { useEffect, useState } from 'react';
import { LayoutAnimation, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import UserApi, {
  SignUpParamsType,
  ThirdPartyProvider,
} from '../../../../services/api/user';
import SignUpForm from './components/SignUpForm';
import useStatusBar from '../../../../utils/hooks/useStatusBar';
import Onboarding from './components/Onboarding';
import useKeyboard from '../../../../utils/hooks/useKeyboard';
import useBackButton from '../../../../utils/hooks/useBackButton';
import { ApiSuccessType } from '../../../../services/api/types/api';
import { UserType } from '../../../User/types';

interface SignUpScreenProps {
  navigation: any;
}

const userApi = new UserApi();

// This screen has the onboarding at the top and the signup form at the bottom
export default function SignUpScreen(props: SignUpScreenProps) {
  const i18n = useTranslation();
  const { navigation } = props;
  const [expanded, setExpand] = useState<boolean>(false);
  const keyboardVisible = useKeyboard();
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  function onSignInPress() {
    navigation.navigate('SignIn');
  }

  function onFormPress() {
    LayoutAnimation.configureNext(CUSTOM_ANIMATE_SPRING);
    setExpand(true);
  }

  async function onSignUpPress(params: SignUpParamsType) {
    setLoading(true);
    const res = await userApi.signUp(params);
    setLoading(false);
    if (res.status === 'success') {
      navigation.navigate('Verification');
      setErrors(undefined);
    } else {
      setErrors(res.errors);
    }
  }

  async function signInWithFacebook() {
    // we need to log out the current facebook account in this app to make sure the user can confirm her/his account when the user login again.
    // Otherwise, for the next time, user will go to the app immediately without facebook popup confirm.
    await LoginManager.logOut();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function(response) {
        if (!response.isCancelled) {
          const token = await AccessToken.getCurrentAccessToken();
          const result = await userApi.signInWithThirdParties({
            provider: 'facebook',
            token: token!.accessToken.toString(),
          });
          if (result.status === 'success') {
            onSignUpWithThirdPartySuccess(navigation, result);
          }
        }
      },
    );
  }

  async function signInWithGoogle() {
    GoogleSignin.configure();
    setErrors(undefined);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      const res = await userApi.signInWithThirdParties({
        provider: 'google_oauth2',
        token: token.accessToken.toString(),
      });
      if (res.status === 'success') {
        onSignUpWithThirdPartySuccess(navigation, res);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setErrors(i18n.t('googleSignin.cancelled'));
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setErrors(i18n.t('googleSignin.inProgress'));
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setErrors(i18n.t('googleSignIn.playServicesUnavailable'));
      } else {
        setErrors(i18n.t('googleSignin.failed'));
      }
    }
  }

  function signInWithApple() {
    const platform = Platform.OS;
    switch (platform) {
      case 'ios':
        signInWithAppleIOS();
        break;
      case 'android':
      default:
        signInWithAppleWebView();
        break;
    }
  }

  async function signInWithAppleIOS() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });
    const res = await userApi.signInWithThirdParties({
      provider: 'apple',
      token: appleAuthRequestResponse.authorizationCode!,
    });
    if (res.status === 'success') {
      onSignUpWithThirdPartySuccess(navigation, res);
    }
  }

  // android doesn't have the apple service,
  // so we need to let android user login by apple id via webview
  function signInWithAppleWebView() {
    navigation.navigate('AppleSignIn');
  }

  function onSignInThirdPartyPress(provider: ThirdPartyProvider) {
    if (provider === 'apple') {
      signInWithApple();
    } else if (provider === 'facebook') {
      signInWithFacebook();
    } else if (provider === 'google_oauth2') {
      signInWithGoogle();
    }
  }

  useStatusBar('dark-content');

  useBackButton(() => {
    if (expanded) {
      setExpand(false);
      return true;
    }
    return false;
  });

  // need to call configureNext before change the value that will animate the height of layout
  useEffect(() => {
    LayoutAnimation.configureNext(CUSTOM_ANIMATE_SPRING);
    setExpand(keyboardVisible);
  }, [keyboardVisible]);

  return (
    <LinearGradient
      colors={['#D9EFFF', '#EDFFF4', '#EDFFF4']}
      start={{ x: 0, y: 0.4 }}
      end={{ x: 0, y: 0 }}
      angle={45}
      style={styles.container}
    >
      <Onboarding />
      <SignUpForm
        loading={loading}
        onSignInPress={onSignInPress}
        onSignUpPress={onSignUpPress}
        expanded={expanded}
        errorMessage={errors}
        onSignInThirdParty={onSignInThirdPartyPress}
        onFormPress={onFormPress}
      />
    </LinearGradient>
  );
}

function onSignUpWithThirdPartySuccess(
  navigation: any,
  result: ApiSuccessType<UserType>,
) {
  if (result.result.data.status === 'active') {
    navigation.navigate('App');
  } else {
    navigation.navigate('AddPhoneNumber');
  }
}

// set custom spring animation for expanding the signUp section
export const CUSTOM_ANIMATE_SPRING = {
  duration: 400,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 1,
  },
};
