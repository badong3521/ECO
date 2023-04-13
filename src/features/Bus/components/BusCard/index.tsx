import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
import React from 'react';
import { UseTranslationResponse } from 'react-i18next';
import moment from 'moment';
import { applicationColors } from '../../../../../style.css';
import CircleSvg from '../../../../assets/bus/bus_card/circle.svg';
import Heading from '../../../../components/Heading';
import Text from '../../../../components/Text';
import { BusCardV2Type } from '../../../../services/api/types/busCardType';
import date from '../../../../utils/date';
import {
  checkFreeCard,
  checkLockedCard,
  checkOutOfRemainingTrip,
  checkInvalidStartDate,
  checkExpiredByDate,
} from '../../utils/index';
import styles from './style.css';
import IconButton from '../../../../components/IconButton';
import { getNumberString } from '../../../../utils/number';
import IconComponent from '../../../../components/Icon';
import TouchableComponent from '../../../../components/TouchableComponent';

interface BusCardProps {
  index: number;
  busCard: BusCardV2Type;
  i18n: UseTranslationResponse;
  editable?: boolean;
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  onChangeQuantity?: (valueChanged: number) => void;
  onChangeMonthPress?: (busCard: BusCardV2Type) => void;
}
export default function BusCard(props: BusCardProps) {
  const {
    index,
    busCard,
    i18n,
    editable,
    checked,
    onCheckedChange,
    onChangeQuantity,
    onChangeMonthPress,
  } = props;

  const isFreeCard = checkFreeCard(busCard);
  const isLocked = checkLockedCard(busCard);
  const isOutOfRemainingTrip = checkOutOfRemainingTrip(busCard);
  const isInvalidStartDate = checkInvalidStartDate(busCard);
  const isExpiredByDate = checkExpiredByDate(busCard);
  const isInactiveByDate = isInvalidStartDate || isExpiredByDate;

  const isInactive = isLocked || isOutOfRemainingTrip || isInactiveByDate;

  const tagName =
    (isLocked && i18n.t('features.busScreen.busCardScreen.detail.isLocked')) ||
    (isOutOfRemainingTrip &&
      i18n.t('features.busScreen.busCardScreen.detail.outOfRemainingTrip')) ||
    (isInvalidStartDate &&
      i18n.t('features.busScreen.busCardScreen.detail.invalidStartDate')) ||
    (isExpiredByDate &&
      i18n.t('features.busScreen.busCardScreen.detail.expiredByDate')) ||
    (isFreeCard && i18n.t('features.busScreen.busCardScreen.detail.isFree')) ||
    (!isInactive &&
      editable &&
      i18n.t('features.busScreen.busCardScreen.detail.active')) ||
    busCard.ticketName;

  const fromDate = date.getDateString(
    busCard.startExtendFrom,
    date.MOMENT_FORMATS.MONTH_FULL,
  );
  function renderValueColumn(title: string, value: string) {
    return (
      <View style={{ flex: 1 }}>
        <Text bold="bold" color="white" fontSize="small" style={styles.label}>
          {title || ''}
        </Text>

        <Text bold="bold" color="white" style={styles.value}>
          {value || ''}
        </Text>
      </View>
    );
  }

  return (
    <View key={index} style={styles.container}>
      <LinearGradient
        colors={getCardColors(busCard, isInactive, isLocked)}
        end={{ x: 0, y: 1 }}
        start={{ x: 0, y: -0.3 }}
        angle={103.02}
        style={styles.background}
      />
      <CircleSvg style={styles.circle} />
      <Heading style={styles.fullName} size="h4" bold="bold" numberOfLines={1}>
        {busCard.fullName || ''}
      </Heading>
      <Text bold="bold" style={styles.cardNumber}>
        {busCard.cardNumber}
      </Text>

      {editable && busCard.canSelectStartExtend && (
        <Text color="white" style={styles.startFrom} numberOfLines={1}>
          {i18n.t('features.busScreen.busCardScreen.detail.startFrom')}
        </Text>
      )}

      {editable && !isFreeCard && (
        <View style={styles.editContainer}>
          {busCard.cardType === 'COMBO' || !busCard.canSelectStartExtend ? (
            <Text style={styles.match} color="white" numberOfLines={2}>
              {busCard.ticketName}
            </Text>
          ) : (
            <View style={styles.match}>
              <TouchableComponent onPress={() => onChangeMonthPress!(busCard)}>
                <View style={styles.dropdownContainer}>
                  <Text color="white">
                    {`${fromDate.charAt(0).toUpperCase()}${fromDate.substr(1)}`}
                  </Text>
                  <IconComponent
                    style={styles.arrow}
                    size={12}
                    name="chevron-down"
                    iconPack="feather"
                    color={applicationColors.primary.white}
                  />
                </View>
              </TouchableComponent>
            </View>
          )}
          <IconButton
            iconSize={15}
            type="circle"
            iconName="minus"
            iconColor={applicationColors.neutral.shade900}
            iconPack="feather"
            onPress={() => onChangeQuantity!(-1)}
          />
          <View style={styles.amountContainer}>
            <Text bold="bold" color="white">
              {busCard.amount!.toString()}
            </Text>
          </View>
          <IconButton
            iconSize={15}
            type="circle"
            iconName="plus"
            iconColor={applicationColors.neutral.shade900}
            iconPack="feather"
            onPress={() => onChangeQuantity!(1)}
          />
        </View>
      )}

      <View style={styles.row}>
        {!editable &&
          isInactiveByDate &&
          renderValueColumn(
            i18n.t(`features.busScreen.busCardScreen.detail.validStart`),
            date.getDateString(busCard.fromDate, date.MOMENT_FORMATS.FULL_DATE),
          )}

        {!editable &&
          renderValueColumn(
            i18n.t(`features.busScreen.busCardScreen.detail.validUntil`),
            date.getDateString(busCard.toDate, date.MOMENT_FORMATS.FULL_DATE),
          )}

        {editable &&
          renderValueColumn(
            i18n.t(`features.busScreen.busCardScreen.detail.validUntil`),
            getValidUntil(busCard),
          )}

        {!editable &&
          busCard.cardType === 'COMBO' &&
          renderValueColumn(
            i18n.t('features.busScreen.busCardScreen.detail.tripRemaining'),
            busCard.numberOfAccess?.toString() || '',
          )}

        {editable &&
          !isFreeCard &&
          renderValueColumn(
            i18n.t('features.busScreen.busCardScreen.detail.total'),
            `${getNumberString(busCard.amount! * busCard.fee, 'en')} VNĐ`,
          )}

        {editable &&
          isFreeCard &&
          renderValueColumn(
            i18n.t('features.busScreen.busCardScreen.detail.freeCard'),
            '',
          )}
      </View>

      {editable && isFreeCard ? (
        <View style={styles.checkboxContainer}>
          {onCheckedChange && (
            <IconButton
              type="square"
              iconName={checked ? 'check' : ''}
              iconPack="feather"
              style={{ width: 30, height: 30 }}
              onPress={() => onCheckedChange(!checked)}
            />
          )}
        </View>
      ) : (
        <View style={styles.tag}>
          <Text fontSize="tiny" color="white" numberOfLines={1}>
            {tagName.toString()}
          </Text>
        </View>
      )}
    </View>
  );
}

