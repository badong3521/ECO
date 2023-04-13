import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ImagePickerOptions } from 'react-native-image-picker';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { useForm } from 'react-hook-form';
import styles from './style.css';
import Button from '../../components/Button';
import { useUserState } from '../User/reducers';
import UserApi, { UpdateProfileParamsType } from '../../services/api/user';
import { getDateDDMMYYYY } from '../../utils/date';
import PhotoView, { PhotoViewRef } from '../../components/PhotoView';
import Avatar from '../../components/Avatar';
import Form from '../../components/Form';
import Input from '../../components/Input';
import IconComponent from '../../components/Icon';
import { applicationColors } from '../../../style.css';
import InputDatePicker from '../../components/InputDatePicker';
import InputImagePicker from '../../components/InputImagePicker';
import Text from '../../components/Text';
import useBackButton from '../../utils/hooks/useBackButton';
import EmailValidation from '../../components/Form/validators/email';
import DialogManager from '../../components/Dialog/manager';
import Dropdown from '../../components/Dropdown';
import EcoparkRegionApi from '../../services/api/ecoparkRegion';
import { RegionType } from '../../services/api/types/ecoparkRegion';
import { GenderType, ListGenders } from '../User/types';

interface UpdateProfileScreenProps {
  navigation: any;
}

const ecoparkRegionApi = new EcoparkRegionApi();
const noneEcoparkAreaValue = '0';

// Update user profile screen: avatar, email, birthday...
export default function UpdateProfileScreen(props: UpdateProfileScreenProps) {
  const { navigation } = props;
  const [userState, userActions] = useUserState();
  const [loading, setLoading] = useState<boolean>();
  const [apiErrors, setApiErrors] = useState<any>();
  const userApi = new UserApi();
  const photoRef = React.createRef<PhotoViewRef>();
  const i18n = useTranslation();
  const { register, errors, setValue, handleSubmit, watch, reset } = useForm<
    UpdateProfileParamsType
  >();
  const currentDob = userState.user?.dob
    ? new Date(userState.user?.dob)
    : undefined;
  const avatarValue = watch('avatar');
  const isSavable = hasAnyUpdate(watch());
  const ecoparkAreas = [{}].concat(userState.ecoparkAreas || []); // insert the `None` item at top of Ecopark areas list

  function getInputValue(name: string): any {
    if (watch(name) === undefined) {
      // @ts-ignore because form does not have all fields of UserType
      return userState.user[name];
    }
    return watch(name);
  }

  function onViewAvatar() {
    photoRef.current?.show();
  }

  // call api to update profile
  async function onUpdateProfilePress(params: UpdateProfileParamsType) {
    if (
      params.ecoparkRegionId &&
      params.ecoparkRegionId === noneEcoparkAreaValue
    ) {
      params.ecoparkRegionId = null;
    }
    setApiErrors(undefined);
    setLoading(true);
    if (params.birthday) {
      params.dob = getDateDDMMYYYY(params.birthday);
    }
    const res = await userApi.updateUserProfile({
      ...params,
      userId: userState.user?.id!,
    });
    if (res.status === 'success') {
      reset({});
      userActions.setUser(res.result.data);
    } else {
      setApiErrors(res.errors);
    }
    setLoading(false);
  }

  const fetchAllRegions = async () => {
    await ecoparkRegionApi.fetchRegions(true);
  };

  useBackButton(() => onBackPress(navigation, isSavable, i18n));

  // pass the backPress call back to the header button in the navigation
  useEffect(() => {
    navigation.setParams({
      onBackPress: () => onBackPress(navigation, isSavable, i18n),
    });
  }, [isSavable]);

  useEffect(() => {
    fetchAllRegions();
  }, []);

  // update profile right after uploaded new avatar
  useEffect(() => {
    if (avatarValue) {
      handleSubmit(onUpdateProfilePress);
    }
  }, [avatarValue]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="never">
        <View>
          <Form register={register} errors={errors} setValue={setValue}>
            <InputImagePicker
              imagePickerOptions={imagePickerOptions(i18n)}
              name="avatar"
              onCustomButtonPress={onViewAvatar}
            >
              <View style={styles.avatarContainer}>
                <Avatar
                  size={80}
                  style={styles.avatar}
                  avatarUrl={
                    avatarValue ? avatarValue.uri : userState.user?.avatar
                  }
                />
                <IconComponent
                  style={styles.cameraIcon}
                  size={18}
                  name="camera-alt"
                  color={applicationColors.neutral.shade900}
                />
              </View>
            </InputImagePicker>

            <Text fontSize="small" style={styles.description} key="description">
              {i18n.t('features.updateProfileScreen.description')}
            </Text>
            <View style={styles.row} key="name">
              <Input
                name="firstName"
                label={i18n.t('features.updateProfileScreen.firstName')}
                value={getInputValue('firstName')}
                containerStyle={styles.leftColumn}
                returnKeyType="next"
              />
              <Input
                containerStyle={styles.rightColumn}
                name="lastName"
                label={i18n.t('features.updateProfileScreen.lastName')}
                value={getInputValue('lastName')}
                returnKeyType="next"
              />
            </View>
            <View style={styles.row} key="phoneAndGender">
              <Input
                key="phoneNumber"
                label={i18n.t('features.updateProfileScreen.phoneNumber')}
                value={userState.user?.phoneNumber}
                editable={false}
                withButtons
                containerStyle={styles.leftColumn}
                buttons={[
                  {
                    iconName: 'lock',
                  },
                ]}
              />
              <View style={styles.rightColumn} key="genderContainer">
                <Dropdown
                  name="gender"
                  data={ListGenders}
                  value={getInputValue('gender')}
                  labelExtractor={(value: GenderType) =>
                    i18n.t(`features.updateProfileScreen.gender.${value}`)!
                  }
                  valueExtractor={value => value}
                  label={i18n.t('features.updateProfileScreen.gender.title')}
                  noneItemId="unknown"
                  type="round"
                />
              </View>
            </View>
            <Input
              label={i18n.t('features.updateProfileScreen.email')}
              value={getInputValue('email')}
              name="email"
              keyboardType="email-address"
              rules={EmailValidation}
            />
            <View style={styles.row} key="picker">
              <InputDatePicker
                name="birthday"
                label={i18n.t('features.updateProfileScreen.birthday')}
                value={watch('birthday') || currentDob}
                containerStyle={styles.leftColumn}
              />
              <View style={styles.rightColumn} key="region">
                <Dropdown
                  name="ecoparkRegionId"
                  data={ecoparkAreas}
                  value={getInputValue('ecoparkRegionId')}
                  valueExtractor={(value: RegionType) =>
                    value?.id || noneEcoparkAreaValue
                  }
                  labelExtractor={(value: RegionType) =>
                    value?.name ||
                    i18n.t('features.updateProfileScreen.noneArea')!
                  }
                  noneItemId={noneEcoparkAreaValue}
                  label={i18n.t('features.updateProfileScreen.ecoparkArea')}
                  type="round"
                  dropdownPosition={null}
                  itemCount={4}
                />
              </View>
            </View>
          </Form>

          <Text fontSize="small" style={styles.errorMessage}>
            {apiErrors || ''}
          </Text>

          <Button
            type="primary"
            showSuccessAnimation={!apiErrors}
            title={i18n.t('actions.save')}
            onPress={handleSubmit(onUpdateProfilePress)}
            style={styles.doneButton}
            uppercase={false}
            disable={!isSavable}
            loading={loading}
          />
        </View>
      </ScrollView>

      {userState.user?.avatar && (
        <PhotoView
          images={[{ photoUrl: userState.user?.avatar }]}
          photoViewRef={photoRef}
        />
      )}
    </View>
  );
}

