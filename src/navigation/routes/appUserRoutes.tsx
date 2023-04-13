import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import ManageCalendarScreen from 'features/ManageCalendarScreen';
import OrderHandoverScreen from 'features/ManageCalendarScreen/components/OrderHandoverScreen';
import OrderSuccessScreen from 'features/ManageCalendarScreen/components/OrderSuccessScreen';
import SurveyScreen from 'features/ManageCalendarScreen/components/SurveyScreen';
import IconButton from '../../components/IconButton';
import config from '../../config';
import UserScreen from '../../features/UserDashboard';
import i18n from '../../i18n';
import UpdateProfileScreen from '../../features/UpdateProfile';
import {
  lightNavigationOptions,
  whiteNavigationOptions,
} from '../../config/navigation';
import ContactScreen from '../../features/UserDashboard/components/ContactScreen';
import ChangePasswordScreen from '../../features/ChangePasswordScreen';
import CardScreen from '../../features/CardScreen';
import { applicationColors } from '../../../style.css';
import BookmarkScreen from '../../features/BookmarkScreen';
import HDTicketScreen from '../../features/HelpDeskScreen/components/TicketScreen';
import CreateTicketScreen from '../../features/HelpDeskScreen/components/TicketCreateScreen';
import HeaderBackIcon from '../../components/HeaderBackIcon';
import NotificationScreen from '../../features/NotificationScreen';
import AnnouncementScreen from '../../features/AnnouncementScreen';
import SettingsScreen from '../../features/Settings';
import EcoIdSelectResidentScreen from '../../features/EcoId/components/EcoIdSelectResident';
import ResidenceSelectionScreen from '../../features/EcoId/components/ResidenceSelectionScreen';
import ResidenceScreen from '../../features/EcoId/components/ResidenceScreen';

import EcoIdPaymentHistoryScreen from '../../features/EcoId/components/EcoIdPaymentHistory';
import EcoIdPreparePaymentScreen from '../../features/EcoId/components/EcoIdPreparePayment';
import HelpDeskScreen from '../../features/HelpDeskScreen';
import TicketRatingScreen from '../../features/HelpDeskScreen/components/TicketRatingScreen';
import TicketCreateSuccessfulScreen from '../../features/HelpDeskScreen/components/TicketCreateSuccessfulScreen';
import ElectricBillScreen from '../../features/ElectricBillScreen';
import AddNewCustomerCodeScreen from '../../features/ElectricBillScreen/components/AddNewCustomerCode';
import ListBillsByCustomerCodeScreen from '../../features/ElectricBillScreen/components/ListBillsByCustomerCode';
import BillPaymentScreen from '../../features/ElectricBillScreen/components/BillPayment';
import DncBillPaymentSuccessfullScreen from '../../features/PaymentScreen/components/PaymentSuccessfulScreen';
import DncBillPaymentFailureScreen from '../../features/PaymentScreen/components/PaymentFailureScreen';
import DncPaymentHistoryScreen from '../../features/ElectricBillScreen/components/PaymentHistory';
import PrepayBillDetails from '../../features/ElectricBillScreen/components/PrepayBillDetails';

