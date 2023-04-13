import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import styles from './style.css';
import Text from '../../../../components/Text';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import UserApi, {
  ForgotPasswordParamsType,
  ThirdPartyProvider,
} from '../../../../services/api/user';
import DismissibleKeyboard from '../../../../components/DismissibleKeyboard';
import PhoneNumberValidation from '../../../../components/Form/validators/phone_number';
import { getProviderErrorMessage, showWarningMessage } from '../SignInScreen';

interface ForgotPasswordScreenProps {
  navigation: any;
}
const userApi = new UserApi();

// This screen allows the user to input their phone number.
// If they continue it will send a request to the API to send an OTP and redirect the user.
export default function ForgotPasswordScreen(props: ForgotPasswordScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [apiErrors, setApiErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const { register, errors, setValue, handleSubmit } = useForm<
    ForgotPasswordParamsType
  >();

  async function onRequestResetPasswordPress(params: ForgotPasswordParamsType) {
    setLoading(true);
    const res = await userApi.requestForgotPassword(params.phoneNumber);
    setLoading(false);
    if (res.status === 'success') {
      const { id } = res.result.data.user;
      navigation.navigate('Verification', {
        phoneNumber: params.phoneNumber,
        userId: id,
      });
    } else {
      const provider = getProviderErrorMessage(res.errors);
      if (provider !== undefined) {
        // show custom dialog to notice user can not request forgot password when signed in by third-party
        Keyboard.dismiss();
        showWarningMessage(navigation, i18n, provider as ThirdPartyProvider);
      } else {
        setApiErrors(res.errors);
      }
    }
  }

  return (
    <DismissibleKeyboard>
      <View style={styles.container}>
        <Text style={styles.description} fontSize="small">
          {i18n.t('features.forgotPassword.description')}
        </Text>
        <Form
          style={styles.form}
          register={register}
          errors={errors}
          setValue={setValue}
        >
          <Input
            name="phoneNumber"
            label={i18n.t('features.signUp.phoneNumber')}
            returnKeyType="done"
            rules={PhoneNumberValidation}
            keyboardType="phone-pad"
            onSubmitEditing={handleSubmit(onRequestResetPasswordPress)}
            autoFocus
          />
        </Form>
        <Text fontSize="small" style={styles.errorMessage}>
          {apiErrors || ''}
        </Text>
        <Button
          type="primary"
          title={i18n.t('actions.ok')}
          onPress={handleSubmit(onRequestResetPasswordPress)}
          style={styles.okButton}
          uppercase={false}
          loading={loading}
        />
      </View>
    </DismissibleKeyboard>
  );
}
