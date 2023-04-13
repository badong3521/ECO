import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import BookmarkApi from '../../services/api/bookmark';
import { CardType } from '../../components/Card/types';
import { ApiResType } from '../../services/api/types/api';
import { applicationColors } from '../../../style.css';
import DirectoryScreenContainer from '../Directory/components/DirectoryScreenContainer';
import useFocusEffect from '../../utils/hooks/useFocusEffect';
import { useUserState } from '../User/reducers';
import LuckyDrawApi from '../../services/api/luckyDraw';

// List all favorited cards
export default function BookmarkScreen() {
  const bookmarkApi = new BookmarkApi();
  const luckyDrawApi = new LuckyDrawApi();
  const i18n = useTranslation();
  const [userState, userActions] = useUserState();

  const [merchantCards, setMerchantCards] = useState<CardType[]>();
  const [currentMerchantPage, setCurrentMerchantPage] = useState<number>(1);
  const [totalMerchantPages, setTotalMerchantPages] = useState<number>(1);

  const [newsCards, setNewsCards] = useState<CardType[]>();
  const [currentNewsPage, setCurrentNewsPage] = useState<number>(1);
  const [totalNewsPages, setTotalNewsPages] = useState<number>(1);

  const [promotionCards, setPromotionCards] = useState<CardType[]>();
  const [currentPromotionPage, setCurrentPromotionPage] = useState<number>(1);
  const [totalPromotionPages, setTotalPromotionPages] = useState<number>(1);

  const [eventCards, setEventCards] = useState<CardType[]>();
  const [currentEventPage, setCurrentEventPage] = useState<number>(1);
  const [totalEventPages, setTotalEventPages] = useState<number>(1);

  const [luckyDraws, setLuckyDraws] = useState<CardType[]>();
  const [currentLuckyDrawPage, setCurrentLuckyDrawPage] = useState<number>(1);
  const [totalLuckyDrawPages, setTotalLuckyDrawPages] = useState<number>(1);

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const [tabs, setTabs] = useState(getTabs({}));

  function getTabs({
    merchantBookmarked = userState.bookmarkOverview?.merchantBookmarked,
    promotionBookmarked = userState.bookmarkOverview?.promotionBookmarked,
    newsBookmarked = userState.bookmarkOverview?.newsBookmarked,
    eventBookmarked = userState.bookmarkOverview?.eventBookmarked,
    lixiBookmarked = userState.bookmarkOverview?.lixiBookmarked,
  }) {
    return {
      ...(lixiBookmarked && {
        luckyDraws: {
          title: 'Lì xì Tết',
        },
      }),
      ...(merchantBookmarked && {
        merchants: { title: i18n.t('features.cardScreen.merchants') },
      }),
      ...(promotionBookmarked && {
        promotions: { title: i18n.t('features.cardScreen.promotions') },
      }),
      ...(newsBookmarked && {
        news: { title: i18n.t('features.cardScreen.news') },
      }),
      ...(eventBookmarked && {
        events: { title: i18n.t('features.cardScreen.events') },
      }),
    };
  }

  async function onEndReached() {
    const tab = Object.keys(tabs)[currentTab];
    let res: ApiResType<CardType[]>;
    setLoading(true);
    switch (tab) {
      case 'promotions':
        if (currentPromotionPage < totalPromotionPages) {
          res = await bookmarkApi.fetchPromotionCards(currentPromotionPage + 1);
          if (res.status === 'success') {
            setCurrentPromotionPage(currentPromotionPage + 1);
            setPromotionCards([...promotionCards!, ...res.result.data]);
          }
        }
        break;
      case 'events':
        if (currentEventPage < totalEventPages) {
          res = await bookmarkApi.fetchEventCards(currentEventPage + 1);
          if (res.status === 'success') {
            setCurrentEventPage(currentEventPage + 1);
            setEventCards([...eventCards!, ...res.result.data]);
          }
        }
        break;
      case 'news':
        if (currentNewsPage < totalNewsPages) {
          res = await bookmarkApi.fetchNewsCards(currentNewsPage + 1);
          if (res.status === 'success') {
            setCurrentNewsPage(currentNewsPage + 1);
            setNewsCards([...newsCards!, ...res.result.data]);
          }
        }
        break;
      case 'merchants':
        if (currentMerchantPage < totalMerchantPages) {
          res = await bookmarkApi.fetchMerchantCards(currentNewsPage + 1);
          if (res.status === 'success') {
            setCurrentMerchantPage(currentMerchantPage + 1);
            setMerchantCards([...merchantCards!, ...res.result.data]);
          }
        }
        break;
      case 'luckyDraws':
        if (currentLuckyDrawPage < totalLuckyDrawPages) {
          res = await luckyDrawApi.fetchLiXis(currentNewsPage + 1);
          if (res.status === 'success') {
            setCurrentLuckyDrawPage(currentMerchantPage + 1);
            setLuckyDraws([...luckyDraws!, ...res.result.data]);
          }
        }
        break;
      default:
        break;
    }
    setLoading(false);
  }

  async function onRefresh(someTabs = tabs, index = currentTab) {
    const tab = Object.keys(someTabs)[index];
    let res: ApiResType<CardType[]>;
    setRefreshing(true);
    switch (tab) {
      case 'promotions':
        res = await bookmarkApi.fetchPromotionCards();
        if (res.status === 'success') {
          setPromotionCards(res.result.data);
          setTotalPromotionPages(res.result.totalPages);
          setCurrentPromotionPage(1);
        } else {
          setPromotionCards([]);
        }
        break;
      case 'events':
        res = await bookmarkApi.fetchEventCards();
        if (res.status === 'success') {
          setEventCards(res.result.data);
          setTotalEventPages(res.result.totalPages);
          setCurrentEventPage(1);
        } else {
          setEventCards([]);
        }
        break;
      case 'news':
        res = await bookmarkApi.fetchNewsCards();
        if (res.status === 'success') {
          setNewsCards(res.result.data);
          setTotalNewsPages(res.result.totalPages);
          setCurrentNewsPage(1);
        } else {
          setNewsCards([]);
        }
        break;
      case 'merchants':
        res = await bookmarkApi.fetchMerchantCards();
        if (res.status === 'success') {
          setMerchantCards(res.result.data);
          setTotalMerchantPages(res.result.totalPages);
          setCurrentMerchantPage(1);
        } else {
          setMerchantCards([]);
        }
        break;
      case 'luckyDraws':
        res = await luckyDrawApi.fetchLiXis();
        if (res.status === 'success') {
          setLuckyDraws(res.result.data);
          setTotalLuckyDrawPages(res.result.totalPages);
          setCurrentLuckyDrawPage(1);
        } else {
          setLuckyDraws([]);
        }
        break;
      default:
        break;
    }
    setRefreshing(false);
  }

  async function onTabChange(index: number) {
    const tab = Object.keys(tabs)[index];
    let res: ApiResType<CardType[]>;
    setRefreshing(true);
    switch (tab) {
      case 'promotions':
        if (!promotionCards) {
          res = await bookmarkApi.fetchPromotionCards();
          if (res.status === 'success') {
            setPromotionCards(res.result.data);
            setTotalPromotionPages(res.result.totalPages);
            setCurrentPromotionPage(1);
          } else {
            setPromotionCards([]);
          }
        }
        break;
      case 'events':
        if (!eventCards) {
          res = await bookmarkApi.fetchEventCards();
          if (res.status === 'success') {
            setEventCards(res.result.data);
            setTotalEventPages(res.result.totalPages);
            setCurrentEventPage(1);
          } else {
            setEventCards([]);
          }
        }
        break;
      case 'news':
        if (!newsCards) {
          res = await bookmarkApi.fetchNewsCards();
          if (res.status === 'success') {
            setNewsCards(res.result.data);
            setTotalNewsPages(res.result.totalPages);
            setCurrentNewsPage(1);
          } else {
            setNewsCards([]);
          }
        }
        break;
      case 'merchants':
        if (!merchantCards) {
          res = await bookmarkApi.fetchMerchantCards();
          if (res.status === 'success') {
            setMerchantCards(res.result.data);
            setTotalMerchantPages(res.result.totalPages);
            setCurrentMerchantPage(1);
          } else {
            setMerchantCards([]);
          }
        }
        break;
      default:
        break;
    }
    setCurrentTab(index);
    setRefreshing(false);
  }

  function getCurrentCardList() {
    const key = Object.keys(tabs)[currentTab];
    switch (key) {
      case 'promotions':
        return promotionCards;
      case 'news':
        return newsCards;
      case 'events':
        return eventCards;
      case 'merchants':
        return merchantCards;
      case 'luckyDraws':
        return luckyDraws;
      default:
        return undefined;
    }
  }

  async function onFocus() {
    const res = await bookmarkApi.fetchOverview();
    if (res.status === 'success') {
      const newTabs = getTabs(res.result.data);
      const currentIndex =
        currentTab >= Object.keys(newTabs).length &&
        Object.keys(newTabs).length > 0
          ? Object.keys(newTabs).length - 1
          : currentTab;
      setCurrentTab(currentIndex);
      setTabs(newTabs);
      onRefresh(newTabs, currentIndex);
    }
  }

  useEffect(() => {
    if (userState.shouldRefreshBookmarks && focused) {
      onFocus();
      userActions.setShouldRefreshBookmarks(false);
      setFocused(false);
    }
  }, [focused, userState.shouldRefreshBookmarks]);

  useFocusEffect(() => {
    setFocused(true);
  });

  return (
    <View style={{ flex: 1 }}>
      <DirectoryScreenContainer
        tabs={Object.keys(tabs).length > 0 ? tabs : undefined}
        title={i18n.t('headers.bookmarkScreen')}
        backgroundColor={applicationColors.primary.shade500}
        headerBackgroundColor={applicationColors.secondary.background}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        loading={loading}
        cards={getCurrentCardList()}
        fromOffset={40}
        toOffset={160}
        onChangeTab={index => onTabChange(index)}
        emptyMessage={i18n.t('features.bookmarkScreen.noBookmark')}
        emptySubtitle={i18n.t('features.bookmarkScreen.noBookmarkSubtitle')}
      />
    </View>
  );
}
