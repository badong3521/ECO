import React from 'react';
import { View } from 'react-native';
import i18n from 'i18next';
import Icon from '../../../../components/Icon';
import IconButton from '../../../../components/IconButton';
import Text from '../../../../components/Text';
import TouchableComponent from '../../../../components/TouchableComponent';
import { BillType } from '../../../../services/api/types/dncEcoid';
import { extractUniqueBills } from '../../utils';

import styles from './style.css';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

interface Props {
  navigation: any;
  customerCode: string;
  allBills: BillType[];
  onItemDeleteHandle: (customerCode: string) => any;
}

export default function CustomerCodeItem(props: Props) {
  const { navigation, customerCode, allBills, onItemDeleteHandle } = props;
  const bill = allBills.find(b => b.customerCode === customerCode);
  const uniqueBillsById = extractUniqueBills(allBills);
  const totalBill = uniqueBillsById.filter(b => b.customerCode === customerCode)
    .length;
  const isItemDisabled = totalBill === 0;

  function handleItemClick() {
    if (isItemDisabled) return;
    navigation.navigate('DncListBillsByCustomerCodeScreen', { customerCode });
  }

  return (
    <View key={customerCode} style={styles.codeItem}>
      <View
        style={[styles.itemHeader, isItemDisabled && styles.itemHeaderDisabled]}
      >
        <Text
          style={styles.customerCode}
          bold="bold"
          color={isItemDisabled ? 'disabled' : 'white'}
        >
          {customerCode}
        </Text>

        <IconButton
          type="clear"
          iconName="close"
          padding={5}
          onPress={() => onItemDeleteHandle(customerCode)}
          iconColor={
            isItemDisabled
              ? applicationColors.disabled.text
              : applicationColors.primary.white
          }
        />
      </View>

      <TouchableComponent onPress={handleItemClick}>
        <View style={styles.itemContent}>
          <View style={styles.contentGroup}>
            <Icon
              name="account-circle"
              size={applicationDimensions.iconSize}
              color={applicationColors.neutral.shade500}
            />
            <Text
              style={styles.contentText}
              color={isItemDisabled ? 'disabled' : undefined}
            >
              {bill?.customerName || ''}
            </Text>
          </View>

          <View style={styles.contentGroup}>
            <Icon
              name="location-on"
              size={applicationDimensions.iconSize}
              color={applicationColors.neutral.shade500}
            />
            <Text
              style={styles.contentText}
              color={isItemDisabled ? 'disabled' : undefined}
            >
              {bill?.customerAddress || ''}
            </Text>
          </View>

          <View style={styles.contentGroup}>
            <Icon
              name="receipt"
              size={applicationDimensions.iconSize}
              color={applicationColors.neutral.shade500}
            />
            <Text
              style={styles.contentText}
              color={isItemDisabled ? 'disabled' : undefined}
            >
              {i18n.t(
                `features.electricBill.${
                  totalBill > 1 ? 'totalBills' : 'totalBill'
                }`,
                {
                  total: totalBill.toString(),
                },
              )}
            </Text>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
}
