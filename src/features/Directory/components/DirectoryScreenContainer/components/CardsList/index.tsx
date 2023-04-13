import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import React from 'react';
import { UseTranslationResponse } from 'react-i18next';
import Loader from '../../../../../../components/Loader';
import styles from '../../style.css';
import {
  CardType,
  MerchantType,
} from '../../../../../../components/Card/types';
import CardNews from '../../../../../../components/Card/components/CardNews';
import CardMerchant from '../../../../../../components/Card/components/CardMerchant';
import navigationService from '../../../../../../services/navigationService';
import CardEvent from '../../../../../../components/Card/components/CardEvent';
import { useUserState } from '../../../../../User/reducers';
import CardPromotion from '../../../../../../components/Card/components/CardPromotion';
import ListEmptyImage from '../../../../../../assets/images/list_empty.svg';
import EmptyContainer from '../EmptyContainer';

interface CardsListProps {
  flatListRef?: any;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  refreshing?: boolean;
  loadingMore?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  backgroundHeight: number;
  i18n: UseTranslationResponse;
  header?: React.ReactNode;
  cards?: CardType[];
  scrollEnable?: boolean;
  onScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  emptyMessage?: string;
  emptySubtitle?: string;
}

export default function CardsList(props: CardsListProps) {
  const {
    flatListRef,
    loadingMore,
    onTouchStart,
    onTouchEnd,
    refreshing,
    onRefresh,
    onEndReached,
    onScroll,
    backgroundHeight,
    header,
    cards,
    i18n,
    scrollEnable,
    onScrollEnd,
    emptyMessage,
    emptySubtitle,
  } = props;

  const [userState] = useUserState();

  function onCardPress(card: CardType) {
    navigationService.navigate('CardScreen', { card }, card.id);
  }

  function onCardMerchantPress(merchantType?: MerchantType) {
    if (merchantType) {
      navigationService.navigate(
        'CardScreen',
        {
          card: {
            id: merchantType.profileCard.id,
            type: 'CardMerchant',
          },
        },
        merchantType.profileCard.id,
      );
    }
  }

  function renderCard(card: CardType) {
    switch (card.type) {
      case 'CardNews':
        return (
          <CardNews
            type="clear"
            card={card}
            onCardMerchantPress={onCardMerchantPress}
            onCardPress={onCardPress}
            i18n={i18n}
          />
        );
      case 'CardEvent':
        return (
          <CardEvent
            card={card}
            onCardPress={onCardPress}
            onCardMerchantPress={onCardMerchantPress}
            language={userState.userLanguage}
          />
        );
      case 'CardPromotion':
        return (
          <CardPromotion
            card={card}
            onCardPress={onCardPress}
            onCardMerchantPress={onCardMerchantPress}
            i18n={i18n}
          />
        );
      default:
        return (
          <View style={styles.cardContainer}>
            <CardMerchant card={card} onCardPress={onCardPress} />
          </View>
        );
    }
  }

  return (
    <FlatList
      ref={flatListRef}
      scrollEnabled={scrollEnable}
      onTouchStart={onTouchStart}
      onTouchEndCapture={onTouchEnd}
      showsVerticalScrollIndicator
      onMomentumScrollEnd={onScrollEnd}
      onTouchCancel={onTouchEnd}
      onTouchEnd={onTouchEnd}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onScrollToTop={() => {
        flatListRef?.current?.scrollToOffset({
          offset: 0,
          animate: true,
        });
      }}
      progressViewOffset={getStatusBarHeight() + backgroundHeight}
      onEndReached={onEndReached}
      onScroll={onScroll}
      scrollEventThrottle={5}
      keyExtractor={({ id }) => id.toString()}
      contentContainerStyle={styles.flatList}
      overScrollMode="never"
      ListHeaderComponent={
        header ? (
          <View
            style={[
              styles.headerContainer,
              {
                marginTop: backgroundHeight,
              },
            ]}
          >
            {header}
          </View>
        ) : (
          undefined
        )
      }
      data={cards}
      renderItem={item => renderCard(item.item)}
      ListFooterComponent={
        <View style={styles.footerContainer}>{loadingMore && <Loader />}</View>
      }
      ListEmptyComponent={
        !refreshing && !loadingMore ? (
          <EmptyContainer
            style={{ marginTop: '10%' }}
            message={
              emptyMessage || i18n.t('features.directory.filters.noResult')
            }
            subtitle={emptySubtitle}
            image={<ListEmptyImage />}
          />
        ) : (
          undefined
        )
      }
    />
  );
}
