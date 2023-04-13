import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Text from '../../../../components/Text';
import OTPInput from '../../../../components/OTPInput';
import Button from '../../../../components/Button';
import OTPResendTimeoutText from '../../../Authentication/components/VerificationScreen/components/OTPResendTimeoutText';
import UseOtpTokenApi from '../../../../services/api/user_otp_token';

import styles from './styles.css';

interface StepOtpProps {
  isFocused: boolean;
  phoneNumber?: string;
  onPressContinue: (params?: any, phoneNumberVerified?: string) => void;
}

const OTP_LENGTH = 6;
const OTP_RESEND_TIMEOUT = 60; // seconds

export default function StepOtp(props: StepOtpProps) {
  const { isFocused, phoneNumber, onPressContinue } = props;
  const i18n = useTranslation();
  const userOtpTokenApi = new UseOtpTokenApi();
  const [otpCode, setOtpCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>();
  const [apiErrors, setApiErrors] = useState<string>();

  function onChangeOtpCode(code: string) {
    setOtpCode(code);
    setApiErrors(undefined);
  }

  async function onVerificationPress() {
    if (!phoneNumber) return;

    setLoading(true);
    const response = await userOtpTokenApi.verify(phoneNumber, otpCode);
    setLoading(false);
    if (response.status === 'success') {
      onPressContinue(undefined, phoneNumber);
    } else {
      setApiErrors(i18n.t('errors.otp_code.invalid'));
    }
  }

  async function resendOtp(): Promise<boolean> {
    if (!phoneNumber) return false;

    await userOtpTokenApi.send(phoneNumber);
    return true;
  }

  // call the verify button when the OTP code is finished typing
  useEffect(() => {
    if (otpCode && otpCode.length === OTP_LENGTH) {
      onVerificationPress();
    }
  }, [otpCode]);

  return (
    <>
      {isFocused && (
        <View style={styles.container}>
          <Text fontSize="small" style={styles.description}>
            {i18n.t('features.vaccineRegistrationScreen.stepOtp.description', {
              phoneNumber,
            })}
          </Text>
          <OTPInput
            value={otpCode}
            length={OTP_LENGTH}
            onChangeText={onChangeOtpCode}
            error={!!apiErrors}
          />
          <Text fontSize="small" style={styles.errorMessage}>
            {apiErrors || ''}
          </Text>
          <Button
            type="primary"
            title={i18n.t('actions.verify')}
            onPress={() => undefined}
            style={styles.verifyButton}
            uppercase={false}
            loading={loading}
          />
          <OTPResendTimeoutText
            timeout={OTP_RESEND_TIMEOUT}
            onResend={resendOtp}
          />
        </View>
      )}
    </>
  );
}
