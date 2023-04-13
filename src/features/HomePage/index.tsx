import React, { useEffect, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  StatusBar,
  View,
} from 'react-native';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useUserState } from '../User/reducers';
import { useHomePageState } from './reducers';
import styles, { contentMarginTop } from './style.css';
import {
  CardType,
  CategoryType,
  MerchantType,
} from '../../components/Card/types';
import CardApi from '../../services/api/card';
import Firebase from '../../services/firebase';
import Greeting from '../../components/Greeting';
import { applicationColors, applicationDimensions } from '../../../style.css';
import MerchantCategoriesList from './components/MerchantCategoriesList';
import FeatureCards from '../../components/CardList/components/FeatureCards';
import CardNews from '../../components/Card/components/CardNews';
import CardEvent from '../../components/Card/components/CardEvent';
import SectionTitle from './components/SectionTitle';
import { START_PAGE } from '../../services/api/types/api';
import useFocusEffect from '../../utils/hooks/useFocusEffect';
import useStatusBar from '../../utils/hooks/useStatusBar';
import navigationService from '../../services/navigationService';
import { newsWidth } from '../../components/Card/components/CardNews/style.css';
import RemindersCard from './components/RemindersCard';
import HomeBackground from './components/HomeBackground';
import ReminderApi from '../../services/api/reminder';
import BookmarkApi from '../../services/api/bookmark';
import TooltipApi from '../../services/api/tooltip';
import EcoIdApi from '../../services/api/ecoId';
import VaccineRegistrationBanner from '../VaccineRegistration/components/Banner';
import DncEcoidApi from '../../services/api/dncEcoid';
import { useElectricBillState } from '../ElectricBillScreen/reducers';
import { ReminderType } from '../../services/api/types/reminder';

const NEWS_WIDTH = newsWidth + applicationDimensions.defaultPadding + 5;
const scrollOffset = 200; // will change status bar at this position
const cardApi = new CardApi();
const reminderApi = new ReminderApi();
const dncEcoidApi = new DncEcoidApi();

interface LandingScreenProps {
  navigation: any;
}

let contentOffsetY: number = 0;

