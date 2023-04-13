import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../../../../../components/Text';
import useInterval from '../../../../../../utils/hooks/useInterval';

interface OTPTimeoutTextProps {
  timeout: number; // in seconds
  onResend: () => Promise<boolean>;
}

// This component is used for showing the remain seconds that OTP can be resent
export default function OTPResendTimeoutText(props: OTPTimeoutTextProps) {
  const { timeout, onResend } = props;
  const i18n = useTranslation();
  const [remainTimoutSeconds, setRemainTimeoutSeconds] = useState<number>(
    timeout,
  );
  const canResend = remainTimoutSeconds === 0;

  // after click resend, need to wait for process done to continue count the time
  async function onPress() {
    if (canResend) {
      const resent = await onResend();
      if (resent) {
        setRemainTimeoutSeconds(timeout);
      }
    }
  }

  useInterval({
    callback: () => {
      if (!canResend) setRemainTimeoutSeconds(remainTimoutSeconds - 1);
    },
    delay: 1000,
  });

  return (
    <Text
      fontSize="small"
      style={canResend ? styles.resendOtp : styles.resendOtpDisable}
      onPress={onPress}
    >
      {i18n.t('features.verification.resendOtp', {
        time: canResend ? '' : `(${remainTimoutSeconds})`,
      })}
    </Text>
  );
}
