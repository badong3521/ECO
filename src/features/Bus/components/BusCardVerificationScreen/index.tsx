import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Dropdown from '../../../../components/Dropdown';
import styles from './style.css';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import EcoparkRegionApi from '../../../../services/api/ecoparkRegion';
import BusCardApi from '../../../../services/api/busCard';
import Form from '../../../../components/Form';
import RequiredValidation from '../../../../components/Form/validators';
import CheckBox from '../../../../components/CheckBox';
import { useUserState } from '../../../User/reducers';
import BusCardValidation from '../../../../components/Form/validators/bus_card';
import { BusCardFormDataType } from '../../../../services/api/types/busCardType';
import DialogManager from '../../../../components/Dialog/manager';
import { applicationColors } from '../../../../../style.css';

interface BusCardVerificationPropTypes {
  navigation: any;
}

export default function BusCardVerificationScreen(
  props: BusCardVerificationPropTypes,
) {
  const [userState] = useUserState();
  const { user, ecoparkAreas } = userState;

  const { i18n } = useTranslation();
  const { navigation } = props;
  const ecoparkRegionApi = new EcoparkRegionApi();
  const busCardApi = new BusCardApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<any>();
  const { busCard } = navigation.state.params;
  const { register, setValue, errors, watch, handleSubmit } = useForm<
    BusCardFormDataType
  >({
    defaultValues: {
      lastName: busCard?.lastName,
      firstName: busCard?.firstName,
      cardArea: busCard?.cardArea,
      cardNumber: busCard?.cardNumber,
      primary: busCard?.primary || false,
    },
  });
  const [firstLoadEditing, setFirstLoadEditing] = useState<boolean>(!!busCard);

  const primary = watch('primary');

  async function fetchAllRegions() {
    await ecoparkRegionApi.fetchRegions();
  }

  const addBusCard = async (params: BusCardFormDataType) => {
    Keyboard.dismiss();
    setLoading(true);

    const cardNumberTrimmed = params.cardNumber.replace(/\s/g, '');
    const splitCardNumber = `${cardNumberTrimmed.slice(
      0,
      4,
    )} ${cardNumberTrimmed.slice(4)}`;

    const res = await busCardApi.addBusCard({
      ...params,
      cardNumber: splitCardNumber,
    });

    setLoading(false);

    if (res.status === 'success') {
      navigation.goBack();
    } else {
      setApiError(res.errors);
    }
  };

  async function updateBusCard(params: BusCardFormDataType) {
    const res = await busCardApi.updateBusCard({
      firstName: params.firstName,
      lastName: params.lastName,
      primary: params.primary || false,
      id: busCard.id,
    });

    setLoading(false);

    if (res.status === 'success') {
      DialogManager.showMessageDialog({
        message: i18n.t(
          'features.busScreen.busCardVerificationScreen.cardModifiedMessage',
        ),
        confirmColor: applicationColors.primary.shade900,
        confirmTitle: i18n.t('actions.ok'),
      });
      navigation.goBack();
    } else {
      setApiError(res.errors[0]);
    }
  }

  function onSubmitButtonPress(params: BusCardFormDataType) {
    if (busCard) {
      updateBusCard(params);
    } else {
      addBusCard(params);
    }
  }

  useEffect(() => {
    fetchAllRegions();
  }, []);

  useEffect(() => {
    if (!firstLoadEditing) {
      setValue(
        'firstName',
        primary ? user?.firstName : busCard && busCard.firstName,
      );
      setValue(
        'lastName',
        primary ? user?.lastName : busCard && busCard.lastName,
      );
    } else {
      setFirstLoadEditing(false);
    }
  }, [primary]);

  return (
    <View style={styles.contentContainer}>
      <Form register={register} errors={errors} setValue={setValue}>
        <View style={styles.checkboxContainer} key="checkbox">
          <CheckBox
            value={watch('primary')}
            name="primary"
            containerStyleIOS={styles.checkbox}
          />
          <Text key="primaryText">
            {i18n.t('features.busScreen.busCardVerificationScreen.primary')}
          </Text>
        </View>
        <View style={styles.row} key="row">
          <Input
            value={watch('firstName')}
            containerStyle={styles.input}
            name="firstName"
            label={i18n.t('features.signUp.firstName')}
            returnKeyType="next"
            errorMessage={errors.firstName?.message}
            rules={RequiredValidation}
            disabled={primary}
          />
          <Input
            value={watch('lastName')}
            containerStyle={styles.inputLastName}
            name="lastName"
            label={i18n.t('features.signUp.lastName')}
            returnKeyType="next"
            errorMessage={errors.lastName?.message}
            rules={RequiredValidation}
            disabled={primary}
          />
        </View>
        <Dropdown
          name="cardArea"
          rules={RequiredValidation}
          label={i18n.t(
            'features.busScreen.busCardVerificationScreen.livingAreaLabel',
          )}
          type="round"
          data={ecoparkAreas || []}
          value={watch('cardArea')}
          valueExtractor={value => value.code}
          labelExtractor={value => value.name}
          disabled={!!busCard}
        />
        <Input
          value={watch('cardNumber')}
          name="cardNumber"
          label={i18n.t(
            'features.busScreen.busCardVerificationScreen.cardNumberLabel',
          )}
          returnKeyType="done"
          rules={BusCardValidation}
          keyboardType="numeric"
          maxLength={8}
          disabled={busCard}
          onSubmitEditing={handleSubmit(onSubmitButtonPress)}
        />
      </Form>
      <Text fontSize="small" style={styles.errorMessage}>
        {apiError ? i18n.t(apiError) : ''}
      </Text>
      <Button
        type="primary"
        style={styles.verifyButton}
        uppercase={false}
        loading={loading}
        title={i18n.t('actions.save')}
        onPress={handleSubmit(onSubmitButtonPress)}
      />
    </View>
  );
}
