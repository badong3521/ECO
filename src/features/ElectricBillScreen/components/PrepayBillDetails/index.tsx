import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { Platform, View } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import Spacer from '../../../../components/Spacer';
import Text from '../../../../components/Text';
import DncEcoidApi from '../../../../services/api/dncEcoid';
import { useUserState } from '../../../User/reducers';
import {
  BillType,
  PaymentCardType,
} from '../../../../services/api/types/dncEcoid';
import DialogManager from '../../../../components/Dialog/manager';
import BillDetails from '../BillDetails';
import Button from '../../../../components/Button';
import { getNumberString } from '../../../../utils/number';
import ItemRadioButton from '../../../../components/ItemRadioButton';
import Loader from '../../../../components/Loader';

import styles from './style.css';

const iconLocalBank = require('../../../../assets/electricBills/ic_local_bank.png');
// const iconVisa = require('../../../../assets/electricBills/ic_visa.png');

interface Props {
  navigation: any;
}

const dncEcoidApi = new DncEcoidApi();

export default function PrepayBillDetails(props: Props) {
  const { navigation } = props;
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const [cardType, setCardType] = useState<PaymentCardType | undefined>(
    undefined,
  );
  const bill: BillType = navigation.getParam('bill');
  const [billDetails, setBillDetails] = useState<BillType | undefined>(
    undefined,
  );
  const [paymentFee, setPaymentFee] = useState<number | undefined>(undefined);
  const isTypeChecked = (type: PaymentCardType) =>
    cardType === type ? 'checked' : 'unchecked';

  function changeCardType(value: PaymentCardType) {
    setCardType(value);
    const fee =
      value === 'DOMESTIC'
        ? billDetails?.fees?.domestic.feePayment!
        : billDetails?.fees?.international.feePayment!;
    setPaymentFee(fee);
  }

  async function onPayNowClickHandle() {
    DialogManager.showLoadingDialog({ dismissible: true });
    const response = await dncEcoidApi.getBillPaymentUrl(
      userState.user?.ecoid!,
      bill,
      cardType!,
    );
    DialogManager.dismissLoadingDialog();

    if (response.status === 'success') {
      navigation.navigate('DncBillPaymentScreen', {
        paymentUrl: response.result.data.url,
        billId: bill.billId,
      });
    }
  }

  async function fetchPrePaymentDetails() {
    const billResponse = await dncEcoidApi.getPrePaymentDetails(
      userState.user?.ecoid!,
      bill,
    );

    if (billResponse.status === 'success')
      setBillDetails(billResponse.result.data.billInfo);
  }

  useEffect(() => {
    setCardType('DOMESTIC');
    setPaymentFee(billDetails?.fees?.domestic.feePayment!);
  }, [billDetails])

  useEffect(() => {
    fetchPrePaymentDetails();
  }, [bill.billId]);

  function renderCardItem(type: PaymentCardType, image: Source) {
    return (
      <View style={styles.card}>
        <Spacer width={10} />
        <FastImage source={image} style={styles.cardImage} resizeMode="cover" />
        <Spacer width={10} />
        <View style={styles.cardDetails}>
          <View>
            <Spacer height={Platform.OS === 'android' ? 5 : 10} />
            <Text numberOfLines={2}>
              {i18n.t(
                `features.electricBill.listBills.${
                  type === 'DOMESTIC' ? 'domestic' : 'international'
                }`,
              )}
            </Text>
          </View>
          {type === cardType && (
            <Text style={styles.paymentFee}>
              {i18n.t('features.electricBill.listBills.paymentFee', {
                paymentFee: getNumberString(paymentFee || 0, userLanguage),
              })}
            </Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <>
      {!billDetails && <Loader style={styles.loader} />}

      {billDetails && (
        <View style={styles.container}>
          <BillDetails bill={bill} navigation={navigation}>
            <View style={styles.selectType}>
              <Text bold="bold">
                {i18n.t('features.electricBill.listBills.cardType')}
              </Text>

              <ItemRadioButton
                containerStyle={styles.itemRadioButton}
                name="cardType"
                value="DOMESTIC"
                status={isTypeChecked('DOMESTIC')}
                onPress={value => changeCardType(value as PaymentCardType)}
              >
                {renderCardItem('DOMESTIC', iconLocalBank)}
              </ItemRadioButton>

              {/* <ItemRadioButton
                containerStyle={styles.itemRadioButton}
                name="cardType"
                value="INTERNATIONAL"
                status={isTypeChecked('INTERNATIONAL')}
                onPress={value => changeCardType(value as PaymentCardType)}
              >
                {renderCardItem('INTERNATIONAL', iconVisa)}
              </ItemRadioButton> */}
            </View>
          </BillDetails>

          <View style={styles.payNow}>
            <View style={styles.totalDetails}>
              {cardType && (
                <>
                  <Text color="darkGreyV2">
                    {i18n.t('features.electricBill.listBills.totalPay')}
                  </Text>
                  <Text fontSize="large" bold="bold" style={styles.totalNumber}>
                    {i18n.t('features.electricBill.listBills.totalVnd', {
                      total: getNumberString(
                        bill.debtPay! + paymentFee!,
                        userLanguage,
                      ),
                    })}
                  </Text>
                </>
              )}
            </View>
            <View style={styles.totalDetailsBtn}>
              <Button
                disable={!cardType}
                type="primary"
                title={i18n.t('features.electricBill.listBills.payNow')}
                onPress={onPayNowClickHandle}
                uppercase={false}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
}
