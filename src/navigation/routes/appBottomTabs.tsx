import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { applicationColors, navigationColors } from '../../../style.css';
import i18n from '../../i18n';
import appRoutes from './appRoutes';
import appBusRoutes from './appBusRoutes';
import appUserRoutes from './appUserRoutes';
import { bottomTabNavigationOptions } from '../../config/navigation';

export default createMaterialBottomTabNavigator(
  {
    Landing: {
      screen: appRoutes,
      navigationOptions: () =>
        bottomTabNavigationOptions(
          'home',
          i18n.t('bottomNavigation.labels.homeScreen'),
        ),
    },
    BusLanding: {
      screen: appBusRoutes,
      navigationOptions: () =>
        bottomTabNavigationOptions(
          'directions-bus',
          i18n.t('bottomNavigation.labels.bus'),
        ),
    },
    UserProfile: {
      screen: appUserRoutes,
      navigationOptions: () =>
        bottomTabNavigationOptions(
          'person',
          i18n.t('bottomNavigation.labels.profile'),
        ),
    },
  },
  {
    inactiveColor: navigationColors.inactiveTab,
    activeColor: navigationColors.activeTab,
    barStyleLight: {
      backgroundColor: applicationColors.primary.white,
    },
    sceneAnimationEnabled: true,
    initialRouteName: 'Landing',
    labeled: true,
  },
);
