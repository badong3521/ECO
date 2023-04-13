import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../../../components/Text';
import { useBusCardState } from '../../reducers/busCard';
import SelectCardItem from './components/SelectCardItem';
import { BusCardV2Type } from '../../../../services/api/types/busCardType';
import Button from '../../../../components/Button';
import EcoIdBusCardApi from '../../../../services/api/ecoIdBusCard';
import DialogManager from '../../../../components/Dialog/manager';
import styles from './style.css';

const ecoIdBusCardApi = new EcoIdBusCardApi();
interface SyncEcoIdBusCardScreenProps {
  navigation: any;
}
export default function SyncEcoIdBusCardScreen(
  props: SyncEcoIdBusCardScreenProps,
) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [busCardState, busCardActions] = useBusCardState();
  const syncedBusCards = busCardState.busCardStats?.syncedBusCards;
  const [selectedCards, setSelectedCards] = useState<BusCardV2Type[]>(
    syncedBusCards || [],
  );
  const [loading, setLoading] = useState(false);

  function onSelectCardChange(checked: boolean, busCard: BusCardV2Type) {
    if (checked) {
      setSelectedCards(selectedCards.concat(busCard));
    } else {
      setSelectedCards(
        selectedCards.filter(c => c.contractBusId !== busCard.contractBusId),
      );
    }
  }

  async function onContinuePress() {
    setLoading(true);
    const res = await ecoIdBusCardApi.syncBusCards({
      contractBusIds: selectedCards.map(c => c.contractBusId),
    });
    setLoading(false);
    if (res.status === 'success') {
      busCardActions.setLastReload(new Date().getMilliseconds());
      navigation.goBack();
    } else {
      DialogManager.showErrorDialog({
        error: res.errors,
      });
    }
  }

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text fontSize="large" bold="bold">
          {i18n.t('features.busScreen.syncBusCard.title')}
        </Text>
        <Text style={styles.desc} color="darkGrey">
          {i18n.t('features.busScreen.syncBusCard.desc')}
        </Text>

        {busCardState.busCardStats?.nonResidentCards?.map(item => (
          <SelectCardItem
            key={item.contractBusId.toString()}
            onSelectChanged={value => onSelectCardChange(value, item)}
            busCard={item}
            checked={
              !!selectedCards.find(c => c.contractBusId === item.contractBusId)
            }
          />
        ))}
      </ScrollView>
      <Button
        uppercase={false}
        type="primary"
        style={styles.button}
        title={i18n.t('actions.continue')}
        onPress={onContinuePress}
        disable={selectedCards.length === 0}
        loading={loading}
      />
    </View>
  );
}
