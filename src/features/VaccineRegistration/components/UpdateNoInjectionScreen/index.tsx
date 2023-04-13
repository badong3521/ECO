import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import NavHeader from '../../../../components/NavHeader';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import ItemRadioButton from '../../../../components/ItemRadioButton';
import i18n from '../../../../i18n';
import EcoIdApi from '../../../../services/api/ecoId';
import { ResidentType } from '../../../../services/api/types/ecoid';
import Loader from '../../../../components/Loader';
import DirectEcoidApi from '../../../../services/api/directEcoid';
import { VaccineInjectionReason } from '../../../../services/api/types/directEcoid';
import { useUserState } from '../../../User/reducers';
import DialogManager from '../../../../components/Dialog/manager';
import { INJECTION_NO } from '../AfterInjectionUpdateScreen';
import SurveySuccessModal from '../SurveySuccess';

import styles from './styles.css';

interface Props {
  navigation: any;
}
interface UpdateNoInjectionFormParams {
  reasonId: string;
}

export default function UpdateNoInjectionScreen(props: Props) {
  const { navigation } = props;
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const directEcoidApi = new DirectEcoidApi();
  const ecoIdApi = new EcoIdApi();
  const resident: ResidentType = navigation.getParam('resident', {});
  const [loading, setLoading] = useState<boolean>(true);
  const { errors, setValue, register, handleSubmit, watch } = useForm<
    UpdateNoInjectionFormParams
  >();
  const [reasons, setReasons] = useState<VaccineInjectionReason[]>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function onModalClose() {
    setModalVisible(false);
    navigation.navigate('VaccineDashboard', {
      reloadAt: new Date().getMilliseconds(),
    });
  }

  async function haddleFormSubmit() {
    await handleSubmit(onSubmit)();
    setModalVisible(true);
  }

  async function onSubmit(params: UpdateNoInjectionFormParams) {
    DialogManager.showLoadingDialog({ dismissible: true });
    const data = {
      injectionStatus: INJECTION_NO,
      reasonId: params.reasonId,
      residentId: resident?.residentId,
    };
    await ecoIdApi.submitAfterVaccineInjectionSurvey(data);
    DialogManager.dismissLoadingDialog();
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

  async function fetchReasonFormData() {
    const reasonRes = await directEcoidApi.fetchVaccineInjectionReason();

    if (reasonRes.status === 'success') {
      setLoading(false);
      setReasons(reasonRes.result.data);
    }
  }

  useEffect(() => {
    fetchReasonFormData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <NavHeader
          hasBackButton
          title={resident ? resident.fullName : ''}
          subtitle={renderSubtitle()}
          rightHeader={<View style={styles.rightHeader} />}
        />

        {loading && <Loader style={styles.loader} />}
        {!loading && (
          <>
            <View style={styles.content}>
              <Text bold="bold">
                {i18n.t(
                  'features.afterInjectionUpdate.updateNoInjection.title',
                )}
              </Text>
              <Form register={register} errors={errors} setValue={setValue}>
                <>
                  {reasons?.map(reason => {
                    return (
                      <View style={styles.itemRadio} key={reason.reasonId}>
                        <ItemRadioButton
                          name="reasonId"
                          value={watch('reasonId')}
                          status={isChecked(
                            'reasonId',
                            reason.reasonId.toString(),
                          )}
                          onPress={() =>
                            setValue('reasonId', reason.reasonId.toString())
                          }
                          style={styles.radioButton}
                          label={
                            userLanguage === 'en'
                              ? reason.titleEn
                              : reason.titleVi
                          }
                          containerStyle={styles.itemRadioContainer}
                        />
                      </View>
                    );
                  })}
                </>
              </Form>
            </View>
            <View style={styles.footer}>
              <Button
                disable={!watch('reasonId')}
                type="primary"
                uppercase={false}
                onPress={haddleFormSubmit}
                title={i18n.t(
                  'features.afterInjectionUpdate.updateNoInjection.button',
                )}
              />
            </View>
          </>
        )}
      </View>

      <SurveySuccessModal visible={modalVisible} onClose={onModalClose} />
    </>
  );
}