export default function HomePageScreen(props: LandingScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  // User state
  const [userState] = useUserState();
  const { user, userLanguage } = userState;
  // Homepage state
  const [homepageState, homepageActions] = useHomePageState();
  const [electricBillState] = useElectricBillState();
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [bannerShow, setBannerShow] = useState<boolean>(false);
  const bookmarkApi = new BookmarkApi();
  const tooltipApi = new TooltipApi();
  const ecoIdApi = new EcoIdApi();
  const allDncBills = [
    ...(electricBillState.bills || []),
    ...(electricBillState.searchedBills || []),
  ].filter(b => !!b.billId);
  const totalDncBills = [...new Set(allDncBills.map(bill => bill.billId))]
    .length;

  const reminders: ReminderType[] | undefined =
    totalDncBills > 0
      ? [
          ...(homepageState.reminders || []),
          {
            type: 'electricBill',
            totalBill: totalDncBills,
          } as ReminderType,
        ]
      : homepageState.reminders;

  function onFeaturedCardPress(card: CardType) {
    Firebase.track('view_featured_card_in_merchant_screen');
    navigation.push('CardScreen', {
      card,
    });
  }
  function onCardPress(card: CardType) {
    Firebase.track('view_card_from_home_screen', {
      value: card.id,
    });
    navigation.push('CardScreen', {
      card,
    });
  }

  function onCardMerchantPress(merchantType?: MerchantType) {
    if (merchantType) {
      navigationService.navigate('CardScreen', {
        card: {
          id: merchantType.profileCard.id,
          type: 'CardMerchant',
        },
      });
    }
  }

  function onViewAllCategoriesPress() {
    navigation.navigate('AllMerchantScreen');
  }

  function onViewAllEventsPress() {
    navigation.navigate('EventCardsScreen');
  }

  function onViewAllNewsPress() {
    navigation.navigate('NewsCardsScreen');
  }

  function onCategoryPress(category: CategoryType) {
    if (category.name.en === 'Promotions') {
      navigation.navigate('PromotionCardsScreen');
    } else {
      navigation.navigate('MerchantCategoryScreen', { category });
    }
  }

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    // IOS doesn't allow StatusBar.setBackgroundColor
    if (Platform.OS === 'android') {
      if (event.nativeEvent.contentOffset.y > contentMarginTop) {
        StatusBar.setBackgroundColor('white', false);
      } else {
        StatusBar.setBackgroundColor('transparent', false);
      }
      contentOffsetY = event.nativeEvent.contentOffset.y;
    } else {
      setBackgroundOpacity(
        event.nativeEvent.contentOffset.y > contentMarginTop ? 0 : 1,
      );
    }
  }

  function fetchDncBills() {
    if (userState?.user?.ecoid) {
      dncEcoidApi.getBillByEcoid(userState.user?.ecoid!);
      if (electricBillState.searchedBills) {
        const { customerCode } = electricBillState.searchedBills[0];
        dncEcoidApi.getBillsByCustomerCode(
          userState.user?.ecoid!,
          customerCode,
        );
      }
    }
  }

  // fetch all data on starting
  async function fetchData() {
    setLoading(true);
    reminderApi.fetchReminders();
    fetchDncBills();
    await Promise.all([
      cardApi.fetchCardFeatured({
        page: START_PAGE,
      }),
      cardApi.fetchCardNews(
        {
          page: START_PAGE,
        },
        true,
      ),
      cardApi.fetchCardEvents({
        page: START_PAGE,
      }),
      cardApi.fetchCategories(),
      // fetch current special events
      cardApi.fetchCardEvents({
        page: START_PAGE,
        perPage: 2,
        isSpecial: true,
      }),
      tooltipApi.fetchTooltips(),
      fetchVaccineRegistrationStatus(),
    ]);
    setLoading(false);
  }

  async function fetchVaccineRegistrationStatus() {
    const res = await ecoIdApi.fetchVaccineRegistrationStatus();
    if (res.status === 'success' && res.result.data.isRegistrationActived) {
      setBannerShow(true);
    } else {
      setBannerShow(false);
    }
  }

  useEffect(() => {
    bookmarkApi.fetchOverview();
    homepageActions.setReminders([]);
    fetchData();
    if (!user?.reachedAppOnboardingScreen) {
      navigation.push('HomeDirectoryOnboarding');
    }
  }, []);

  useFocusEffect(() => {
    if (Platform.OS === 'android') {
      if (contentOffsetY > scrollOffset) {
        StatusBar.setBackgroundColor('white', false);
      } else {
        StatusBar.setBackgroundColor('transparent', false);
      }
    }
  });

  useStatusBar('dark-content');

  return (
    <View style={styles.root}>
      <HomeBackground
        style={{
          opacity: backgroundOpacity,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        directionalLockEnabled={false}
        disableScrollViewPanResponder={Platform.OS === 'android'}
        nestedScrollEnabled
        removeClippedSubviews={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchData} />
        }
        onScroll={onScroll}
      >
        <View style={styles.stickContainer}>
          <Greeting
            color={applicationColors.primary.white}
            title={user?.firstName}
            subTitle={getGreetingMessage(i18n)}
            logo
          />
        </View>

        {reminders && reminders.length > 0 && (
          <RemindersCard reminders={reminders!} />
        )}
        <View style={styles.contentContainer}>
          {homepageState.categories ? (
            <MerchantCategoriesList
              onCategoryPress={onCategoryPress}
              onViewAllPress={onViewAllCategoriesPress}
              categories={homepageState.categories}
              language={userState.userLanguage}
              i18n={i18n}
            />
          ) : (
            <View style={styles.emptyBackground} />
          )}

          {bannerShow && (
            <VaccineRegistrationBanner
              navigation={navigation}
              userLanguage={userLanguage}
            />
          )}

          {homepageState.features && (
            <FeatureCards
              cards={homepageState.features}
              onCardPress={onFeaturedCardPress}
            />
          )}
          {homepageState.news && (
            <SectionTitle
              title={i18n.t('features.home.yourDailyRead')}
              onViewMorePress={onViewAllNewsPress}
              i18n={i18n}
            />
          )}
          {homepageState.news && (
            <FlatList
              horizontal
              contentContainerStyle={styles.newsContainer}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              data={homepageState.news}
              snapToInterval={NEWS_WIDTH}
              snapToAlignment="start"
              disableIntervalMomentum
              decelerationRate="fast"
              getItemLayout={(data, index) => ({
                length: NEWS_WIDTH,
                offset: NEWS_WIDTH * index,
                index,
              })}
              renderItem={item => (
                <CardNews
                  card={item.item}
                  onCardPress={onCardPress}
                  onCardMerchantPress={onCardMerchantPress}
                  i18n={i18n}
                  type="box"
                />
              )}
            />
          )}
          {homepageState.events && (
            <SectionTitle
              title={i18n.t('features.home.happeningInEcopark')}
              onViewMorePress={onViewAllEventsPress}
              i18n={i18n}
            />
          )}
          {homepageState.events && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              data={homepageState.events}
              pagingEnabled
              renderItem={item => (
                <CardEvent
                  card={item.item}
                  onCardPress={onCardPress}
                  onCardMerchantPress={onCardMerchantPress}
                  language={userState.userLanguage}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function getGreetingMessage(i18n: UseTranslationResponse): string {
  const currentTime = new Date();
  if (currentTime.getHours() < 12)
    return i18n.t('components.userStatusBar.goodMorning');
  if (currentTime.getHours() < 18)
    return i18n.t('components.userStatusBar.goodAfternoon');
  return i18n.t('components.userStatusBar.goodEvening');
}
