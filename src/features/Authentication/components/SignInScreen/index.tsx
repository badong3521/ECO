import { Keyboard, View } from 'react-native';
import React, { useState } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { useForm } from 'react-hook-form';
import styles from './style.css';
import Text from '../../../../components/Text';
import Form from '../../../../components/Form';
import UserApi, {
  SignInParamsType,
  ThirdPartyProvider,
} from '../../../../services/api/user';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import DismissibleKeyboard from '../../../../components/DismissibleKeyboard';
import PhoneNumberValidation from '../../../../components/Form/validators/phone_number';
import { PasswordValidation } from '../../../../components/Form/validators/password';
import DialogManager from '../../../../components/Dialog/manager';
import { ErrorType } from '../../../../services/api/types/api';

const userApi = new UserApi();

interface SignInScreenProps {
  navigation: any;
}

// This screen allows the user to login by phone number and password
export default function SignInScreen(props: SignInScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [apiErrors, setApiErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const { register, errors, setValue, handleSubmit } = useForm<
    SignInParamsType
  >();

  async function onSignInPress(params: SignInParamsType) {
    setApiErrors(undefined);
    setLoading(true);
    const res = await userApi.signIn(params);
    setLoading(false);
    if (res.status === 'success') {
      if (res.result.data.user.status === 'inactive') {
        navigation.navigate('Verification');
      } else {
        navigation.navigate('App');
      }
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
        <Text
          style={styles.description}
          fontSize="small"
          onPress={() => navigation.goBack()}
        >
          {i18n.t('features.signIn.description')}
          <Text fontSize="small" bold="bold" style={styles.signUp}>
            {i18n.t('features.signIn.signUp')}
          </Text>
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
            returnKeyType="next"
            rules={PhoneNumberValidation}
            keyboardType="phone-pad"
            autoFocus
          />
          <Input
            name="password"
            label={i18n.t('features.signUp.password')}
            returnKeyType="done"
            secureTextEntry
            rules={PasswordValidation}
            onSubmitEditing={handleSubmit(onSignInPress)}
          />
        </Form>
        <Text fontSize="small" style={styles.errorMessage}>
          {apiErrors || ''}
        </Text>
        <Button
          type="primary"
          title={i18n.t('features.signIn.signIn')}
          onPress={handleSubmit(onSignInPress)}
          style={styles.signInButton}
          uppercase={false}
          loading={loading}
        />
        <Text
          fontSize="small"
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          {i18n.t('features.signIn.forgotPassword')}
        </Text>
      </View>
    </DismissibleKeyboard>
  );
}

export function showWarningMessage(
  navigation: any,
  i18n: UseTranslationResponse,
  provider: ThirdPartyProvider,
) {
  DialogManager.showMessageDialog({
    confirmTitle: i18n.t('actions.goBack'),
    title: i18n.t('errors.user.provider.error.title'),
    message: i18n.t('errors.user.provider.error.message', {
      provider: i18n.t(`features.addPhoneNumber.provider.${provider}`),
    }),
    onConfirmPress: () => {
      navigation.replace('SignUp');
    },
  });
}

export function getProviderErrorMessage(error: ErrorType | ErrorType[]) {
  const errorMessage = error
    .toString()
    .match(/errors\.user\..+_provider\.not_allowed/g);
  if (errorMessage !== null && errorMessage.length > 0) {
    return errorMessage[0].split('.')[2].split('_provider')[0];
  }
  return undefined;
}
