import { Dimensions, FlatList, View, LayoutAnimation } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getStatusBarHeight } from 'utils/statusBar';
import useStatusBar from '../../../../utils/hooks/useStatusBar';
import { applicationColors } from '../../../../../style.css';
import IconButton from '../../../../components/IconButton';
import MerchantCategoryItem from '../../../HomePage/components/MerchantCategoryItem';
import { useUserState } from '../../../User/reducers';
import DirectoryScreenContainer from '../DirectoryScreenContainer';
import CardApi, { FetchCardsParamsType } from '../../../../services/api/card';
import { CardType, CategoryType } from '../../../../components/Card/types';
import styles from './style.css';
import Image from '../../../../components/Image';
import { START_PAGE } from '../../../../services/api/types/api';
import { HEADER_BAR_HEIGHT } from '../DirectoryScreenContainer/style.css';
import BookmarkButton from '../DirectoryScreenContainer/components/BookmarkButton';
import Firebase from '../../../../services/firebase';

interface PropTypes {
  navigation: any;
}

const BACKGROUND_ASPECT_RATIO = 375 / 252;
const WILL_SHOW_HEADER_OFFSET =
  Dimensions.get('screen').width / BACKGROUND_ASPECT_RATIO -
  HEADER_BAR_HEIGHT * 2;
