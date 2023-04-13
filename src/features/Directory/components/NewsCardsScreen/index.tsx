import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation, UseTranslationResponse } from 'react-i18next';

import styles from './style.css';
import { CardType } from '../../../../components/Card/types';
import { useHomePageState } from '../../../HomePage/reducers';
import CardApi, {
  FetchCardDataRes,
  FetchCardsParamsType,
} from '../../../../services/api/card';
import { START_PAGE } from '../../../../services/api/types/api';
import DirectoryScreenContainer from '../DirectoryScreenContainer';
import { applicationColors } from '../../../../../style.css';
import {
  TabData,
  TabRoutes,
} from '../DirectoryScreenContainer/components/DirectoryTabView';
import BookmarkButton from '../DirectoryScreenContainer/components/BookmarkButton';

const cardApi = new CardApi();
const initParams: FetchCardsParamsType[] = [
  { page: START_PAGE },
  { page: START_PAGE, isOfficial: true },
  { page: START_PAGE, isOfficial: false },
];
export default function NewsCardsScreen() {
  const i18n = useTranslation();
  const [homePageState] = useHomePageState();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [params, setParams] = useState<FetchCardsParamsType[]>(initParams);
  const [data, setData] = useState<FetchCardDataRes[]>([
    {
      totalPages: START_PAGE,
      cards: homePageState.news,
    },
    {
      totalPages: START_PAGE,
    },
    {
      totalPages: START_PAGE,
    },
  ]);

  function onChangeTab(index: number) {
    setCurrentTab(index);
    if (!data[index].cards) {
      fetchNewsCards(index);
    }
  }

  function updateParams(tab: number, page: number) {
    const temp = Array.from(params);
    temp[tab].page = page;
    setParams(temp);
  }

  function updateData(tab: number, totalPages: number, cards?: CardType[]) {
    const tempData = Array.from(data);
    tempData[tab].cards = cards;
    tempData[tab].totalPages = totalPages;
    setData(tempData);
  }

  async function fetchNewsCards(tab: number) {
    setLoading(true);
    updateParams(tab, START_PAGE + 1);
    const res = await cardApi.fetchCardNews({
      page: START_PAGE,
      isOfficial: params[tab].isOfficial,
    });
    setLoading(false);
    if (res.status === 'success') {
      updateData(tab, res.result.totalPages, res.result.data);
    } else {
      updateData(tab, START_PAGE, undefined);
    }
  }

  async function fetchNextNewsCards() {
    const nextPage = params[currentTab].page!;
    if (nextPage > data[currentTab].totalPages! || loading) return;
    setLoading(true);
    const res = await cardApi.fetchCardNews({
      page: nextPage,
      isOfficial: params[currentTab].isOfficial,
    });
    setLoading(false);
    const { cards } = data[currentTab];
    if (res.status === 'success') {
      updateParams(currentTab, nextPage + 1);
      updateData(
        currentTab,
        res.result.totalPages,
        cards?.concat(res.result.data),
      );
    }
  }

  useEffect(() => {
    fetchNewsCards(currentTab);
  }, []);

  return (
    <View style={styles.root}>
      <DirectoryScreenContainer
        tabs={INITIAL_NEWS_TABS(i18n)}
        title={i18n.t('features.directory.news.news')}
        backgroundColor={applicationColors.primary.shade500}
        headerBackgroundColor={applicationColors.secondary.background}
        onRefresh={() => fetchNewsCards(currentTab)}
        refreshing={loading && params[currentTab].page === START_PAGE}
        onEndReached={() => fetchNextNewsCards()}
        loading={loading}
        cards={data[currentTab].cards}
        fromOffset={100}
        toOffset={160}
        onChangeTab={onChangeTab}
        floatingRightHeader={() => (
          <View style={styles.bookmarkButtonContainer}>
            <BookmarkButton />
          </View>
        )}
      />
    </View>
  );
}

const INITIAL_NEWS_TABS = (
  i18n: UseTranslationResponse,
): TabRoutes<TabData> => ({
  all: {
    title: i18n.t('features.directory.news.all'),
  },
  ecopark: {
    title: i18n.t('features.directory.news.ecopark'),
  },
  community: {
    title: i18n.t('features.directory.news.community'),
  },
});
