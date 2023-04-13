import { createStackNavigator } from 'react-navigation-stack';
import config from '../../config';
import LandingScreen from '../../features/HomePage';
import CardScreen from '../../features/CardScreen';
import MerchantSearchScreen from '../../features/Directory/components/MerchantSearchScreen';
import { lightNavigationOptions } from '../../config/navigation';
import AllMerchantScreen from '../../features/Directory/components/AllMerchantScreen';
import MerchantCategoryScreen from '../../features/Directory/components/MerchantCategoryScreen';
import EventCardsScreen from '../../features/Directory/components/EventCardsScreen';
import NewsCardsScreen from '../../features/Directory/components/NewsCardsScreen';
import PromotionCardsScreen from '../../features/Directory/components/PromotionCardsScreen';
import BookmarkScreen from '../../features/BookmarkScreen';
import VaccineRegistrationScreen from '../../features/VaccineRegistration/components/RegistrationForm';
import VaccineDashboard from '../../features/VaccineRegistration/components/VaccineDashboard';
import VaccineRegistrationList from '../../features/VaccineRegistration/components/RegistrationList';
import AfterInjectionUpdateScreen from '../../features/VaccineRegistration/components/AfterInjectionUpdateScreen';
import UpdateNoInjectionScreen from '../../features/VaccineRegistration/components/UpdateNoInjectionScreen';
import UpdateInjectedScreen from '../../features/VaccineRegistration/components/UpdateInjectedScreen';
import HealthFeedbackScreen from '../../features/VaccineRegistration/components/HealthFeedbackScreen';
import i18n from '../../i18n';
import { applicationColors } from '../../../style.css';

export default createStackNavigator(
  {
    Landing: {
      screen: LandingScreen,
      params: {
        eventScreenName: 'HomeScreen',
      },
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    CardScreen: {
      screen: CardScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    AllMerchantScreen: {
      screen: AllMerchantScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    MerchantCategoryScreen: {
      screen: MerchantCategoryScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    MerchantSearchScreen: {
      screen: MerchantSearchScreen,
      params: {
        eventId: 'search_merchant_started',
      },
      navigationOptions: ({ navigation }) => ({
        ...lightNavigationOptions,
        headerTitle: navigation.getParam('title'),
      }),
    },
    EventCardsScreen: {
      screen: EventCardsScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    NewsCardsScreen: {
      screen: NewsCardsScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    PromotionCardsScreen: {
      screen: PromotionCardsScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    BookmarkScreen: {
      screen: BookmarkScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    VaccineRegistrationScreen: {
      screen: VaccineRegistrationScreen,
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerStyle: {
          backgroundColor: applicationColors.primary.white,
        },
        headerShown: false,
        headerTitle: i18n.t('headers.vaccineRegistration'),
      }),
    },
    VaccineDashboard: {
      screen: VaccineDashboard,
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerStyle: {
          backgroundColor: applicationColors.primary.white,
        },
        headerTitle: i18n.t('headers.vaccineDashboard'),
      }),
    },
    VaccineRegistrationList: {
      screen: VaccineRegistrationList,
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerStyle: {
          backgroundColor: applicationColors.primary.white,
        },
        headerTitle: i18n.t('headers.vaccineRegistrationList'),
      }),
    },
    AfterInjectionUpdateScreen: {
      screen: AfterInjectionUpdateScreen,
      navigationOptions: () => {
        return {
          headerShown: false,
        };
      },
    },
    UpdateNoInjectionScreen: {
      screen: UpdateNoInjectionScreen,
      navigationOptions: () => {
        return {
          headerShown: false,
        };
      },
    },
    UpdateInjectedScreen: {
      screen: UpdateInjectedScreen,
      navigationOptions: () => {
        return {
          headerShown: false,
        };
      },
    },
    HealthFeedback: {
      screen: HealthFeedbackScreen,
      navigationOptions: () => {
        return {
          headerShown: false,
        };
      },
    },
  },
  {
    initialRouteName: 'Landing',
    defaultNavigationOptions: config.navigationConfig,
  },
);
