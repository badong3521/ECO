import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './style.css';
import UserApi, { UpdatePasswordParamsType } from '../../services/api/user';
import Form from '../../components/Form';
import Text from '../../components/Text';
import DismissibleKeyboard from '../../components/DismissibleKeyboard';
import {
  PasswordValidation,
  RetypePasswordValidation,
} from '../../components/Form/validators/password';

interface ChangePasswordScreenProps {
  navigation: any;
}

const userApi = new UserApi();
// This screen is used to update password.
export default function ChangePasswordScreen(props: ChangePasswordScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [apiErrors, setApiErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const { register, errors, setValue, handleSubmit, watch } = useForm<
    UpdatePasswordParamsType
  >();
  const password = watch('password');

  async function onChangePasswordPress(params: UpdatePasswordParamsType) {
    setApiErrors(undefined);
    setLoading(true);
    const res = await userApi.updatePassword(params);
    if (res.status !== 'success') {
      setApiErrors(res.errors);
    }
    setLoading(false);
  }

  return (
    <DismissibleKeyboard>
      <View style={styles.container}>
        <Text style={styles.description} fontSize="small">
          {i18n.t('features.changePasswordScreen.description')}
        </Text>
        <Form
          style={styles.form}
          register={register}
          errors={errors}
          setValue={setValue}
        >
          <Input
            name="currentPassword"
            label={i18n.t('features.changePasswordScreen.oldPassword')}
            returnKeyType="next"
            secureTextEntry
            autoFocus
            rules={PasswordValidation}
          />

          <Input
            name="password"
            label={i18n.t('features.changePasswordScreen.newPassword')}
            returnKeyType="next"
            secureTextEntry
            rules={PasswordValidation}
          />

          <Input
            name="passwordConfirmation"
            label={i18n.t('features.changePasswordScreen.retypeNewPassword')}
            returnKeyType="done"
            secureTextEntry
            rules={RetypePasswordValidation(password)}
            onSubmitEditing={handleSubmit(onChangePasswordPress)}
          />
        </Form>
        <Text fontSize="small" style={styles.errorMessage}>
          {apiErrors || ''}
        </Text>
        <Button
          type="primary"
          title={i18n.t('actions.ok')}
          onPress={handleSubmit(onChangePasswordPress)}
          style={styles.okButton}
          showSuccessAnimation={!apiErrors}
          uppercase={false}
          loading={loading}
          onSuccessAnimationFinish={() => goBack(navigation)}
        />
      </View>
    </DismissibleKeyboard>
  );
}

function goBack(navigation: any) {
  navigation.goBack();
}
