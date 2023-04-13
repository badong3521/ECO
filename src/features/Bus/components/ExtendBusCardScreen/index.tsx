import { View } from 'react-native';
import React, { useState } from 'react';
import { TabView } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import BusCardTabBar from '../BusCardScreen/components/BusCardTabBar';
import ExtendFreeBusCardsList from './components/ExtendFreeBusCardsList';
import EmptyState from '../BusCardScreen/components/EmptyState';
import { useBusCardState } from '../../reducers/busCard';
import {
  BusCardStats,
  BusCardV2Type,
} from '../../../../services/api/types/busCardType';
import {
  checkFreeCardRenewable,
  checkLockedCard,
  checkFreeCard,
} from '../../utils/index';
import ExtendChargeBusCardsListList from './components/ExtendChargeBusCardsList';

interface ExtendBusCardScreenProps {
  navigation: any;
}
export default function ExtendBusCardScreen(props: ExtendBusCardScreenProps) {
  const { navigation } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const i18n = useTranslation();
  const [busCardState] = useBusCardState();
  const freeCards = getFreeCards(busCardState.busCardStats);
  const chargeCards = getChargeCards(busCardState.busCardStats);
  const hasTab = freeCards.length > 0 && chargeCards.length > 0;

  function renderTab(key: string) {
    if (key === 'freeCards') {
      return (
        <ExtendFreeBusCardsList
          navigation={navigation}
          freeCards={freeCards}
          i18n={i18n}
        />
      );
    }
    return (
      <ExtendChargeBusCardsListList
        i18n={i18n}
        chargeCards={chargeCards}
        navigation={navigation}
      />
    );
  }

  return (
    <View style={styles.root}>
      {hasTab ? (
        <TabView
          renderTabBar={tabProps => {
            return hasTab ? <BusCardTabBar tabProps={tabProps} /> : undefined;
          }}
          navigationState={{
            index: currentTab,
            routes: TABS.map((tab: string) => ({
              key: tab,
              title: i18n.t(`features.busScreen.extendBusCard.tab.${tab}`),
            })),
          }}
          renderScene={scene => renderTab(scene.route.key)}
          onIndexChange={index => {
            setCurrentTab(index);
          }}
        />
      ) : (
        renderTab(freeCards.length > 0 ? 'freeCards' : 'charge')
      )}

      {chargeCards &&
        chargeCards.length === 0 &&
        freeCards &&
        freeCards.length === 0 && (
          <EmptyState
            message={i18n.t('features.busScreen.extendBusCard.noCardExtend')}
          />
        )}
    </View>
  );
}

const TABS = ['freeCards', 'charge'];

function getFreeCards(stats?: BusCardStats): BusCardV2Type[] {
  if (!stats) return [];

  let results: BusCardV2Type[] = [];

  if (stats.isResident) {
    stats.residenceCards?.forEach(residences => {
      if (residences.cards) {
        results = results.concat(
          residences.cards.filter(c => checkFreeCardRenewable(c)),
        );
      }
    });
  } else if (stats.syncedBusCards) {
    results = stats.syncedBusCards.filter(card => checkFreeCardRenewable(card));
  }

  return getUniqCardsByContractID(results);
}

function getChargeCards(stats?: BusCardStats): BusCardV2Type[] {
  if (!stats) return [];

  let results: BusCardV2Type[] = [];

  if (stats.isResident) {
    stats.residenceCards?.forEach(residences => {
      if (residences.cards) {
        results = results.concat(
          residences.cards.filter(
            c => !checkLockedCard(c) && !checkFreeCard(c),
          ),
        );
      }
    });
  } else if (stats.syncedBusCards) {
    results = stats.syncedBusCards.filter(
      card => !checkLockedCard(card) && !checkFreeCard(card),
    );
  }

  return getUniqCardsByContractID(results);
}

function getUniqCardsByContractID(busCards: BusCardV2Type[]) {
  return busCards.filter(
    (busCard, index) =>
      busCards.findIndex(c => c.contractBusId === busCard.contractBusId) ===
      index,
  );
}
