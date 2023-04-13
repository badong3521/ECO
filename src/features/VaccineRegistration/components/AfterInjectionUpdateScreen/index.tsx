import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import styles from './styles.css';
import NavHeader from '../../../../components/NavHeader';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import ItemRadioButton from '../../../../components/ItemRadioButton';
import i18n from '../../../../i18n';
import { ResidentType } from '../../../../services/api/types/ecoid';

interface Props {
  navigation: any;
}

interface AfterInjectionUpdateParams {
  isInjected: string;
}

export const INJECTION_NO = '0';
export const INJECTION_YES = '1';

export default function AfterInjectionUpdateScreen(props: Props) {
  const { navigation } = props;
  const resident: ResidentType = navigation.getParam('resident', {});

  const { errors, setValue, register, handleSubmit, watch } = useForm<
    AfterInjectionUpdateParams
  >();

  function onSubmit(params: AfterInjectionUpdateParams) {
    if (!params || !params.isInjected) {
      return;
    }

    if (params.isInjected === INJECTION_YES) {
      navigation.navigate('UpdateInjectedScreen', {
        resident,
      });
    } else if (params.isInjected === INJECTION_NO) {
      navigation.navigate('UpdateNoInjectionScreen', {
        resident,
      });
    }
  }

  function isChecked(fieldName: string, id: string) {
    const value = watch(fieldName);
    return value && value === id ? 'checked' : 'unchecked';
  }

  function renderSubtitle() {
    if (!resident || !resident.locationCode || !resident.zoneName) {
      return '';
    }

    return `${resident.locationCode} | ${resident.zoneName}`;
  }

  return (
    <View style={styles.container}>
      <NavHeader
        hasBackButton
        title={resident ? resident.fullName : ''}
        subtitle={renderSubtitle()}
        rightHeader={<View style={styles.rightHeader} />}
      />
      <View style={styles.content}>
        <Text bold="bold">
          {i18n.t('features.afterInjectionUpdate.titleChoseServay')}
        </Text>
        <Form register={register} errors={errors} setValue={setValue}>
          <View style={styles.itemRadio} key={INJECTION_NO}>
            <ItemRadioButton
              name="isInjected"
              value={watch('isInjected')}
              status={isChecked('isInjected', INJECTION_NO)}
              onPress={() => setValue('isInjected', INJECTION_NO)}
              style={styles.radioButton}
              label={i18n.t('features.afterInjectionUpdate.noInjection')}
            />
          </View>
          <View style={styles.itemRadio} key={INJECTION_YES}>
            <ItemRadioButton
              name="isInjected"
              value={watch('isInjected')}
              status={isChecked('isInjected', INJECTION_YES)}
              onPress={() => setValue('isInjected', INJECTION_YES)}
              style={styles.radioButton}
              label={i18n.t('features.afterInjectionUpdate.injection')}
            />
          </View>
        </Form>
      </View>
      <View style={styles.footer}>
        <Button
          disable={!watch('isInjected')}
          type="primary"
          uppercase={false}
          onPress={handleSubmit(onSubmit)}
          title={i18n.t('features.vaccineRegistrationScreen.stepOne.continue')}
        />
      </View>
    </View>
  );
}