const SHOW_HEADER_BAR_OFFSET = WILL_SHOW_HEADER_OFFSET + getStatusBarHeight();
const SHOW_TAB_VIEW_OFFSET = SHOW_HEADER_BAR_OFFSET + getStatusBarHeight();
export default function MerchantCategoryScreen(props: PropTypes) {
  const { navigation } = props;
  const preselectedSubcategories = navigation.getParam(
    'preselectedSubcategories',
  );
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const cardApi = new CardApi();
  const i18n = useTranslation();
  const [categoryHeight, setCategoryHeight] = useState<number>(0);
  const [data, setData] = useState<{
    cards?: CardType[];
    totalPages: number;
  }>({
    totalPages: START_PAGE,
  });
  const [params, setParams] = useState<FetchCardsParamsType>({
    page: START_PAGE,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<CategoryType>(
    navigation.getParam('category'),
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>(
    preselectedSubcategories || [],
  );

  function onChangeTab(index: number) {
    switch (index) {
      case 1:
        if (category.hasNewMerchant) {
          Firebase.track('filter_new_merchants');
        } else {
          Firebase.track('filter_promotion_merchants');
        }
        onRefresh(category.hasNewMerchant, !category.hasNewMerchant);
        break;
      case 2:
        Firebase.track('filter_promotion_merchants');
        onRefresh(undefined, true);
        break;
      default:
        Firebase.track('filter_all_merchants');
        onRefresh();
        break;
    }
  }

  function onSearchPress() {
    navigation.navigate('MerchantSearchScreen', {
      title: category?.name[userLanguage],
      categoryId: category.id,
      subcategories: selectedSubcategories.toString(),
    });
  }

  async function fetchNext() {
    if (params.page < data.totalPages) {
      const nextPage = params.page + 1;
      setLoading(true);
      const res = await cardApi.fetchCardMerchant({
        page: nextPage,
        category: category.id,
        isNewMerchant: params.isNewMerchant,
        isPromotedMerchant: params.isPromotedMerchant,
        subcategories: selectedSubcategories.toString(),
      });
      setLoading(false);
      if (res.status === 'success') {
        setParams({
          ...params,
          page: nextPage,
        });
        setData({
          ...data,
          cards: data.cards?.concat(res.result.data),
        });
      }
    }
  }

  async function onRefresh(
    isNewMerchant?: boolean,
    isPromotedMerchant?: boolean,
  ) {
    setData({
      ...data,
      cards: undefined,
    });
    const subcategoryString = selectedSubcategories.toString();
    const refreshParams = {
      page: START_PAGE,
      isPromotedMerchant,
      isNewMerchant,
      subcategories:
        subcategoryString.length > 0 ? subcategoryString : undefined,
    };
    setParams(refreshParams);
    setLoading(true);
    const res = await cardApi.fetchCardMerchant({
      ...refreshParams,
      category: category.id,
    });
    setLoading(false);
    if (res.status === 'success') {
      setData({
        cards: res.result.data,
        totalPages: res.result.totalPages,
      });
    } else {
      setData({
        cards: undefined,
        totalPages: START_PAGE,
      });
    }
  }

  async function fetchCategory() {
    const res = await cardApi.fetchCategory(category.id);
    if (res.status === 'success') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (res.result.data.subcategories) {
        setCategory({
          ...res.result.data,
          subcategories: res.result.data.subcategories.sort(
            (a, b) => a.orderBy - b.orderBy,
          ),
        });
      } else {
        setCategory(res.result.data);
      }
    }
  }

  function onSubcategorySelect(id?: number) {
    Firebase.track('filter_merchants_by_subcategory', {
      value: id,
    });
    if (!id || loading) return;
    let newArray;
    const selected = selectedSubcategories.indexOf(id) !== -1;
    if (selected) {
      newArray = selectedSubcategories.filter(sub => sub !== id);
    } else {
      newArray = [...selectedSubcategories, id];
    }
    animateLayout();
    setSelectedSubcategories(newArray);
  }

  function renderTabs() {
    if (!category) return undefined;
    if (!category.hasNewMerchant && !category.hasPromotedMerchant)
      return undefined;
    return {
      all: {
        title: i18n.t('features.directory.filters.merchant.all'),
      },
      ...(category.hasNewMerchant && {
        new: {
          title: i18n.t('features.directory.filters.merchant.new'),
        },
      }),
      ...(category.hasPromotedMerchant && {
        promotion: {
          title: i18n.t('features.directory.filters.merchant.promotion'),
        },
      }),
    };
  }

  useEffect(() => {
    Firebase.track('view_merchants_in_category', {
      value: category?.name?.en,
    });
    fetchCategory();
  }, []);

  useEffect(() => {
    onRefresh(params.isNewMerchant, params.isPromotedMerchant);
  }, [selectedSubcategories]);

  useStatusBar('dark-content');

  return (
    <DirectoryScreenContainer
      title={category?.name[userLanguage] || ' '}
      subtitle={category?.subName ? category.subName[userLanguage] : ' '}
      textColor={category?.textColor}
      backgroundColor={category?.color}
      headerBackgroundColor={applicationColors.secondary.background}
      fromOffset={WILL_SHOW_HEADER_OFFSET}
      toOffset={SHOW_HEADER_BAR_OFFSET}
      showTabViewAt={SHOW_TAB_VIEW_OFFSET + categoryHeight}
      background={
        <Image
          uri={category.cover}
          resizeMode="cover"
          style={{
            aspectRatio: BACKGROUND_ASPECT_RATIO,
            width: Dimensions.get('screen').width,
          }}
        />
      }
      backgroundAspectRatio={BACKGROUND_ASPECT_RATIO}
      floatingRightHeader={(color: string | any) => (
        <View style={styles.floatingRightHeaderContainer}>
          <IconButton
            type="clear"
            iconColor={color}
            iconSize={24}
            iconName="search"
            iconPack="feather"
            onPress={onSearchPress}
          />
          <View style={styles.bookmarkButtonContainer}>
            <BookmarkButton color={color} />
          </View>
        </View>
      )}
      tabs={renderTabs()}
      cards={data.cards}
      onRefresh={() =>
        onRefresh(params.isNewMerchant, params.isPromotedMerchant)
      }
      refreshing={loading && !!data.cards}
      onEndReached={fetchNext}
      loading={loading}
      onChangeTab={onChangeTab}
    >
      <FlatList
        numColumns={4}
        data={category?.subcategories}
        scrollEnabled={false}
        onLayout={event => setCategoryHeight(event.nativeEvent.layout.height)}
        renderItem={({ item: subcategory }) => {
          return (
            <View style={styles.container}>
              <MerchantCategoryItem
                id={subcategory.id}
                selectable
                selected={
                  !!selectedSubcategories.find(id => id === subcategory.id)
                }
                backgroundColor={subcategory.backgroundColor}
                shadow={false}
                image={subcategory.image}
                title={subcategory.name[userLanguage]}
                onPress={onSubcategorySelect}
              />
            </View>
          );
        }}
      />
    </DirectoryScreenContainer>
  );
}

function animateLayout() {
  LayoutAnimation.configureNext({
    duration: 100,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 1,
    },
  });
}
