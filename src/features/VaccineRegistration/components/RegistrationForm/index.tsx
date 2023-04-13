import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { applicationColors } from '../../../../../style.css';
import styles from './style.css';
import StepOne, { StepOneFormParams } from '../StepOne';
import StepOtp from '../StepOtp';
import StepTwo, { StepTwoFormParams } from '../StepTwo';
import StepThree from '../StepThree';
import StepFour from '../StepFour';
import Nav from '../../../../components/Nav';
import i18n from '../../../../i18n';
import Loader from '../../../../components/Loader';
import PhotoView, { PhotoViewRef } from '../../../../components/PhotoView';
import { PhotoType } from '../../../../components/Card/types';
import {
  ResidentFormDataType,
  ResidentType,
} from '../../../../services/api/types/ecoid';
import EcoIdApi from '../../../../services/api/ecoId';
import DirectEcoidApi from '../../../../services/api/directEcoid';
import UseOtpTokenApi from '../../../../services/api/user_otp_token';
import { AreaType } from '../../../../services/api/types/directEcoid';
import { useUserState } from '../../../User/reducers';
import { FormStep } from '../../types';
import DialogManager from '../../../../components/Dialog/manager';
import { convertTo84 } from '../../../../utils/phoneNumber';

interface Props {
  navigation: any;
}

interface VerifyOtpType {
  isVerified: boolean;
  phoneNumber?: string;
}

export type FormData = StepOneFormParams | StepTwoFormParams;

