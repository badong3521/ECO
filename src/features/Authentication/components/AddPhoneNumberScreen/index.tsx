import React, { useEffect, useState } from 'react';
import { Linking, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Config from 'react-native-config';
import Text from '../../../../components/Text';
import styles from './style.css';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import UserApi, { ActiveUserParamsType } from '../../../../services/api/user';
import CheckBox from '../../../../components/CheckBox';
import DismissibleKeyboard from '../../../../components/DismissibleKeyboard';
import TextLink from '../../../../components/TextLink';
import { applicationColors } from '../../../../../style.css';
import { useUserState } from '../../../User/reducers';
import PhoneNumberValidation from '../../../../components/Form/validators/phone_number';
import RequiredValidation from '../../../../components/Form/validators';
import Firebase, { EventIdType } from '../../../../services/firebase';

interface AddPhoneNumberScreenProps {
  navigation: any;
}

const userApi = new UserApi();

// This screen is used to update phone number after signUp by third-parties.
export default function AddPhoneNumberScreen(props: AddPhoneNumberScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<any>();
  const [userState] = useUserState();
  const { register, errors, setValue, handleSubmit, watch } = useForm<
    ActiveUserParamsType
  >();

  async function onSignUpPress(params: ActiveUserParamsType) {
    setApiErrors(undefined);
    setLoading(true);
    const res = await userApi.activateUser(params);
    setLoading(false);
    if (res.status === 'success') {
      let eventId: EventIdType;
      switch (userState.user?.provider) {
        case 'facebook':
          eventId = 'sign_up_facebook_finished';
          break;
        case 'apple':
          eventId = 'sign_up_apple_finished';
          break;
        default:
          eventId = 'sign_up_google_finished';
          break;
      }
      if (eventId) {
        Firebase.track(eventId);
      }
      navigation.navigate('Verification');
      setApiErrors(undefined);
    } else {
      setApiErrors(res.errors);
    }
  }

  useEffect(() => {
    let eventId: EventIdType;
    switch (userState.user?.provider) {
      case 'facebook':
        eventId = 'sign_up_facebook_phone_number_started';
        break;
      case 'apple':
        eventId = 'sign_up_apple_phone_number_started';
        break;
      default:
        eventId = 'sign_up_google_phone_number_started';
        break;
    }
    if (eventId) {
      Firebase.track(eventId);
    }
  }, []);

  return (
    <DismissibleKeyboard>
      <View style={styles.container}>
        <Text fontSize="small" style={styles.description}>
          {i18n.t('features.addPhoneNumber.description', {
            provider: i18n.t(
              `features.addPhoneNumber.provider.${userState.user?.provider}`,
            ),
          })}
        </Text>
        <Form
          register={register}
          errors={errors}
          setValue={setValue}
          style={styles.form}
        >
          <Input
            name="phoneNumber"
            label={i18n.t('features.signUp.phoneNumber')}
            returnKeyType="next"
            rules={PhoneNumberValidation}
            keyboardType="phone-pad"
            autoFocus
          />

          <View style={styles.checkboxContainer} key="termOfServiceContainer">
            <CheckBox
              name="termsOfService"
              containerStyleIOS={styles.checkbox}
              rules={RequiredValidation}
              value={watch('termsOfService')}
            />
            <TextLink
              key="termsOfServiceLink"
              fontSize="small"
              linkColor={applicationColors.primary.shade900}
              onLinkPress={onViewTermsAndConditions}
            >
              {i18n.t('features.signUp.termsAndConditionsAgreement')}
            </TextLink>
          </View>
        </Form>

        <Text fontSize="small" style={styles.errorMessage}>
          {apiErrors || ''}
        </Text>
        <Button
          type="primary"
          title={i18n.t('features.addPhoneNumber.signUp')}
          onPress={handleSubmit(onSignUpPress)}
          style={styles.signUpButton}
          uppercase={false}
          loading={loading}
        />
      </View>
    </DismissibleKeyboard>
  );
}

function onViewTermsAndConditions() {
  Linking.openURL(`${Config.API_BASE_URL}/terms_and_conditions.pdf`);
}
