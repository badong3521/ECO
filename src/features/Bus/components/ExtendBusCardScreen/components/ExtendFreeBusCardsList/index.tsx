import { FlatList, View } from 'react-native';
import { UseTranslationResponse } from 'react-i18next';
import React, { useState } from 'react';
import BusCard from '../../../BusCard';
import { BusCardV2Type } from '../../../../../../services/api/types/busCardType';
import styles from './style.css';
import Button from '../../../../../../components/Button';
import EcoIdBusApi, {
  ExtendChargeCardsParams,
} from '../../../../../../services/api/ecoIdBus';
import DialogManager from '../../../../../../components/Dialog/manager';
import { useBusCardState } from '../../../../reducers/busCard';

interface ExtendFreeBusCardsListProps {
  i18n: UseTranslationResponse;
  freeCards: BusCardV2Type[];
  navigation: any;
}

const ecoIdBus = new EcoIdBusApi();

export default function ExtendFreeBusCardsList(
  props: ExtendFreeBusCardsListProps,
) {
  const { i18n, freeCards, navigation } = props;
  const [loading, setLoading] = useState(false);
  const [, busCardActions] = useBusCardState();
  const [selectedCards, setSelectedCards] = useState<BusCardV2Type[]>(
    freeCards.map(c => ({
      ...c,
      checked: true,
    })),
  );

  async function onExtendPress() {
    setLoading(true);
    const res = await ecoIdBus.extendFreeBusCards(
      parseBusCardsToParams(selectedCards),
    );
    setLoading(false);
    if (res.status === 'success') {
      busCardActions.setLastReload(new Date().getMilliseconds());
      navigation.navigate('BusCardPaymentSuccessfulScreen', {
        nextScreen: 'BusCardScreen',
      });
    } else {
      DialogManager.showErrorDialog({
        error: res.errors || ' ',
        dismissible: true,
      });
    }
  }
  function onCheckedChange(checked: boolean, busCard: BusCardV2Type) {
    setSelectedCards(
      selectedCards.map(card => {
        return card.contractBusId === busCard.contractBusId
          ? {
              ...card,
              checked,
            }
          : card;
      }),
    );
  }
  return (
    <View style={styles.fill}>
      <FlatList
        contentContainerStyle={styles.list}
        renderItem={item => (
          <BusCard
            index={item.index}
            busCard={item.item}
            i18n={i18n}
            editable
            checked={item.item.checked}
            onCheckedChange={value => onCheckedChange(value, item.item)}
          />
        )}
        data={selectedCards}
        keyExtractor={item => item.contractBusId.toString()}
      />
      <View style={styles.bottom}>
        <Button
          uppercase={false}
          style={styles.button}
          type="primary"
          disable={!selectedCards.find(c => !!c.checked)}
          title={i18n.t('features.busScreen.extendBusCard.extendFree')}
          onPress={onExtendPress}
          loading={loading}
        />
      </View>
    </View>
  );
}

function parseBusCardsToParams(
  busCards: BusCardV2Type[],
): ExtendChargeCardsParams {
  return {
    busPayments: busCards
      .filter(card => !!card.checked)
      .map(card => ({
        contractBusId: card.contractBusId,
      })),
  };
}
