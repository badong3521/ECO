import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import OTPInput from '../../../../components/OTPInput';
import styles from './style.css';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import UserApi from '../../../../services/api/user';
import OTPResendTimeoutText from './components/OTPResendTimeoutText';
import { useUserState } from '../../../User/reducers';

const OTP_LENGTH = 6;
const OTP_RESEND_TIMEOUT = 60; // seconds
const userApi = new UserApi();

interface VerificationScreenProps {
  navigation: any;
}

// This screen is used to verify phone number by OTP code
// This screen can be used when sign up new account and request forgot password
export default function VerificationScreen(props: VerificationScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [apiErrors, setApiErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [otpCode, setOtpCode] = useState<string>('');
  const [userState] = useUserState();
  const isForgotPasswordRequest = navigation.state?.params?.phoneNumber;

  async function verifyOTP() {
    setLoading(true);
    const res = await userApi.verifyOTP(otpCode);
    setLoading(false);
    if (res.status === 'success') {
      navigation.navigate('App');
    } else {
      setApiErrors(res.errors);
    }
  }

  async function verifyOtpForRequestPassword() {
    setLoading(true);
    const { userId } = navigation.state.params;
    const res = await userApi.signInOtp(userId, otpCode);
    setLoading(false);
    if (res.status === 'success') {
      navigation.navigate('ResetPassword');
    } else {
      setApiErrors(res.errors);
    }
  }
  function onVerificationPress() {
    if (isForgotPasswordRequest) {
      verifyOtpForRequestPassword();
    } else {
      verifyOTP();
    }
  }

  async function onResendOTP(): Promise<boolean> {
    let response;
    if (isForgotPasswordRequest) {
      response = await userApi.requestForgotPassword(
        navigation.state.params.phoneNumber,
      );
    } else {
      response = await userApi.activateUser({
        phoneNumber: userState.user?.phoneNumber!,
        isResident: userState.user?.isResident,
      });
    }
    if (response.status === 'success') {
      return true;
    }
    setApiErrors(response.errors);
    return false;
  }

  function onChangeOtpCode(code: string) {
    setApiErrors(undefined);
    setOtpCode(code);
  }

  // call the verify button when the OTP code is finished typing
  useEffect(() => {
    if (otpCode && otpCode.length === OTP_LENGTH) {
      onVerificationPress();
    }
  }, [otpCode]);

  return (
    <View style={styles.container}>
      <Text fontSize="small" style={styles.description}>
        {i18n.t('features.verification.description')}
      </Text>
      <OTPInput
        value={otpCode}
        length={OTP_LENGTH}
        onChangeText={onChangeOtpCode}
        error={apiErrors}
      />
      <Text fontSize="small" style={styles.errorMessage}>
        {apiErrors || ''}
      </Text>
      <Button
        type="primary"
        title={i18n.t('actions.verify')}
        onPress={onVerificationPress}
        style={styles.verifyButton}
        uppercase={false}
        loading={loading}
      />
      <OTPResendTimeoutText
        timeout={OTP_RESEND_TIMEOUT}
        onResend={onResendOTP}
      />
    </View>
  );
}
