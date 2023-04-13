import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import i18n from 'i18next';
import Loader from '../../components/Loader';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { useUserState } from '../User/reducers';
import { useElectricBillState } from './reducers';
import DncEcoidApi from '../../services/api/dncEcoid';
import CustomerCodeItem from './components/CustomerCodeItem';
import DeletingCustomerCodeModal from './components/DeletingCustomerCodeModal';
import DeletingCustomerCodeSuccessful from './components/DeletingCustomerCodeSuccessful';

import styles from './style.css';

const dncEcoidApi = new DncEcoidApi();

interface Props {
  navigation: any;
}

export default function ElectricBillScreen(props: Props) {
  const { navigation } = props;
  const [userState] = useUserState();
  const [electricBillState, electricBillActions] = useElectricBillState();
  const [loading, setLoading] = useState(true);
  const isReloadSearchedBill = navigation.getParam('isReloadSearchedBill');
  const [isDeletingCodeModalVisible, setDeletingCodeModalVisible] = useState<
    boolean
  >(false);
  const [
    isDeletingSuccessModalVisible,
    setIsDeletingSuccessModalVisible,
  ] = useState<boolean>(false);
  const [codeDeleting, setCodeDeleting] = useState<string | undefined>(
    undefined,
  );

  const allBills = [
    ...(electricBillState.bills || []),
    ...(electricBillState.searchedBills || []),
  ];
  const codesHasBill = allBills.filter(b => !!b.billId);
  const codesHasNoBill = allBills.filter(b => !b.billId);
  const allSortedBills = [...codesHasBill, ...codesHasNoBill];
  const uniqueCodes = [
    ...new Set(allSortedBills.map(bill => bill.customerCode)),
  ];

  async function fetchBillsByEcoid() {
    setLoading(true);
    const billResponse = await dncEcoidApi.getBillByEcoid(
      userState.user?.ecoid!,
    );
    if (electricBillState.searchedBills && !isReloadSearchedBill) {
      const { customerCode } = electricBillState.searchedBills[0];
      await dncEcoidApi.getBillsByCustomerCode(
        userState.user?.ecoid!,
        customerCode,
      );
    }
    setLoading(false);

    if (billResponse.status === 'failed' && !electricBillState.searchedBills) {
      navigation.pop();
      navigation.navigate('DncAddNewCustomerCodeScreen', {
        backScreen: 'UserProfile',
      });
    }
  }

  function onItemDeleteHandle(customerCode: string) {
    const totalCode = uniqueCodes.length;
    electricBillActions.removeSearchedCode(customerCode);

    if (electricBillState.bills?.find(b => b.customerCode === customerCode)) {
      setCodeDeleting(customerCode);
      setDeletingCodeModalVisible(true);
    } else if (totalCode === 1) {
      navigation.navigate('DncAddNewCustomerCodeScreen', {
        backScreen: 'UserProfile',
      });
    }
  }

  function onItemDeleteConfirmClick(code?: string) {
    if (!code) return;
    electricBillActions.removeSavedCode(code);
    dncEcoidApi.deleteCustomerCode(userState.user?.ecoid!, code);
    setDeletingCodeModalVisible(false);
    setIsDeletingSuccessModalVisible(true);
  }

  function onItemDeleteSuccessful() {
    setIsDeletingSuccessModalVisible(false);
    if (uniqueCodes.length === 0)
      navigation.navigate('DncAddNewCustomerCodeScreen', {
        backScreen: 'UserProfile',
      });
  }

  useEffect(() => {
    fetchBillsByEcoid();
  }, [electricBillState.lastLoadBills]);

  return (
    <>
      {loading && <Loader style={styles.loading} />}

      {!loading && (
        <View style={styles.container}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text
              fontSize="small"
              color="darkGrey"
              numberOfLines={2}
              style={styles.note}
            >
              {i18n.t('features.electricBill.customerCodeNote')}
            </Text>

            {uniqueCodes.map(customerCode => {
              return (
                <CustomerCodeItem
                  key={customerCode}
                  navigation={navigation}
                  customerCode={customerCode}
                  allBills={allBills}
                  onItemDeleteHandle={onItemDeleteHandle}
                />
              );
            })}
          </ScrollView>

          <Button
            type="primary"
            title={i18n.t('features.electricBill.addCustomerCode')}
            onPress={() => navigation.navigate('DncAddNewCustomerCodeScreen')}
            uppercase={false}
            icon="add-circle-outline"
          />
        </View>
      )}

      <DeletingCustomerCodeSuccessful
        visible={isDeletingSuccessModalVisible}
        onClose={() => onItemDeleteSuccessful()}
        code={codeDeleting}
      />

      <DeletingCustomerCodeModal
        visible={isDeletingCodeModalVisible}
        onClose={() => setDeletingCodeModalVisible(false)}
        onDelete={onItemDeleteConfirmClick}
        code={codeDeleting}
      />
    </>
  );
}
