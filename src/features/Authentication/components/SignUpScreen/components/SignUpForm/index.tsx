import { Linking, View } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Config from 'react-native-config';
import styles from './style.css';
import Text from '../../../../../../components/Text';
import Form from '../../../../../../components/Form';
import Input from '../../../../../../components/Input';
import CheckBox from '../../../../../../components/CheckBox';
import IconButton from '../../../../../../components/IconButton';
import GoogleLogo from '../../../../../../assets/logos/google.svg';
import AppleLogo from '../../../../../../assets/logos/apple.svg';
import FacebookLogo from '../../../../../../assets/logos/facebook.svg';
import Button from '../../../../../../components/Button';
import {
  SignUpParamsType,
  ThirdPartyProvider,
} from '../../../../../../services/api/user';
import TextLink from '../../../../../../components/TextLink';
import { applicationColors } from '../../../../../../../style.css';
import LanguageToggle from '../../../../../../components/LanguageToggle';
import DismissibleKeyboard from '../../../../../../components/DismissibleKeyboard';
import RequiredValidation from '../../../../../../components/Form/validators';
import PhoneNumberValidation from '../../../../../../components/Form/validators/phone_number';
import { PasswordValidation } from '../../../../../../components/Form/validators/password';

interface SignUpFormProps {
  onSignInPress: () => void;
  expanded: boolean;
  onSignUpPress: (params: SignUpParamsType) => void;
  loading: boolean;
  errorMessage?: string;
  onSignInThirdParty: (provider: ThirdPartyProvider) => void;
  onFormPress?: () => void;
}

// The signup form contains sign up with third-parties buttons and signup with phone number form
export default function SignUpForm(props: SignUpFormProps) {
  const i18n = useTranslation();
  const {
    expanded,
    onSignInPress,
    onSignUpPress,
    loading,
    errorMessage,
    onSignInThirdParty,
    onFormPress,
  } = props;
  const { register, errors, setValue, handleSubmit, watch } = useForm<
    SignUpParamsType
  >();

  return (
    <DismissibleKeyboard>
      <View
        style={[
          styles.signUpSection,
          {
            height: expanded ? '100%' : undefined,
          },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.hiThere}>
            <Text bold="bold">{i18n.t('features.signUp.hiThere')}</Text>
            <View style={styles.signInRow}>
              <Text fontSize="small">
                {i18n.t('features.signUp.alreadyHaveAccount')}
              </Text>
              <Text
                fontSize="small"
                bold="bold"
                style={styles.signInButton}
                onPress={onSignInPress}
              >
                {i18n.t('features.signUp.signIn')}
              </Text>
            </View>
          </View>
          <LanguageToggle />
        </View>

        <Form register={register} errors={errors} setValue={setValue}>
          <View style={styles.row} key="row">
            <Input
              value={watch('firstName')}
              containerStyle={styles.input}
              name="firstName"
              label={i18n.t('features.signUp.firstName')}
              returnKeyType="next"
              errorMessage={errors.firstName?.message}
              rules={RequiredValidation}
              onPress={onFormPress}
            />
            <Input
              value={watch('lastName')}
              containerStyle={styles.inputLastName}
              name="lastName"
              label={i18n.t('features.signUp.lastName')}
              returnKeyType="next"
              rules={RequiredValidation}
              onPress={onFormPress}
            />
          </View>
          <Input
            value={watch('phoneNumber')}
            key="phoneNumber"
            name="phoneNumber"
            label={i18n.t('features.signUp.phoneNumber')}
            returnKeyType="next"
            rules={PhoneNumberValidation}
            keyboardType="phone-pad"
            onPress={onFormPress}
          />
          <Input
            value={watch('password')}
            name="password"
            label={i18n.t('features.signUp.password')}
            returnKeyType="done"
            secureTextEntry
            rules={PasswordValidation}
            onPress={onFormPress}
          />
          <View style={styles.checkboxContainer} key="checkbox">
            <CheckBox
              value={watch('termsOfService')}
              name="termsOfService"
              containerStyleIOS={styles.checkbox}
              rules={RequiredValidation}
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

        <View style={styles.orSignInWidthContainer}>
          <Text fontSize="small">
            {i18n.t('features.signUp.orSignInWidth')}
          </Text>
          {errorMessage && (
            <Text fontSize="small" style={styles.errorMessage}>
              {errorMessage}
            </Text>
          )}
        </View>
        <View style={styles.buttons}>
          <IconButton
            icon={<GoogleLogo />}
            iconSize={20}
            type="circle"
            onPress={() => onSignInThirdParty('google_oauth2')}
            eventId="google_authenticated_started"
          />
          <IconButton
            icon={<FacebookLogo />}
            iconSize={20}
            type="circle"
            onPress={() => onSignInThirdParty('facebook')}
            eventId="facebook_authenticated_started"
            buttonBackgroundColor="#3B5998"
          />
          <IconButton
            icon={<AppleLogo />}
            iconSize={20}
            type="circle"
            onPress={() => onSignInThirdParty('apple')}
            eventId="apple_authenticated_started"
            buttonBackgroundColor="#1d1d1f"
          />
          <Button
            containerStyle={styles.createButton}
            type="primary"
            title={i18n.t('actions.create')}
            onPress={handleSubmit(onSignUpPress)}
            style={styles.createButtonInner}
            uppercase={false}
            loading={loading}
          />
        </View>

        <View style={styles.contactUs}>
          <TextLink
            fontSize="small"
            linkColor={applicationColors.primary.shade900}
            onLinkPress={onContactUsPress}
          >
            {i18n.t('features.signUp.contactUs', {
              phone: ECOTEK_OFFICE,
            })}
          </TextLink>
        </View>
      </View>
    </DismissibleKeyboard>
  );
}

const ECOTEK_OFFICE = '02471056768';

function onViewTermsAndConditions() {
  Linking.openURL(`${Config.API_BASE_URL}/terms_and_conditions.pdf`);
}

// call to Ecotek office
function onContactUsPress() {
  Linking.openURL(`tel:${ECOTEK_OFFICE}`);
}
