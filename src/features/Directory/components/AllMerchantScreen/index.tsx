import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStatusBar from '../../../../utils/hooks/useStatusBar';
import Text from '../../../../components/Text';
import { applicationColors } from '../../../../../style.css';
import IconButton from '../../../../components/IconButton';
import FeatureCards from '../../../../components/CardList/components/FeatureCards';
import { useHomePageState } from '../../../HomePage/reducers';
import MerchantCategoryItem from '../../../HomePage/components/MerchantCategoryItem';
import { useUserState } from '../../../User/reducers';
import IconComponent from '../../../../components/Icon';
import Background from '../../../../assets/merchant/background.svg';
import styles from './style.css';
import DirectoryScreenContainer from '../DirectoryScreenContainer';
import CardApi from '../../../../services/api/card';
import { CardType, CategoryType } from '../../../../components/Card/types';
import BookmarkButton from '../DirectoryScreenContainer/components/BookmarkButton';
import Firebase from '../../../../services/firebase';

interface PropTypes {
  navigation: any;
}

const BACKGROUND_ASPECT_RATIO = 375 / 184;

export default function AllMerchantScreen(props: PropTypes) {
  const { navigation } = props;
  const [homepageState] = useHomePageState();
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const cardApi = new CardApi();
  const [cards, setCards] = useState<CardType[]>();
  const [featuredCards, setFeaturedCards] = useState<CardType[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const i18n = useTranslation();

  function onSearchPress() {
    navigation.navigate('MerchantSearchScreen', {
      title: i18n.t('features.directory.allMerchants.title'),
    });
  }

  function onCategoryPress(category: CategoryType) {
    if (category.name.en === 'Promotions') {
      navigation.navigate('PromotionCardsScreen');
    } else {
      navigation.navigate('MerchantCategoryScreen', { category });
    }
  }

  function onFeaturedCardPress(card: CardType) {
    Firebase.track('view_featured_card_in_merchant_screen');
    navigation.navigate('CardScreen', { card });
  }

  async function fetchNext() {
    if (currentPage < totalPage) {
      setLoading(true);
      const res = await cardApi.fetchCardMerchant({ page: currentPage + 1 });
      setLoading(false);
      if (res.status === 'success') {
        setCurrentPage(currentPage + 1);
        setCards([...cards!, ...res.result.data]);
      }
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await Promise.all([
      cardApi.fetchCardMerchant({ page: 1 }),
      cardApi.fetchFeaturedMerchantCards(),
    ]).then(([cardRes, featuredRes]) => {
      if (cardRes.status === 'success') {
        setCards(cardRes.result.data);
        setCurrentPage(1);
        setTotalPage(cardRes.result.totalPages);
      } else {
        setCards(undefined);
      }
      if (featuredRes.status === 'success') {
        setFeaturedCards(featuredRes.result.data);
      } else {
        setFeaturedCards(undefined);
      }
    });
    setRefreshing(false);
  }

  useEffect(() => {
    onRefresh();
  }, []);

  useStatusBar('dark-content');

  return (
    <DirectoryScreenContainer
      title={i18n.t('features.directory.allMerchants.title')}
      subtitle={i18n.t('features.directory.allMerchants.subtitle')}
      backgroundColor={applicationColors.primary.shade500}
      background={
        <Background
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        />
      }
      backgroundAspectRatio={BACKGROUND_ASPECT_RATIO}
      rightHeader={
        <View style={styles.rightHeaderContainer}>
          <IconButton
            type="clear"
            iconColor={applicationColors.primary.black}
            iconSize={24}
            iconName="search"
            iconPack="feather"
            onPress={onSearchPress}
          />
          <View style={styles.bookmarkButtonContainer}>
            <BookmarkButton />
          </View>
        </View>
      }
      floatingRightHeader={() => (
        <View style={styles.floatingBookmarkButtonContainer}>
          <BookmarkButton />
        </View>
      )}
      cards={cards}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={fetchNext}
      loading={loading}
    >
      <TouchableWithoutFeedback onPress={onSearchPress}>
        <View style={styles.searchBar}>
          <IconComponent
            size={15}
            name="search"
            iconPack="feather"
            color={applicationColors.neutral.shade500}
            style={styles.searchBarIcon}
          />
          <Text fontSize="small" style={styles.searchBarText}>
            {i18n.t('features.directory.searchBarPlaceholder')}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {featuredCards && (
        <View style={styles.featureCardContainer}>
          <FeatureCards
            cards={featuredCards}
            onCardPress={onFeaturedCardPress}
          />
        </View>
      )}
      {homepageState.categories && (
        <FlatList
          contentContainerStyle={styles.categoryList}
          showsHorizontalScrollIndicator={false}
          data={homepageState.categories}
          renderItem={({ item: category }) => (
            <MerchantCategoryItem
              onPress={() => onCategoryPress(category)}
              title={category.name[userLanguage]}
              image={category.image}
              key={category.id.toString()}
              shadow
            />
          )}
          horizontal
        />
      )}
    </DirectoryScreenContainer>
  );
}
