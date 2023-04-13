import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { applicationColors } from '../../../../../style.css';
import DirectoryScreenContainer from '../DirectoryScreenContainer';
import { CardType } from '../../../../components/Card/types';
import { START_PAGE } from '../../../../services/api/types/api';
import CardApi from '../../../../services/api/card';
import styles from './style.css';
import FeatureCards from '../../../../components/CardList/components/FeatureCards';
import BookmarkButton from '../DirectoryScreenContainer/components/BookmarkButton';
import Firebase from '../../../../services/firebase';

const cardApi = new CardApi();
interface PromotionCardsScreenProps {
  navigation: any;
}
export default function PromotionCardsScreen(props: PromotionCardsScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [featuredCards, setFeaturedCards] = useState<CardType[]>();
  const [page, setPage] = useState<number>(START_PAGE);
  const [data, setData] = useState<{
    totalPages: number;
    cards?: CardType[];
  }>({
    totalPages: START_PAGE,
  });

  function onFeaturedCardPress(card: CardType) {
    Firebase.track('view_featured_card_in_promotion_screen');
    navigation.navigate('CardScreen', { card });
  }

  async function fetchNewPromotionCards() {
    setLoading(true);
    const res = await cardApi.fetchCardPromotions({
      page: START_PAGE,
    });
    setLoading(false);
    if (res.status === 'success') {
      setPage(START_PAGE + 1);
      setData({
        totalPages: res.result.totalPages,
        cards: res.result.data,
      });
    }
  }
  async function fetchNextPromotionCards() {
    if (page > data.totalPages || loading) return;
    setLoading(true);
    const res = await cardApi.fetchCardPromotions({
      page,
    });
    setLoading(false);
    if (res.status === 'success') {
      setData({
        totalPages: res.result.totalPages,
        cards: data.cards?.concat(res.result.data),
      });
      setPage(page + 1);
    }
  }

  async function fetchFeaturedPromotionCards() {
    const res = await cardApi.fetchCardPromotionFeatured();
    if (res.status === 'success') {
      setFeaturedCards(res.result.data);
    } else {
      setFeaturedCards(undefined);
    }
  }

  function onRefresh() {
    fetchFeaturedPromotionCards();
    fetchNewPromotionCards();
  }

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View style={styles.root}>
      <DirectoryScreenContainer
        title={i18n.t('features.directory.promotions.promotions')}
        backgroundColor={applicationColors.primary.shade500}
        backgroundAspectRatio={2.8}
        cards={data.cards}
        onRefresh={onRefresh}
        refreshing={loading && page === START_PAGE}
        onEndReached={fetchNextPromotionCards}
        loading={loading && page > START_PAGE}
        fromOffset={40}
        toOffset={160}
        floatingRightHeader={() => (
          <View style={styles.bookmarkButtonContainer}>
            <BookmarkButton />
          </View>
        )}
      >
        {featuredCards ? (
          <FeatureCards
            cards={featuredCards}
            onCardPress={onFeaturedCardPress}
            style={styles.featuredCards}
          />
        ) : (
          <View />
        )}
      </DirectoryScreenContainer>
    </View>
  );
}
