import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import PickedEventsCard from './components/PickedEventsCard';
import Text from '../../../../components/Text';
import { useHomePageState } from '../../../HomePage/reducers';
import { CardType } from '../../../../components/Card/types';
import CardApi from '../../../../services/api/card';
import { START_PAGE } from '../../../../services/api/types/api';
import DirectoryScreenContainer from '../DirectoryScreenContainer';
import { applicationColors } from '../../../../../style.css';
import Background from '../../../../assets/merchant/background.svg';
import navigationService from '../../../../services/navigationService';
import Firebase from '../../../../services/firebase';
import useStatusBar from '../../../../utils/hooks/useStatusBar';
import BookmarkButton from '../DirectoryScreenContainer/components/BookmarkButton';

const cardApi = new CardApi();
export default function EventCardsScreen() {
  const [homepageState] = useHomePageState();
  const i18n = useTranslation();
  const [data, setData] = useState<{
    totalPage: number;
    cards?: CardType[];
  }>({
    totalPage: 1,
    cards: homepageState.events,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(START_PAGE);

  function onCardPress(card: CardType) {
    Firebase.track('view_card_special_event', { value: card.id });
    navigationService.navigate('CardScreen', { card });
  }

  async function fetchEventCards(pageNumber: number) {
    if (pageNumber > data.totalPage) return;
    setLoading(true);
    const res = await cardApi.fetchCardEvents({ page: pageNumber });
    setLoading(false);
    if (res.status === 'success') {
      setPage(pageNumber);
      if (pageNumber === START_PAGE) {
        setData({
          totalPage: res.result.totalPages,
          cards: res.result.data,
        });
      } else {
        setData({
          totalPage: res.result.totalPages,
          cards: data.cards!.concat(res.result.data),
        });
      }
    }
  }

  async function fetchSpecialEvents() {
    await cardApi.fetchCardEvents({
      page: START_PAGE,
      isSpecial: true,
      perPage: 2,
    });
  }

  function onRefresh() {
    fetchEventCards(START_PAGE);
    fetchSpecialEvents();
  }

  useEffect(() => {
    fetchSpecialEvents();
    fetchEventCards(START_PAGE);
  }, []);

  useStatusBar('dark-content');

  return (
    <View style={styles.root}>
      <DirectoryScreenContainer
        title={i18n.t('features.directory.event.events')}
        backgroundColor={applicationColors.primary.shade500}
        background={
          <Background width="100%" height="100%" preserveAspectRatio="none" />
        }
        backgroundAspectRatio={1.5}
        cards={data.cards}
        onRefresh={onRefresh}
        refreshing={loading}
        onEndReached={() => fetchEventCards(page + 1)}
        loading={loading}
        fromOffset={40}
        toOffset={160}
        floatingRightHeader={() => (
          <View style={styles.bookmarkButtonContainer}>
            <BookmarkButton />
          </View>
        )}
      >
        <View style={styles.header}>
          <PickedEventsCard
            onCardPress={onCardPress}
            i18n={i18n}
            events={homepageState.specialEvents?.slice(
              0,
              Math.min(2, homepageState.specialEvents?.length),
            )}
          />
          <Text style={styles.title} bold="bold">
            {i18n.t('features.directory.event.onGoingEvent')}
          </Text>
        </View>
      </DirectoryScreenContainer>
    </View>
  );
}
