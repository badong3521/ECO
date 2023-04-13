import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import styles from './style.css';
import Text from '../../../../components/Text';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import UserApi, {
  ResetPasswordParamsType,
} from '../../../../services/api/user';
import { useUserState } from '../../../User/reducers';
import {
  PasswordValidation,
  RetypePasswordValidation,
} from '../../../../components/Form/validators/password';

interface ResetPasswordScreenProps {
  navigation: any;
}
const userApi = new UserApi();

// This screen allows the user to set new password after requested forgot password.
export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [apiErrors, setApiErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const { register, errors, setValue, handleSubmit, watch } = useForm<
    ResetPasswordParamsType
  >();
  const password = watch('password');
  const [userState] = useUserState();

  async function onRequestResetPasswordPress(params: ResetPasswordParamsType) {
    setLoading(true);
    const res = await userApi.resetPassword({
      ...params,
      resetPasswordToken: userState.user!.resetPasswordToken!,
    });
    setLoading(false);
    if (res.status === 'success') {
      navigation.navigate('App');
    } else {
      setApiErrors(res.errors);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description} fontSize="small">
        {i18n.t('features.resetPassword.description')}
      </Text>
      <Form
        style={styles.form}
        register={register}
        errors={errors}
        setValue={setValue}
      >
        <Input
          name="password"
          label={i18n.t('features.resetPassword.newPassword')}
          returnKeyType="next"
          secureTextEntry
          autoFocus
          rules={PasswordValidation}
        />

        <Input
          name="passwordConfirmation"
          label={i18n.t('features.resetPassword.retypeNewPassword')}
          returnKeyType="done"
          secureTextEntry
          rules={RetypePasswordValidation(password)}
          onSubmitEditing={handleSubmit(onRequestResetPasswordPress)}
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
  );
}
