import React, { useState } from 'react';
import i18n from 'i18next';
import { View } from 'react-native';
import Text from '../../../../components/Text';
import Input from '../../../../components/Input';
import Icon from '../../../../components/Icon';
import Button from '../../../../components/Button';
import NotFoundModal from '../../../../components/NotFoundModal';
import DialogManager from '../../../../components/Dialog/manager';
import DismissibleKeyboard from '../../../../components/DismissibleKeyboard';
import DncLogo from '../../../../assets/electricBills/dnc_logo.svg';
import DncEcoidApi from '../../../../services/api/dncEcoid';
import { useUserState } from '../../../User/reducers';

import styles from './style.css';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

const dncEcoidApi = new DncEcoidApi();

interface Props {
  navigation: any;
}

export default function AddNewCustomerCode(props: Props) {
  const { navigation } = props;
  const [userState] = useUserState();
  const [code, setCode] = useState<string>();
  const [isBillsNotFound, setIsBillsNotFound] = useState<boolean>(false);

  async function onSubmitHandle() {
    DialogManager.showLoadingDialog({ dismissible: true });
    const billResponse = await dncEcoidApi.getBillsByCustomerCode(
      userState.user?.ecoid!,
      code!,
    );
    DialogManager.dismissLoadingDialog();

    if (billResponse.status === 'success') {
      navigation.navigate('DncElectricBillScreen', {
        isReloadSearchedBill: true,
      });
    } else setIsBillsNotFound(true);
  }

  return (
    <>
      <DismissibleKeyboard>
        <View style={styles.container}>
          <View style={styles.banner}>
            <DncLogo style={styles.logo} />
            <View style={styles.bannerContent}>
              <Text bold="bold" numberOfLines={2} fontSize="small">
                {i18n.t('features.electricBill.addNewCustomerCode.companyName')}
              </Text>
              <Text numberOfLines={2} fontSize="small">
                {i18n.t(
                  'features.electricBill.addNewCustomerCode.companyDetails',
                )}
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <View>
              <Text bold="bold">
                {i18n.t(
                  'features.electricBill.addNewCustomerCode.customerCode',
                )}
              </Text>
            </View>
            <Input
              flatOutlined
              value={code}
              onChangeText={value => setCode(value)}
              autoCapitalize="characters"
            />
            <View style={styles.notes}>
              <Icon
                name="info"
                size={applicationDimensions.iconSize}
                color={applicationColors.secondary.softGrey}
              />
              <Text
                fontSize="small"
                style={styles.textNote}
                numberOfLines={2}
                color="grey"
              >
                {i18n.t('features.electricBill.addNewCustomerCode.note')}
              </Text>
            </View>
          </View>

          <Button
            type="primary"
            title={i18n.t('actions.next')}
            onPress={onSubmitHandle}
            style={styles.button}
            uppercase={false}
            disable={!code}
          />
        </View>
      </DismissibleKeyboard>

      <NotFoundModal
        visible={isBillsNotFound}
        title={i18n.t('features.electricBill.addNewCustomerCode.modalTitle')}
        header={i18n.t('features.electricBill.addNewCustomerCode.modalHeader')}
        details={i18n.t(
          'features.electricBill.addNewCustomerCode.modalDetails',
        )}
        buttonText={i18n.t('actions.understand')}
        onClose={() => setIsBillsNotFound(false)}
      />
    </>
  );
}
