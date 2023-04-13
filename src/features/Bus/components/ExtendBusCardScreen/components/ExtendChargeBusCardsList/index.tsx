import { FlatList, View } from 'react-native';
import { UseTranslationResponse } from 'react-i18next';
import React, { useRef, useState } from 'react';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';
import BusCard from '../../../BusCard';
import { BusCardV2Type } from '../../../../../../services/api/types/busCardType';
import Text from '../../../../../../components/Text';
import Button from '../../../../../../components/Button';
import { getNumberString } from '../../../../../../utils/number';
import EcoIdBusApi, {
  ExtendChargeCardsParams,
} from '../../../../../../services/api/ecoIdBus';
import DialogManager from '../../../../../../components/Dialog/manager';
import styles from './style.css';
import date from '../../../../../../utils/date';

interface ExtendChargeBusCardsListListProps {
  i18n: UseTranslationResponse;
  chargeCards: BusCardV2Type[];
  navigation: any;
}

const ecoIdBusApi = new EcoIdBusApi();

export default function ExtendChargeBusCardsListList(
  props: ExtendChargeBusCardsListListProps,
) {
  const { i18n, chargeCards, navigation } = props;
  const [loading, setLoading] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const selectedCard = useRef<BusCardV2Type>();
  const [selectedCards, setSelectedCards] = useState<BusCardV2Type[]>(
    chargeCards.map(card => ({
      ...card,
      amount: 0,
      canSelectStartExtend: checkCanSelectStartExtend(card),
      startExtendFrom: getStartExtendableMonth(),
    })),
  );
  const totalPasses = getTotalPasses(selectedCards);

  async function onProceedPress() {
    setLoading(true);
    const res = await ecoIdBusApi.extendBusCards(
      parseBusCardsToParams(selectedCards),
    );
    setLoading(false);
    if (res.status === 'success') {
      navigation.navigate('EcoBusPaymentScreen', {
        paymentUrl: res.result.data.url,
      });
    } else {
      DialogManager.showErrorDialog({
        error: res.errors || ' ',
        dismissible: true,
      });
    }
  }

  function onChangeMonthPress(busCard: BusCardV2Type) {
    selectedCard.current = busCard;
    setShowMonthPicker(true);
  }
  function onChangeMonth(_event: any, month: Date) {
    setShowMonthPicker(false);
    if (!month) return;
    setSelectedCards(
      selectedCards.map(card => {
        return card.contractBusId === selectedCard.current?.contractBusId
          ? {
              ...card,
              startExtendFrom: date.getDateString(
                month,
                date.MOMENT_FORMATS.YEAR_MONTH,
              ),
            }
          : card;
      }),
    );
  }

  function onChangeQuantity(valueChanged: number, busCard: BusCardV2Type) {
    if (busCard.amount! + valueChanged < 0) return;
    setSelectedCards(
      selectedCards.map(card => {
        return card.contractBusId === busCard.contractBusId
          ? {
              ...card,
              amount: card.amount! + valueChanged,
            }
          : card;
      }),
    );
  }

  return (
    <View style={styles.fill}>
      <FlatList
        renderItem={item => (
          <BusCard
            index={item.index}
            busCard={item.item}
            i18n={i18n}
            editable
            onChangeQuantity={value => onChangeQuantity(value, item.item)}
            onChangeMonthPress={onChangeMonthPress}
          />
        )}
        data={selectedCards}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.contractBusId.toString()}
      />
      <View style={styles.bottom}>
        <View style={styles.row}>
          <Text style={styles.fill} color="grey">
            {i18n.t('features.busScreen.extendBusCard.total')}
          </Text>
          <Text bold="bold" style={styles.price}>
            {`${getNumberString(totalPasses[1], 'vn')} VNĐ`}
          </Text>
        </View>
        <Button
          uppercase={false}
          style={styles.button}
          type="primary"
          title={i18n.t('features.busScreen.extendBusCard.proceed')}
          disable={totalPasses[0] === 0 || totalPasses[1] === 0}
          onPress={onProceedPress}
          loading={loading}
        />
      </View>

      {showMonthPicker && (
        <MonthPicker
          onChange={onChangeMonth}
          value={moment(selectedCard.current?.startExtendFrom).toDate()}
          minimumDate={moment(getStartExtendableMonth()).toDate()}
        />
      )}
    </View>
  );
}

function getTotalPasses(busCards: BusCardV2Type[]): number[] {
  let total = 0;
  let amount = 0;
  if (busCards) {
    busCards.forEach(card => {
      if (card.amount) {
        total += card.amount;
        amount += card.amount * (card.fee || 0);
      }
    });
  }
  return [total, amount];
}

function parseBusCardsToParams(
  busCards: BusCardV2Type[],
): ExtendChargeCardsParams {
  const busCardsSelected = busCards.filter(card => !!card.amount);
  const params = busCardsSelected.map(card => {
    if (card.canSelectStartExtend) {
      return {
        contractBusId: card.contractBusId,
        amount: card.amount!,
        month: card.startExtendFrom,
      };
    }
    return {
      contractBusId: card.contractBusId,
      amount: card.amount!,
    };
  });

  return { busPayments: params };
}

function getStartExtendableMonth(): string {
  const currentDate = new Date();
  return date.getDateString(currentDate, date.MOMENT_FORMATS.YEAR_MONTH);
}

function checkCanSelectStartExtend(busCard: BusCardV2Type): boolean {
  const toDate = moment(busCard.toDate).toDate();
  const currentDate = new Date();

  if (
    busCard.isFree === 0 &&
    busCard.cardType === 'MONTHY' &&
    toDate < currentDate
  ) {
    return true;
  }
  return false;
}
