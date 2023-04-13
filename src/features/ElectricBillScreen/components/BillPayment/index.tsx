import React from 'react';
import { useUserState } from '../../../User/reducers';
import PaymentScreen from '../../../PaymentScreen';
import { PaymentUrlCallback } from '../../../../services/api/types/dncEcoid';
import { useElectricBillState } from '../../reducers';

interface Props {
  navigation: any;
}

export default function BillPayment(props: Props) {
  const { navigation } = props;
  const { paymentUrl, billId } = navigation.state.params;
  const [userState] = useUserState();
  const [, electricBillActions] = useElectricBillState();

  function onPaymentSuccessfullCallback() {
    electricBillActions.removeSearchedBills(billId);
    electricBillActions.setLastLoadBills(new Date().getMilliseconds());
    navigation.navigate('DncBillPaymentSuccessfullScreen', {
      nextScreen: 'DncElectricBillScreen',
    });
  }

  function onPaymentFailed(errorMessage: string) {
    navigation.navigate('DncBillPaymentFailureScreen', {
      errorMessage,
    });
  }

  function onBackPressCallback() {
    navigation.goBack();
  }

  return (
    <PaymentScreen
      paymentUrl={paymentUrl}
      callBackUrl={PaymentUrlCallback}
      userLanguage={userState.userLanguage}
      onPaymentSuccessfull={onPaymentSuccessfullCallback}
      onPaymentFailed={onPaymentFailed}
      onBackPressCallback={onBackPressCallback}
      navigation={navigation}
      isEcotekSupport
    />
  );
}