const CARD_COLORS = {
  inactive: [
    applicationColors.neutral.shade500,
    applicationColors.neutral.shade500,
  ],
  free: ['#7A5BF5', '#5917C4'],
  combo: ['#4B8FF3', '#3648E9'],
  monthly: ['#92C373', '#34AB39'],
};

function getCardColors(
  busCard: BusCardV2Type,
  isInactive: boolean,
  isLocked: boolean,
) {
  if (isInactive || isLocked) return CARD_COLORS.inactive;
  if (checkFreeCard(busCard)) return CARD_COLORS.free;
  if (busCard.cardType === 'COMBO') return CARD_COLORS.combo;
  return CARD_COLORS.monthly;
}

function getValidUntil(busCard: BusCardV2Type) {
  const toDate = moment(busCard.toDate).toDate();
  const currentDate = new Date();

  if (checkFreeCard(busCard)) {
    const shiftMonth = toDate < currentDate ? 1 : 2;
    toDate.setFullYear(
      currentDate.getFullYear(),
      currentDate.getMonth() + shiftMonth,
      0,
    );
    return date.getDateString(toDate, date.MOMENT_FORMATS.FULL_DATE);
  }

  if (busCard.cardType === 'COMBO' && busCard.amount) {
    toDate.setFullYear(
      currentDate.getFullYear(),
      currentDate.getMonth() + busCard.extendMonth,
      currentDate.getDate() - 1,
    );
  }

  if (busCard.cardType === 'MONTHY' && busCard.amount) {
    if (busCard.canSelectStartExtend) {
      const selectedMonth = moment(busCard.startExtendFrom).toDate();
      toDate.setFullYear(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + busCard.amount,
        0,
      );
    } else {
      toDate.setMonth(toDate.getMonth() + busCard.amount + 1, 0);
    }
  }

  return date.getDateString(toDate, date.MOMENT_FORMATS.FULL_DATE);
}
