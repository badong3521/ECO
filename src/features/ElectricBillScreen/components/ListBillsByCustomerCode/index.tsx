import React from 'react';
import { ScrollView } from 'react-native';
import i18n from 'i18next';
import TextLink from '../../../../components/TextLink';
import { useElectricBillState } from '../../reducers';
import { extractUniqueBills } from '../../utils';
import BillDetails from '../BillDetails';

import styles from './style.css';
import { applicationColors } from '../../../../../style.css';

interface Props {
  navigation: any;
}

export default function ListBillsByCustomerCode(props: Props) {
  const { navigation } = props;
  const customerCode = navigation.getParam('customerCode');
  const [electricBillState] = useElectricBillState();
  const allBills = [
    ...(electricBillState.bills || []),
    ...(electricBillState.searchedBills || []),
  ];
  const uniqueBillsById = extractUniqueBills(allBills);
  const billByCustomerCode = uniqueBillsById.filter(
    b => b.customerCode === customerCode,
  );

  return (
    <ScrollView style={styles.container}>
      <TextLink
        fontSize="small"
        style={styles.note}
        onLinkPress={() => undefined}
        linkColor={applicationColors.primary.shade900}
      >
        {i18n.t('features.electricBill.listBills.note')}
      </TextLink>

      {billByCustomerCode.map(bill => <BillDetails bill={bill} navigation={navigation} inList />)}
    </ScrollView>
  );
}
