import React, { useEffect, useImperativeHandle, useState } from 'react';
import { FlatList, Linking, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import {
  CardType,
  MerchantOpeningTimeType,
} from '../../../../components/Card/types';
import About from './components/About';
import Heading from '../../../../components/Heading';
import TabView from '../../../Directory/components/DirectoryScreenContainer/components/DirectoryTabView';
import Text from '../../../../components/Text';
import Avatar from '../../../../components/Avatar';
import Badge from '../../../../components/Badge';
import styles from './style.css';
import { useUserState } from '../../../User/reducers';
import CardBookmarkCount from '../CardBookmarkCount';
import IconComponent from '../../../../components/Icon';
import Button from '../../../../components/Button';
import MerchantApi from '../../../../services/api/merchant';
import CardsList from '../../../Directory/components/DirectoryScreenContainer/components/CardsList';
import { ApiResType } from '../../../../services/api/types/api';
import { ListRef } from '../../../../utils/card';
import { applicationColors } from '../../../../../style.css';
import DateUtils from '../../../../utils/date';

interface PropTypes {
  card: CardType;
  onPressCall: (number: string) => void;
  onPressDirections: (latitude: string, longitude: string) => void;
  listRef: React.RefObject<ListRef>;
  navigation: any;
}

// Render the description of a card where type is "CardMerchant"
export default function CardDescriptionMerchant(props: PropTypes) {
  const { card, onPressCall, onPressDirections, listRef } = props;
  const i18n = useTranslation();
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const merchantApi = new MerchantApi();
  const tabs = {
    about: { title: i18n.t('features.cardScreen.about') },
    ...(card.merchant?.hasPromotion && {
      promotions: { title: i18n.t('features.cardScreen.promotions') },
    }),
    ...(card.merchant?.hasNews && {
      news: { title: i18n.t('features.cardScreen.news') },
    }),
    ...(card.merchant?.hasEvents && {
      events: { title: i18n.t('features.cardScreen.events') },
    }),
  };

  const [newsCards, setNewsCards] = useState<CardType[]>();
  const [currentNewsPage, setCurrentNewsPage] = useState<number>(1);
  const [totalNewsPages, setTotalNewsPages] = useState<number>(1);

  const [promotionCards, setPromotionCards] = useState<CardType[]>();
  const [currentPromotionPage, setCurrentPromotionPage] = useState<number>(1);
  const [totalPromotionPages, setTotalPromotionPages] = useState<number>(1);

  const [eventCards, setEventCards] = useState<CardType[]>();
  const [currentEventPage, setCurrentEventPage] = useState<number>(1);
  const [totalEventPages, setTotalEventPages] = useState<number>(1);

  const [currentTab, setCurrentTab] = useState<number>(0);

  useImperativeHandle(
    listRef,
    (): ListRef => ({
      onRefresh,
      onEndReached,
    }),
  );

  async function onEndReached() {
    const tab = Object.keys(tabs)[currentTab];
    let res: ApiResType<CardType[]>;
    switch (tab) {
      case 'promotions':
        if (currentPromotionPage < totalPromotionPages) {
          res = await merchantApi.fetchPromotionCards(
            card.merchant!.id,
            currentPromotionPage + 1,
          );
          if (res.status === 'success') {
            setCurrentPromotionPage(currentPromotionPage + 1);
            setPromotionCards([...promotionCards!, ...res.result.data]);
          }
        }
        break;
      case 'events':
        if (currentEventPage < totalEventPages) {
          res = await merchantApi.fetchEventCards(
            card.merchant!.id,
            currentEventPage + 1,
          );
          if (res.status === 'success') {
            setCurrentEventPage(currentEventPage + 1);
            setEventCards([...eventCards!, ...res.result.data]);
          }
        }
        break;
      case 'news':
        if (currentNewsPage < totalNewsPages) {
          res = await merchantApi.fetchNewsCards(
            card.merchant!.id,
            currentNewsPage + 1,
          );
          if (res.status === 'success') {
            setCurrentNewsPage(currentNewsPage + 1);
            setNewsCards([...newsCards!, ...res.result.data]);
          }
        }
        break;
      default:
        break;
    }
  }

  async function onRefresh() {
    const tab = Object.keys(tabs)[currentTab];
    let res: ApiResType<CardType[]>;
    switch (tab) {
      case 'promotions':
        res = await merchantApi.fetchPromotionCards(card.merchant!.id);
        if (res.status === 'success') {
          setPromotionCards(res.result.data);
          setTotalPromotionPages(res.result.totalPages);
          setCurrentPromotionPage(1);
        } else {
          setPromotionCards([]);
        }
        break;
      case 'events':
        res = await merchantApi.fetchEventCards(card.merchant!.id);
        if (res.status === 'success') {
          setEventCards(res.result.data);
          setTotalEventPages(res.result.totalPages);
          setCurrentEventPage(1);
        } else {
          setEventCards([]);
        }
        break;
      case 'news':
        res = await merchantApi.fetchNewsCards(card.merchant!.id);
        if (res.status === 'success') {
          setNewsCards(res.result.data);
          setTotalNewsPages(res.result.totalPages);
          setCurrentNewsPage(1);
        } else {
          setNewsCards([]);
        }
        break;
      default:
        break;
    }
  }

  // Navigate to a social site
  async function onContactPress(link: string) {
    const canOpen = await Linking.canOpenURL(link);
    if (canOpen) {
      Linking.openURL(link);
    } else {
      console.log('Linking error with URL:', link);
    }
  }

  // Navigate user to their preferred email service
  function onEmailPress(email: string) {
    const mailTo = `mailto:${email}`;
    Linking.openURL(mailTo);
  }

  /* eslint react/prop-types: 0 */
  function getOperationStatus() {
    const now = moment();
    now.locale('en');
    const today = card.merchant?.merchantOpeningTime.allSelected
      ? 'all'
      : now.format('ddd').toLowerCase();
    const todaySelected =
      card.merchant?.merchantOpeningTime[
        `${today}Selected` as keyof MerchantOpeningTimeType
      ];
    if (todaySelected) {
      const todayOpeningTime = moment(
        // @ts-ignore
        card.merchant?.merchantOpeningTime[
          `${today}OpeningTime` as keyof MerchantOpeningTimeType
        ],
      ).tz('Asia/Ho_Chi_Minh');
      const todayClosingTime = moment(
        // @ts-ignore
        card.merchant?.merchantOpeningTime[
          `${today}ClosingTime` as keyof MerchantOpeningTimeType
        ],
      ).tz('Asia/Ho_Chi_Minh');
      if (
        now.format(DateUtils.MOMENT_FORMATS.TIME) <
        todayOpeningTime.format(DateUtils.MOMENT_FORMATS.TIME)
      ) {
        return (
          <View style={styles.workingHourContainer}>
            <IconComponent
              size={16}
              name="clock"
              iconPack="feather"
              color={applicationColors.semantic.error.shade500}
            />
            <Text fontSize="small" bold="bold" style={styles.closedText}>
              {i18n.t('features.cardScreen.closed')}
            </Text>
            <Text fontSize="small" style={styles.infoText}>
              {` • ${i18n.t(
                'features.cardScreen.open',
              )} ${todayOpeningTime.format(DateUtils.MOMENT_FORMATS.TIME)}`}
            </Text>
          </View>
        );
      }
      if (
        now.format(DateUtils.MOMENT_FORMATS.TIME) >=
          todayOpeningTime.format(DateUtils.MOMENT_FORMATS.TIME) &&
        now.format(DateUtils.MOMENT_FORMATS.TIME) <=
          todayClosingTime.format(DateUtils.MOMENT_FORMATS.TIME)
      ) {
        return (
          <View style={styles.workingHourContainer}>
            <IconComponent
              size={16}
              name="clock"
              iconPack="feather"
              color={applicationColors.semantic.success.shade500}
            />
            <Text fontSize="small" bold="bold" style={styles.openText}>
              {i18n.t('features.cardScreen.open')}
            </Text>
            <Text fontSize="small" style={styles.infoText}>
              {` • ${i18n.t(
                'features.cardScreen.closed',
              )} ${todayClosingTime.format(DateUtils.MOMENT_FORMATS.TIME)}`}
            </Text>
          </View>
        );
      }
    }
    const indexOfToday = DateUtils.DAYS_OF_WEEK.indexOf(today);
    let i = (indexOfToday + 1) % DateUtils.DAYS_OF_WEEK.length;
    let j = 0;
    for (i; j <= 7; i = (i + 1) % DateUtils.DAYS_OF_WEEK.length) {
      if (DateUtils.DAYS_OF_WEEK[i] !== 'all') {
        j += 1;
      }
      if (
        card.merchant?.merchantOpeningTime[
          `${DateUtils.DAYS_OF_WEEK[i]}Selected` as keyof MerchantOpeningTimeType
        ]
      ) {
        break;
      }
    }
    const nextOpeningDay = DateUtils.DAYS_OF_WEEK[i];
    if (
      card.merchant?.merchantOpeningTime[
        `${nextOpeningDay}Selected` as keyof MerchantOpeningTimeType
      ]
    ) {
      if (nextOpeningDay === 'all') {
        now.add(1, 'days');
      } else {
        now.add(j, 'days');
      }
      const nextOpeningTime = moment(
        // @ts-ignore
        card.merchant?.merchantOpeningTime[
          `${nextOpeningDay}OpeningTime` as keyof MerchantOpeningTimeType
        ],
      );
      now.set('hours', nextOpeningTime.hours());
      now.set('minutes', nextOpeningTime.minutes());
      return (
        <View style={styles.workingHourContainer}>
          <IconComponent
            size={16}
            name="clock"
            iconPack="feather"
            color={applicationColors.semantic.error.shade500}
          />
          <Text fontSize="small" bold="bold" style={styles.closedText}>
            {i18n.t('features.cardScreen.closed')}
          </Text>
          <Text fontSize="small" style={styles.infoText}>
            {` • ${i18n.t('features.cardScreen.open')} ${now.format(
              'HH:mm DD/MM',
            )}`}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.workingHourContainer}>
        <IconComponent
          size={16}
          name="clock"
          iconPack="feather"
          color={applicationColors.semantic.error.shade500}
        />
        <Text fontSize="small" bold="bold" style={styles.closedText}>
          {i18n.t('features.cardScreen.closed')}
        </Text>
      </View>
    );
  }
  /* eslint react/prop-types: 1 */

  async function init() {
    const promises = [];
    if (card.merchant?.hasNews)
      promises.push(await merchantApi.fetchNewsCards(card.merchant!.id));
    if (card.merchant?.hasEvents)
      promises.push(await merchantApi.fetchEventCards(card.merchant!.id));
    if (card.merchant?.hasPromotion)
      promises.push(await merchantApi.fetchPromotionCards(card.merchant!.id));
    Promise.all(promises).then(responses => {
      responses.forEach(response => {
        if (response.status === 'success') {
          switch (response.result.data[0].type) {
            case 'CardEvent':
              setEventCards(response.result.data);
              setTotalEventPages(response.result.totalPages);
              setCurrentEventPage(1);
              break;
            case 'CardNews':
              setNewsCards(response.result.data);
              setTotalNewsPages(response.result.totalPages);
              setCurrentNewsPage(1);
              break;
            case 'CardPromotion':
              setPromotionCards(response.result.data);
              setTotalPromotionPages(response.result.totalPages);
              setCurrentPromotionPage(1);
              break;
            default:
              break;
          }
        }
      });
    });
  }

  useEffect(() => {
    init();
  }, []);

  function renderPage(index: number) {
    const key = Object.keys(tabs)[index];
    if (currentTab !== index) return undefined;
    switch (key) {
      case 'about':
        return (
          <View style={styles.about}>
            <About
              onContactPress={onContactPress}
              onEmailPress={onEmailPress}
              card={card}
            />
          </View>
        );
      case 'promotions':
        return (
          <CardsList backgroundHeight={0} i18n={i18n} cards={promotionCards} />
        );
      case 'news':
        return <CardsList backgroundHeight={0} i18n={i18n} cards={newsCards} />;
      case 'events':
        return (
          <CardsList backgroundHeight={0} i18n={i18n} cards={eventCards} />
        );
      default:
        return null;
    }
  }

  function renderCategoryBadges() {
    /* eslint-disable react/prop-types */
    const badges =
      card.subcategories &&
      card.subcategories.length > 0 &&
      (card.category.name.en === 'Food & Beverages' ||
        card.category.name.en === 'Sport & Entertainment')
        ? card.subcategories
        : [card.category];

    return (
      <FlatList
        // @ts-ignore
        data={badges}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.badgeList}
        renderItem={({ item }) => (
          <View style={styles.badgeContainer}>
            <Badge
              type="clear"
              color="#FEFEFE"
              text={item.name[userLanguage]}
              style={styles.badge}
            />
          </View>
        )}
        horizontal
      />
    );
    /* eslint-enable react/prop-types */
  }

  return (
    <>
      <View style={styles.container}>
        <CardBookmarkCount
          bookmarkCount={card.bookmarkCount}
          style={styles.favoriteCount}
          labelColor={applicationColors.primary.white}
        />
        <View style={styles.titleContainer}>
          <Heading style={styles.title} size="h1" bold="bold">
            {card.title}
          </Heading>
          <Avatar avatarUrl={card.merchant!.logo} size={40} />
        </View>
        <View style={styles.addressContainer}>
          <IconComponent size={16} name="map-pin" iconPack="feather" />
          <Text fontSize="small" style={styles.address}>
            {card.merchant!.street} {card.merchant!.streetNumber}
          </Text>
        </View>
        {getOperationStatus()}
        <View style={styles.badgeListContainer}>{renderCategoryBadges()}</View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.buttonRow}>
          <View style={styles.callButtonContainer}>
            <Button
              uppercase={false}
              type="primary"
              title={i18n.t('features.cardScreen.phone')}
              labelStyle={styles.contactButtonLabel}
              style={styles.contactButton}
              onPress={() => onPressCall(card.merchant?.phoneNumber!)}
            />
          </View>
          <View style={styles.directionButtonContainer}>
            <Button
              uppercase={false}
              type="primary"
              title={i18n.t('features.cardScreen.directions')}
              labelStyle={styles.contactButtonLabel}
              style={styles.contactButton}
              onPress={() => onPressDirections(card.latitude!, card.longitude!)}
            />
          </View>
        </View>
        <View style={styles.tabViewContainer}>
          <TabView
            currentTab={currentTab}
            onChangeTab={index => setCurrentTab(index)}
            tabs={tabs}
          />
        </View>
        {renderPage(currentTab)}
      </View>
    </>
  );
}