export default createStackNavigator(
  {
    UserProfile: {
      screen: UserScreen,
      params: {
        eventScreenName: 'UserProfileScreen',
      },
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    UpdateProfileScreen: {
      params: {
        eventId: 'update_profile_started',
      },
      screen: UpdateProfileScreen,
      navigationOptions: ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          ...lightNavigationOptions,
          headerLeft: () => (
            <HeaderBackIcon
              color={applicationColors.neutral.shade900}
              onPress={params.onBackPress}
            />
          ),
          headerTitle: i18n.t(
            'features.updateProfileScreen.personalInformation',
          ),
        };
      },
    },
    ContactScreen: {
      screen: ContactScreen,
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.contact'),
      }),
    },
    ChangePasswordScreen: {
      screen: ChangePasswordScreen,
      params: {
        eventId: 'update_password_started',
      },
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.changePassword'),
      }),
    },
    CardScreen: {
      screen: CardScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    BookmarkScreen: {
      screen: BookmarkScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    HelpDeskScreen: {
      screen: HelpDeskScreen,
      navigationOptions: ({ navigation }) => {
        return {
          ...whiteNavigationOptions,
          headerTitle: i18n.t('headers.helpDesk'),
          headerRight: () => {
            return (
              <IconButton
                iconName="phone-call"
                iconSize={22}
                onPress={() => {
                  navigation.navigate('ContactScreen');
                }}
                iconColor={applicationColors.primary.black}
                iconPack="feather"
                type="clear"
              />
            );
          },
        };
      },
    },
    HelpDeskTicketScreen: {
      screen: HDTicketScreen,
      navigationOptions: () => {
        return {
          headerShown: false,
        };
      },
    },
    TicketRatingScreen: {
      screen: TicketRatingScreen,
      navigationOptions: () => {
        return {
          headerShown: false,
        };
      },
    },
    TicketCreateSuccessfulScreen: {
      screen: TicketCreateSuccessfulScreen,
      navigationOptions: () => {
        return {
          headerShown: false,
        };
      },
    },
    CreateTicketScreen: {
      screen: CreateTicketScreen,
      navigationOptions: () => ({
        ...whiteNavigationOptions,
        headerBackImage: () => (
          <HeaderBackIcon
            type="close"
            color={applicationColors.neutral.shade900}
          />
        ),
      }),
    },
    NotificationScreen: {
      screen: NotificationScreen,
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.notifications'),
      }),
    },
    AnnouncementScreen: {
      screen: AnnouncementScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    EcoIdSelectResidentScreen: {
      screen: EcoIdSelectResidentScreen,
      navigationOptions: () => {
        return {
          ...lightNavigationOptions,
          headerTitle: i18n.t('headers.ecoIdSynchronization'),
        };
      },
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.settings'),
      }),
    },
    ResidenceSelectionScreen: {
      screen: ResidenceSelectionScreen,
      navigationOptions: () => {
        return {
          ...lightNavigationOptions,
          headerTitle: i18n.t('headers.householdSelectionScreen'),
        };
      },
    },
    ResidenceScreen: {
      screen: ResidenceScreen,
      navigationOptions: { headerShown: false },
    },
    EcoIdPaymentHistoryScreen: {
      screen: EcoIdPaymentHistoryScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    EcoIdPreparePaymentScreen: {
      screen: EcoIdPreparePaymentScreen,
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.prepareBillPayment'),
      }),
    },
    DncElectricBillScreen: {
      screen: ElectricBillScreen,
      navigationOptions: ({ navigation }) => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.electricBill'),
        headerRight: () => {
          return (
            <IconButton
              iconName="watch-later"
              iconSize={22}
              onPress={() => {
                navigation.navigate('DncPaymentHistoryScreen');
              }}
              iconColor={applicationColors.neutral.shade500}
              type="clear"
            />
          );
        },
      }),
    },
    DncAddNewCustomerCodeScreen: {
      screen: AddNewCustomerCodeScreen,
      navigationOptions: ({ navigation }) => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.electricPayment'),
        headerLeft: () => {
          const backScreen = navigation.getParam('backScreen');
          return (
            <HeaderBackIcon
              color={applicationColors.neutral.shade900}
              onPress={() =>
                navigation.navigate(backScreen || 'DncElectricBillScreen')
              }
            />
          );
        },
      }),
    },
    DncListBillsByCustomerCodeScreen: {
      screen: ListBillsByCustomerCodeScreen,
      navigationOptions: ({ navigation }) => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.electricPayment'),
        headerRight: () => {
          return (
            <IconButton
              iconName="watch-later"
              iconSize={22}
              onPress={() => {
                navigation.navigate('DncPaymentHistoryScreen');
              }}
              iconColor={applicationColors.neutral.shade500}
              type="clear"
            />
          );
        },
      }),
    },
    DncBillPrePaymentScreen: {
      screen: PrepayBillDetails,
      navigationOptions: () => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.electricPayment'),
      }),
    },
    DncBillPaymentScreen: {
      screen: BillPaymentScreen,
      navigationOptions: () => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.payment'),
      }),
    },
    DncBillPaymentSuccessfullScreen: {
      screen: DncBillPaymentSuccessfullScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    DncBillPaymentFailureScreen: {
      screen: DncBillPaymentFailureScreen,
      navigationOptions: () => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.paymentFailure'),
      }),
    },
    DncPaymentHistoryScreen: {
      screen: DncPaymentHistoryScreen,
      navigationOptions: () => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.electricPaymentHistory'),
      }),
    },
    ManageCalendarScreen: {
      screen: ManageCalendarScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    OrderHandoverScreen: {
      screen: OrderHandoverScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    OrderSuccessScreen: {
      screen: OrderSuccessScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    SurveyScreen: {
      screen: SurveyScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'UserProfile',
    defaultNavigationOptions: config.navigationConfig,
  },
);
