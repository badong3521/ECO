import { RefreshControl, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withNavigation } from 'react-navigation';
import { applicationColors } from '../../../../../../../style.css';
import EcoIdBusCardApi from '../../../../../../services/api/ecoIdBusCard';
import Button from '../../../../../../components/Button';
import { useBusCardState } from '../../../../reducers/busCard';
import NoneResidentCards from '../NoneResidentCards';
import ResidentCards from '../ResidentCards';
import EmptyState from '../EmptyState';
import styles from './style.css';

const busCardApi = new EcoIdBusCardApi();

interface Props {
  navigation: any;
}
function BusCardsList(props: Props) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [notEcoId, setNotEcoId] = useState<boolean>(false);
  const [busCardState] = useBusCardState();
  const canExtendCard =
    (busCardState.busCardStats?.residenceCards &&
      busCardState.busCardStats?.residenceCards?.length > 0) ||
    (busCardState.busCardStats?.syncedBusCards &&
      busCardState.busCardStats?.syncedBusCards?.length > 0);

  function onSyncPress() {
    navigation.navigate('SyncEcoIdBusCardScreen');
  }

  async function fetchBusCards() {
    setLoading(true);
    const res = await busCardApi.fetchBusCards();
    setLoading(false);
    if (res.status === 'failed' && res.statusCode === 404) {
      setNotEcoId(true);
    }
  }

  useEffect(() => {
    fetchBusCards();
  }, [busCardState.lastReload]);

  return (
    <View style={styles.fill}>
      <ScrollView
        style={styles.fill}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchBusCards} />
        }
        contentContainerStyle={styles.scrollView}
      >
        {!loading && notEcoId && (
          <View style={styles.emptyState}>
            <EmptyState
              message={i18n.t('features.busScreen.busCardScreen.noneEcoId')}
              buttonTitle={i18n.t('features.busScreen.busCardScreen.contact')}
              buttonPress={() => navigation.navigate('HelpDeskScreen')}
            />
          </View>
        )}
        {!loading && !notEcoId && !busCardState.busCardStats?.isResident && (
          <NoneResidentCards
            onSyncPress={onSyncPress}
            i18n={i18n}
            busCardStats={busCardState.busCardStats}
          />
        )}
        {!loading && !notEcoId && busCardState.busCardStats?.isResident && (
          <ResidentCards
            navigation={navigation}
            busCardStats={busCardState.busCardStats}
            i18n={i18n}
          />
        )}
      </ScrollView>

      {!loading && canExtendCard && (
        <View style={styles.buttonContainer}>
          {!busCardState.busCardStats?.isResident && (
            <Button
              style={styles.button}
              uppercase={false}
              containerStyle={styles.syncButton}
              type="primary"
              color={applicationColors.secondary.shade500}
              title={i18n.t('features.busScreen.busCardScreen.syncCard')}
              onPress={onSyncPress}
            />
          )}
          <Button
            containerStyle={styles.fill}
            style={styles.extendButton}
            uppercase={false}
            type="primary"
            title={i18n.t('features.busScreen.busCardScreen.extendCard')}
            onPress={() => {
              navigation.navigate('ExtendBusCardScreen');
            }}
          />
        </View>
      )}
    </View>
  );
}

export default withNavigation(BusCardsList);
