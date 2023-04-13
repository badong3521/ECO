import React, { useEffect, useState, useRef } from 'react';
import {
  FlatList,
  LayoutAnimation,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import i18n from 'i18next';
import { fetchResidenceScreenProps } from '../../utils/ecoId';
import { UserState, useUserState } from '../User/reducers';
import { useElectricBillState } from '../ElectricBillScreen/reducers';
import useStatusBar from '../../utils/hooks/useStatusBar';
import UserApi from '../../services/api/user';
import UserInfo from './components/UserInfo';
import CardAction from './components/CardAction';
import { CardActionType } from './types';
import styles from './style.css';
import EcoIdApi from '../../services/api/ecoId';
import DncEcoidApi from '../../services/api/dncEcoid';
import { ResidentType } from '../../services/api/types/ecoid';
import EcoIdBanner from './components/EcoIdBanner';
import Firebase from '../../services/firebase';
import SettingsIcon from '../../assets/profile/ic_settings.svg';
import BookmarkIcon from '../../assets/profile/ic_bookmark.svg';
import HotlinesIcon from '../../assets/profile/ic_hotlines.svg';
import ElectriBillIcon from '../../assets/profile/ic_electric_bill.svg';
import ManageCalendarIcon from '../../assets/profile/ic_manage_calendar.svg';
import ListEcoIdResidences from './components/ListEcoIdResidences';
import useOnFocused from '../../utils/hooks/useOnFocused';
import EcofeedbackBanner from './components/EcofeedbackBanner';
import RateAppBanner from './components/RateAppBanner';

interface UserDashboardLandingProps {
  navigation: any;
}

export default function UserDashboardLanding(props: UserDashboardLandingProps) {
  const { navigation } = props;
  const appRated = navigation.getParam('appRated');
  const scrollViewRef = useRef<ScrollView>(null);
  const [userState, userActions] = useUserState();
  const [electricBillState] = useElectricBillState();
  const userApi = new UserApi();
  const ecoIdApi = new EcoIdApi();
  const dncEcoidApi = new DncEcoidApi();
  const [residences, setResidences] = useState<ResidentType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const allDncBills = [
    ...(electricBillState.bills || []),
    ...(electricBillState.searchedBills || []),
  ].filter(b => !!b.billId);
  const totalDncBills = [...new Set(allDncBills.map(bill => bill.billId))]
    .length;

  const [actions, setActions] = useState<CardActionType[]>([]);

  function onUserInfoPress() {
    navigation.navigate('UpdateProfileScreen');
  }

  async function onResidentPress(resident: ResidentType) {
    const residenceScreenProps = await fetchResidenceScreenProps(
      resident.residentId,
      navigation,
    );
    if (residenceScreenProps) {
      navigation.navigate('ResidenceScreen', residenceScreenProps);
    }
  }

  async function onEcoIdBannerPress() {
    Firebase.track('view_ecoid_onboarding');
    navigation.navigate('EcoIdOnboardingScreen');
  }

  function onRateAppBannerPress() {
    navigation.navigate('RateAppScreen');
  }

  function onCardActionPress(cardAction: CardActionType) {
    switch (cardAction.type) {
      case 'electricBill':
        navigation.navigate('DncElectricBillScreen');
        break;
      case 'helpDesk':
        navigation.navigate('ContactScreen');
        break;
      case 'settings':
        navigation.navigate('SettingsScreen');
        break;
      case 'bookmarks':
        userActions.setShouldRefreshBookmarks(true);
        navigation.navigate('BookmarkScreen');
        break;
      case 'manageCalendar':
        navigation.navigate('ManageCalendarScreen');
        break;
      default:
        break;
    }
  }

  async function fetchResidences() {
    setLoading(true);
    const res = await ecoIdApi.fetchResidences();
    setLoading(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (res.status === 'success') {
      setResidences(res.result.data);
    } else {
      setResidences([]);
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

  function init() {
    userApi.fetchMyInfo();
    fetchResidences();
  }

  function onRefreshHandle() {
    init();
    fetchDncBills();
  }

  useEffect(() => {
    if (appRated && scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [appRated, scrollViewRef.current]);

  useOnFocused(navigation, () => {
    init();
  });

  useEffect(() => {
    if (userState.reloadUserDashboard) {
      init();
      userActions.setReloadUserDashboard(false);
    }
  }, [userState.reloadUserDashboard]);

  useEffect(() => {
    setActions(generateActions(userState, totalDncBills));
  }, [userState?.bookmarkOverview?.totalBookmarked, totalDncBills]);

  useEffect(() => {
    fetchDncBills();
  }, []);

  useStatusBar('dark-content');

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefreshHandle}
          progressViewOffset={getStatusBarHeight()}
        />
      }
    >
      <UserInfo
        user={userState.user}
        userLanguage={userState.userLanguage}
        onUserInfoPress={onUserInfoPress}
        notificationCount={userState.user?.unreadNotificationTotal ?? 0}
        onNotificationPress={() => navigation.navigate('NotificationScreen')}
      />

      {residences?.length === 0 ? (
        <EcoIdBanner onPress={onEcoIdBannerPress} />
      ) : (
        <ListEcoIdResidences
          residences={residences}
          onResidentPress={onResidentPress}
        />
      )}
      <EcofeedbackBanner
        onPress={() => navigation.navigate('HelpDeskScreen')}
      />
      <FlatList
        style={styles.actions}
        scrollEnabled={false}
        data={actions}
        renderItem={item => (
          <CardAction
            hideDivider={item.index === actions.length - 1}
            action={item.item}
            onPress={onCardActionPress}
          />
        )}
        keyExtractor={item => item.type}
      />
      <RateAppBanner
        onPress={
          userState.user?.lastVersionRating ? undefined : onRateAppBannerPress
        }
        subtitle={
          userState.user?.lastVersionRating
            ? i18n.t('features.rateAppScreen.title', { returnObjects: true })[
                userState.user?.lastVersionRating.score - 1
              ]
            : i18n.t('features.userScreen.rateAppSubtitle')
        }
        title={
          userState.user?.lastVersionRating
            ? i18n.t('features.userScreen.yourRating')
            : i18n.t('features.userScreen.rateAppTitle')
        }
      />
    </ScrollView>
  );
}

function generateActions(
  userState?: UserState,
  totalBills?: number,
): CardActionType[] {
  const actions: CardActionType[] = [
    {
      icon: <ManageCalendarIcon />,
      type: 'manageCalendar',
    },
    {
      icon: <HotlinesIcon />,
      type: 'helpDesk',
    },
    {
      icon: <BookmarkIcon />,
      type: 'bookmarks',
      totalBookmarked: userState?.bookmarkOverview?.totalBookmarked || 0,
    },
    {
      icon: <SettingsIcon />,
      type: 'settings',
    },
  ];

  if (userState?.user?.ecoid) {
    return [
      {
        icon: <ElectriBillIcon />,
        type: 'electricBill',
        totalBills,
      },
      ...actions,
    ];
  }

  return actions;
}
