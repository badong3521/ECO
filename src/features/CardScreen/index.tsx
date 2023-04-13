import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getStatusBarHeight } from 'utils/statusBar';
import Share from 'react-native-share';
import AnimatedLottieView from 'lottie-react-native';
import styles, { ImageWidth } from './style.css';
import CardApi from '../../services/api/card';
import CardDescription from './components/CardDescription';
import { CardType } from '../../components/Card/types';
import CardPhotoCover, {
  ASPECT_RATIO_TYPES,
} from './components/CardPhotoCover';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../style.css';
import useStatusBar from '../../utils/hooks/useStatusBar';
import Firebase, { EventIdType } from '../../services/firebase';
import StickyHeaderScrollView from '../../components/StickyHeaderScrollView';
import { buildLink } from '../../utils/deepLink';
import AnimatedBookmarkButton from '../../components/AnimatedBookmarkButton';
import { ListRef } from '../../utils/card';
import BookmarkApi from '../../services/api/bookmark';
import { useUserState } from '../User/reducers';
import LuckyDrawApi from '../../services/api/luckyDraw';
import { isLixi } from './components/CardDescriptionPromotion/components/TopPromotionCard';

const appBarHeight = 40 + getStatusBarHeight();

interface CardScreenPropType {
  navigation: any;
}

/*
  Displays information about the currently active card (from props).
*/
export default function CardScreen(props: CardScreenPropType) {
  const { navigation } = props;
  const cardApi = new CardApi();
  const luckyDrawApi = new LuckyDrawApi();
  const bookmarkApi = new BookmarkApi();
  const i18n = useTranslation();
  const listRef = useRef<ListRef>(null);
  // Set card as a state item so that we can update it with data from API
  // but still display the content we have right away
  const [card, setCard] = useState<CardType>(navigation.getParam('card'));
  const [cardLoaded, setCardLoaded] = useState(false);
  const statusBarStyle =
    card.type !== 'CardNews' ? 'light-content' : 'dark-content';
  useStatusBar(statusBarStyle);
  const bookmarkAnimRef = useRef<AnimatedLottieView>(null);
  const [userState, userActions] = useUserState();

  const maxScrollOffset = isShowCoverPhoto(card)
    ? ImageWidth / ASPECT_RATIO_TYPES[card.type]
    : appBarHeight; // max offset value when scrolling to animate app bar

  // call favorite/unFavorite api and update the current favoriteCount
  async function onBookmark(bookmarked: boolean) {
    const bookmarkCount = (card.bookmarkCount || 0) + (bookmarked ? 1 : -1);
    setCard({ ...card, bookmarkCount, bookmarked });
    userActions.setShouldRefreshBookmarks(true);
    if (bookmarked) {
      if (bookmarkAnimRef) bookmarkAnimRef.current?.play();
      await bookmarkApi.bookmarkCard(card.id);
      if (userState.bookmarkOverview?.totalBookmarked !== undefined) {
        userActions.setNumBookmarks(
          userState.bookmarkOverview?.totalBookmarked + 1,
        );
      }
    } else {
      await bookmarkApi.unbookmarkCard(card.id);
      if (userState.bookmarkOverview?.totalBookmarked !== undefined) {
        userActions.setNumBookmarks(
          userState.bookmarkOverview?.totalBookmarked - 1,
        );
      }
    }
  }

  async function fetchFullCard() {
    let response;
    if (isLixi(card)) {
      response = await luckyDrawApi.fetchLiXi(card.id);
    } else {
      response = await cardApi.fetchCard(card.id, card.type);
    }
    if (response.status === 'success') {
      // @ts-ignore
      const { data } = response.result;
      trackViewCardEvent(data);
      setCard(data);
      setCardLoaded(true);
    }
  }

  function onSharePress() {
    buildLink(
      card.title,
      card.description,
      card.photoCover || '', // some card only has vertical or horizontal image
      `card_id=${card.id}&card_type=${card.type}`,
    ).then(linkRes =>
      Share.open({
        message: linkRes,
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          if (err) console.log(err);
        }),
    );
  }

  useEffect(() => {
    fetchFullCard();
  }, []);

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor:
            card.type === 'CardPromotion'
              ? applicationColors.primary.shade900
              : applicationColors.secondary.background,
        },
      ]}
    >
      <StickyHeaderScrollView
        loaderStyle={styles.loader}
        progressViewOffset={
          card.type === 'CardMerchant'
            ? getStatusBarHeight() + Dimensions.get('screen').width
            : undefined
        }
        listRef={listRef}
        title={
          card.type === 'CardPromotion'
            ? i18n.t('features.cardScreen.couponCard')
            : undefined
        }
        leftHeaderButtons={[
          { icon: applicationIcons.back, onPress: () => navigation.goBack() },
        ]}
        maxScrollOffset={maxScrollOffset}
        onBackPress={() => navigation.goBack()}
        headerImageHeight={isShowCoverPhoto(card) ? maxScrollOffset : 0}
        rightHeaderButtons={
          isLixi(card)
            ? undefined
            : [
                {
                  icon: 'heart',
                  onPress: () => onBookmark(!card.bookmarked),
                },
                {
                  icon: 'share-2',
                  onPress: onSharePress,
                },
              ]
        }
        headerImage={
          isShowCoverPhoto(card) ? (
            <CardPhotoCover photoCover={card.photoCover} type={card.type} />
          ) : (
            <View
              style={{
                height: appBarHeight + applicationDimensions.defaultPadding,
              }}
            />
          )
        }
      >
        <CardDescription
          listRef={listRef}
          card={card}
          cardLoaded={cardLoaded}
          navigation={navigation}
        />
      </StickyHeaderScrollView>
      <AnimatedBookmarkButton
        onPress={() => onBookmark(!card.bookmarked)}
        lottieRef={bookmarkAnimRef}
        containerStyle={[
          styles.bookmarkButton,
          {
            opacity: card.bookmarked ? 1 : 0,
          },
        ]}
      />
    </View>
  );
}

const isShowCoverPhoto = (card: CardType): boolean => {
  return card && Boolean(card.photoCover) && card.type !== 'CardPromotion';
};

function trackViewCardEvent(card: CardType) {
  let eventId: EventIdType | undefined;
  // eslint-disable-next-line default-case
  switch (card.type) {
    case 'CardEvent':
      eventId = 'view_card_event';
      break;
    case 'CardMerchant':
      eventId = 'view_card_merchant';
      break;
    case 'CardNews':
      eventId = 'view_card_news';
      break;
    case 'CardPromotion':
      eventId = 'view_card_coupon';
      break;
  }
  if (eventId) {
    Firebase.track(eventId, {
      value: card.id,
    });
  }
}
