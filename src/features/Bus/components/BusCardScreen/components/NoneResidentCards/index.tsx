import React from 'react';
import { View } from 'react-native';
import { UseTranslationResponse } from 'react-i18next';
import BusCard from '../../../BusCard';
import { BusCardStats } from '../../../../../../services/api/types/busCardType';
import EmptyState from '../EmptyState';
import styles from '../../style.css';

interface NoneResidentCardsProps {
  busCardStats?: BusCardStats;
  i18n: UseTranslationResponse;
  onSyncPress: () => void;
}
function NoneResidentCards(props: NoneResidentCardsProps) {
  const { busCardStats, i18n, onSyncPress } = props;
  return (
    <View>
      {busCardStats?.syncedBusCards &&
        busCardStats.syncedBusCards.map((card, index) => (
          <BusCard index={index} busCard={card} i18n={i18n} />
        ))}

      {(!busCardStats?.syncedBusCards ||
        busCardStats?.syncedBusCards.length === 0) && (
        <View style={styles.emptyContainer}>
          <EmptyState
            message={i18n.t(
              'features.busScreen.busCardScreen.needSyncBusCardFirst',
            )}
            buttonPress={onSyncPress}
            buttonTitle={i18n.t('features.busScreen.busCardScreen.syncCard')}
          />
        </View>
      )}
    </View>
  );
}

export default React.memo(NoneResidentCards);