function hasAnyUpdate(userParams: UpdateProfileParamsType): boolean {
  return (
    !!userParams.firstName ||
    !!userParams.lastName ||
    !!userParams.email ||
    !!userParams.birthday ||
    !!userParams.avatar ||
    !!userParams.ecoparkRegionId ||
    !!userParams.gender
  );
}

// the options setup for image picker
const imagePickerOptions = (
  i18n: UseTranslationResponse,
): ImagePickerOptions => ({
  title: i18n.t('features.updateProfileScreen.avatar'),
  takePhotoButtonTitle: i18n.t('features.updateProfileScreen.takePhoto'),
  chooseFromLibraryButtonTitle: i18n.t(
    'features.updateProfileScreen.chooseFromLibrary',
  ),
  customButtons: [
    {
      name: 'view',
      title: i18n.t('features.updateProfileScreen.viewAvatar'),
    },
  ],
  maxHeight: 1000, // auto scale if image dimension is greater than 1000
  maxWidth: 1000,
  storageOptions: {
    skipBackup: true,
    path: 'images',
    privateDirectory: true,
  },
});

function onBackPress(
  navigation: any,
  isSavable: boolean,
  i18n: UseTranslationResponse,
): boolean {
  if (isSavable) {
    DialogManager.showConfirmDialog({
      confirmTitle: i18n.t('actions.yes'),
      returnTitle: i18n.t('actions.no'),
      title: i18n.t('features.updateProfileScreen.confirmWantToBack'),
      onConfirmPress: () => navigation.goBack(),
    });
  } else {
    navigation.goBack();
  }
  return true;
}