export default function RegistrationForm(props: Props) {
  const [userState] = useUserState();
  const { user, userLanguage } = userState;
  const ecoIdApi = new EcoIdApi();
  const directEcoidApi = new DirectEcoidApi();
  const userOtpTokenApi = new UseOtpTokenApi();
  const { navigation } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const refFlatlist = useRef<FlatList>(null);
  const residentParams: ResidentType = navigation.getParam('resident');
  const [loading, setLoading] = useState<boolean>(true);
  const [resident, setResident] = useState<ResidentFormDataType>();
  const [areaData, setAreaData] = useState<AreaType>();
  const [stepOneFormParams, setStepOneFormParams] = useState<
    StepOneFormParams
  >();
  const [stepTwoFormParams, setStepTwoFormParams] = useState<
    StepTwoFormParams
  >();
  const verifiedEditingPhone =
    resident?.registrationStatusCode === 'EDITING'
      ? resident.phoneNumber
      : undefined;
  const [phoneNumberVerify, setPhoneNumberVerify] = useState<VerifyOtpType>({
    isVerified: true,
    phoneNumber: verifiedEditingPhone || user?.phoneNumber,
  });

  const [previewImages, setPreviewImages] = useState<PhotoType[]>([]);
  const photoRef = React.createRef<PhotoViewRef>();
  function onImagePreviewPress(photoUrl: string) {
    setPreviewImages([{ photoUrl }]);
    photoRef.current?.show();
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onNavBackPress,
    );

    return () => backHandler.remove();
  }, []);

  function onNextStep(params?: FormData, phoneNumberVerified?: string) {
    let nextStep = currentStep + 1;
    const phoneNumber = (params as StepOneFormParams)?.phoneNumber;
    const phoneNumber84 = convertTo84(phoneNumber);

    switch (currentStep) {
      case 0: // stepOne
        setStepOneFormParams(params as StepOneFormParams);
        if (
          phoneNumber84 === convertTo84(verifiedEditingPhone) ||
          phoneNumber84 === convertTo84(user?.phoneNumber) ||
          (phoneNumber84 === phoneNumberVerify.phoneNumber &&
            phoneNumberVerify.isVerified)
        ) {
          nextStep += 1;
        } else {
          userOtpTokenApi.send(phoneNumber);
          setPhoneNumberVerify({
            isVerified: false,
            phoneNumber: phoneNumber84,
          });
        }
        break;
      case 1: // stepOtp
        setPhoneNumberVerify({
          isVerified: true,
          phoneNumber: convertTo84(phoneNumberVerified),
        });
        break;
      case 2: // stepTwo
        setStepTwoFormParams(params as StepTwoFormParams);
        break;
      default:
        break;
    }

    if (refFlatlist.current) {
      refFlatlist.current.scrollToIndex({
        animated: true,
        index: nextStep,
      });
      setCurrentStep(nextStep);
    }
  }

  function onPrevStep() {
    const previousIndex = currentStep === 2 ? 0 : currentStep - 1;

    if (refFlatlist.current) {
      refFlatlist.current.scrollToIndex({
        animated: true,
        index: previousIndex,
      });
      setCurrentStep(previousIndex);
    }
  }

  async function onSubmit() {
    DialogManager.showLoadingDialog({ dismissible: true });
    const params = {
      ...stepOneFormParams,
      ...stepTwoFormParams,
      residentId: resident?.residentId,
    };
    const response = await ecoIdApi.submitUserVaccineData(params);
    DialogManager.dismissLoadingDialog();
    if (response.status === 'success') {
      onNextStep();
    }
  }

  async function fetchResidentFormData() {
    const residentRes = await ecoIdApi.fetchResidentDataForm(
      residentParams.residentId,
    );
    const areaRes = await directEcoidApi.getAllAreas();
    if (residentRes.status === 'success' && areaRes.status === 'success') {
      setLoading(false);
      setResident(residentRes.result.data);
      setAreaData(areaRes.result.data);
    }
  }

  function onNavBackPress() {
    switch (currentStep) {
      case 0: // stepOne
        navigation.goBack();
        break;
      case 4: // stepFour
        return true;
      default:
        onPrevStep();
    }

    return true;
  }

  useEffect(() => {
    fetchResidentFormData();
  }, [residentParams.residentId]);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Nav
        goBack={onNavBackPress}
        header={i18n.t('headers.vaccineRegistration')}
      />
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={{
            stepIndicatorSize: 30,
            currentStepIndicatorSize: 30,
            separatorStrokeWidth: 4,
            separatorStrokeUnfinishedWidth: 3,
            stepStrokeWidth: 0,
            currentStepStrokeWidth: 0,
            stepIndicatorCurrentColor: applicationColors.primary.shade900,
            separatorFinishedColor: applicationColors.primary.shade900,
            stepIndicatorFinishedColor: applicationColors.primary.shade900,
            stepIndicatorLabelCurrentColor: '#fff',
            stepIndicatorLabelUnFinishedColor: '#8B8B8B',
            separatorUnFinishedColor: '#D8D8D8',
            stepIndicatorUnFinishedColor: '#D8D8D8',
          }}
          currentPosition={currentStep === 0 ? currentStep : currentStep - 1}
          stepCount={4}
        />
      </View>

      {loading && <Loader style={styles.loader} />}

      {!loading && resident && areaData && user && (
        <FlatList
          ref={refFlatlist}
          data={STEPS_REGISTER}
          scrollEventThrottle={60}
          pagingEnabled
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={({ item }) => {
            switch (item) {
              case 'stepOne':
                return (
                  <View style={styles.containerStep}>
                    <StepOne
                      resident={resident}
                      areaData={areaData}
                      user={user}
                      onPressContinue={onNextStep}
                      onImagePreviewPress={onImagePreviewPress}
                    />
                  </View>
                );
              case 'stepOtp':
                return (
                  <View style={styles.containerStep}>
                    <StepOtp
                      onPressContinue={onNextStep}
                      phoneNumber={phoneNumberVerify.phoneNumber}
                      isFocused={currentStep === 1}
                    />
                  </View>
                );
              case 'stepTwo':
                return (
                  <View style={styles.containerStep}>
                    <StepTwo
                      resident={resident}
                      onPressPrevious={onPrevStep}
                      onPressContinue={onNextStep}
                      userLanguage={userLanguage}
                      onImagePreviewPress={onImagePreviewPress}
                    />
                  </View>
                );
              case 'stepThree':
                return (
                  <View style={styles.containerStep}>
                    <StepThree
                      onPressPrevious={onPrevStep}
                      onPressContinue={onSubmit}
                      stepOneFormParams={stepOneFormParams}
                      stepTwoFormParams={stepTwoFormParams}
                      areaData={areaData}
                      resident={resident}
                      userLanguage={userLanguage}
                      onImagePreviewPress={onImagePreviewPress}
                    />
                  </View>
                );
              case 'stepFour':
                return (
                  <View style={styles.containerStep}>
                    <StepFour
                      onPressContinue={() =>
                        navigation.navigate('VaccineDashboard', {
                          reloadAt: new Date().getMilliseconds(),
                        })
                      }
                    />
                  </View>
                );
              default:
                return null;
            }
          }}
        />
      )}

      <PhotoView images={previewImages} photoViewRef={photoRef} />
    </KeyboardAvoidingView>
  );
}

const STEPS_REGISTER: FormStep[] = [
  'stepOne',
  'stepOtp',
  'stepTwo',
  'stepThree',
  'stepFour',
];
