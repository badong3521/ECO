import React from 'react';
import { View } from 'react-native';
import { UseTranslationResponse } from 'react-i18next';
import { useBusCardState } from '../../../../reducers/busCard';
import { useUserState } from '../../../../../User/reducers/index';
import BusCard from '../../../BusCard';
import { BusCardStats } from '../../../../../../services/api/types/busCardType';
import EmptyState from '../EmptyState';
import ResidenceInfo from '../ResidenceInfo';
import styles from '../../style.css';

interface ResidentCardsProps {
  busCardStats?: BusCardStats;
  i18n: UseTranslationResponse;
  navigation: any;
}
function ResidentCards(props: ResidentCardsProps) {
  const { busCardStats, i18n, navigation } = props;
  const [, busCardActions] = useBusCardState();
  const [userState] = useUserState();

  function onSyncEcoIDPressHandle() {
    navigation.navigate('EcoIdOnboardingScreen', {
      redirectAfterSuccess: 'BusCardScreen',
      successCallback: () =>
        busCardActions.setLastReload(new Date().getMilliseconds()),
    });
  }

  return (
    <View>
      {busCardStats?.residenceCards &&
        busCardStats.residenceCards.map((residence, residenceIndex) => {
          return (
            <View key={residence.locationCode}>
              {residenceIndex > 0 && <View style={styles.divider} />}
              <ResidenceInfo locationCode={residence.locationCode} />
              {residence.cards?.map((card, index) => (
                <BusCard index={index} busCard={card} i18n={i18n} />
              ))}
            </View>
          );
        })}

      {busCardStats?.residenceCards &&
        busCardStats?.residenceCards.length === 0 && (
          <View style={styles.emptyContainer}>
            {userState.user?.syncedEcoid ? (
              <EmptyState
                message={i18n.t(
                  'features.busScreen.busCardScreen.needResyncEcoId',
                )}
                buttonTitle={i18n.t('features.busScreen.busCardScreen.contact')}
                buttonPress={() => navigation.navigate('HelpDeskScreen')}
              />
            ) : (
              <EmptyState
                message={i18n.t(
                  'features.busScreen.busCardScreen.needSyncEcoIdFirst',
                )}
                buttonTitle={i18n.t(
                  'features.busScreen.busCardScreen.sycnEcoID',
                )}
                buttonPress={onSyncEcoIDPressHandle}
              />
            )}
          </View>
        )}
    </View>
  );
}

export default React.memo(ResidentCards);
