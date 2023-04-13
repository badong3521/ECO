import { createStackNavigator } from 'react-navigation-stack';
import { IconButton } from 'react-native-paper';
import { View } from 'react-native';
import React from 'react';
import HeaderIconButton from '../../components/IconButton';
import HeaderBackIcon from '../../components/HeaderBackIcon';
import config from '../../config';
import BusScreen from '../../features/Bus';
import BusShortcutScreen from '../../features/Bus/components/BusShortcutScreen';
import i18n from '../../i18n';
import {
  lightNavigationOptions,
  whiteNavigationOptions,
} from '../../config/navigation';
import BusSettingsScreen from '../../features/Bus/components/BusSettingsScreen';
import BusScheduleScreen from '../../features/BusSchedule';
import BusCardScreen from '../../features/Bus/components/BusCardScreen';
import ExtendBusCardScreen from '../../features/Bus/components/ExtendBusCardScreen';
import SyncEcoIdBusCardScreen from '../../features/Bus/components/SyncEcoIdBusCardScreen';
import BusCardInformationScreen from '../../features/Bus/components/BusCardInformationScreen';
import BusCardPriceScreen from '../../features/Bus/components/BusCardPriceScreen';
import BusCardPaymentSuccessfulScreen from '../../features/Bus/components/BusCardPaymentSuccessfulScreen';
import BusCardPaymentFailureScreen from '../../features/Bus/components/BusCardPaymentFailureScreen';

import { applicationColors, applicationDimensions } from '../../../style.css';

export default createStackNavigator(
  {
    BusLanding: {
      screen: BusScreen,
      params: {
        eventScreenName: 'EcobusScreen',
      },
      navigationOptions: () => ({
        headerLeft: () => null,
      }),
    },
    BusSettingsScreen: {
      screen: BusSettingsScreen,
      navigationOptions: () => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.busSettings'),
      }),
    },
    BusShortcutScreen: {
      screen: BusShortcutScreen,
      navigationOptions: ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          ...whiteNavigationOptions,
          headerTitle: i18n.t('headers.busShortcutScreen'),
          headerTitleAlign: 'left',
          headerRight: () => {
            if (params.isEditingBusShortcuts) {
              return (
                <View style={{ flexDirection: 'row' }}>
                  <IconButton
                    icon="done"
                    size={applicationDimensions.iconSize}
                    onPress={() => {
                      navigation.setParams({ isEditingBusShortcuts: false });
                      return null;
                    }}
                    color={applicationColors.primary.white}
                    style={{ marginRight: applicationDimensions.smallPadding }}
                  />
                </View>
              );
            }
            return (
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  icon="edit"
                  size={applicationDimensions.iconSize}
                  onPress={() => {
                    navigation.setParams({ isEditingBusShortcuts: true });
                    return null;
                  }}
                  color={applicationColors.primary.white}
                  style={{ marginRight: applicationDimensions.smallPadding }}
                />
              </View>
            );
          },
        };
      },
    },
    BusScheduleScreen: {
      screen: BusScheduleScreen,
      navigationOptions: () => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.busSchedule'),
      }),
    },
    BusCardScreen: {
      screen: BusCardScreen,
      params: {
        eventScreenName: 'ViewBusTicketScreen',
      },
      // @ts-ignore
      navigationOptions: ({ navigation }) => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.busCardScreen'),
        headerRight: () => {
          return (
            <HeaderIconButton
              iconSize={applicationDimensions.iconSize}
              type="clear"
              onPress={() => navigation.navigate('BusCardInformationScreen')}
              iconName="info"
              iconColor={applicationColors.primary.black}
              iconPack="feather"
            />
          );
        },
        headerLeft: () => (
          <HeaderBackIcon
            color={applicationColors.neutral.shade900}
            onPress={() => navigation.navigate('BusLanding')}
          />
        ),
      }),
    },
    ExtendBusCardScreen: {
      screen: ExtendBusCardScreen,
      navigationOptions: ({ navigation }) => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.extendBusCard'),
        headerRight: () => {
          return (
            <HeaderIconButton
              iconSize={applicationDimensions.iconSize}
              type="clear"
              onPress={() => navigation.navigate('BusCardInformationScreen')}
              iconName="info"
              iconColor={applicationColors.primary.black}
              iconPack="feather"
            />
          );
        },
      }),
    },
    SyncEcoIdBusCardScreen: {
      screen: SyncEcoIdBusCardScreen,
      navigationOptions: () => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.syncBusCard'),
      }),
    },
    BusCardInformationScreen: {
      screen: BusCardInformationScreen,
      params: {
        eventScreenName: 'BusTicketInformationScreen',
      },
      navigationOptions: () => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.busCardInformationScreen'),
      }),
    },
    BusCardPriceScreen: {
      screen: BusCardPriceScreen,
      params: {
        eventScreenName: 'BusTicketPriceScreen',
      },
      navigationOptions: () => ({
        ...lightNavigationOptions,
        headerTitle: i18n.t('headers.busCardPriceChartScreen'),
      }),
    },
    BusCardPaymentSuccessfulScreen: {
      screen: BusCardPaymentSuccessfulScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    BusCardPaymentFailureScreen: {
      screen: BusCardPaymentFailureScreen,
      navigationOptions: ({ navigation }) => ({
        ...whiteNavigationOptions,
        headerTitle: i18n.t('headers.paymentFailure'),
        headerStyle: {
          elevation: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
        headerLeft: () => (
          <HeaderBackIcon
            color={applicationColors.neutral.shade900}
            onPress={() => navigation.navigate('BusCardScreen')}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'BusLanding',
    // @ts-ignore
    defaultNavigationOptions: {
      ...config.navigationConfig,
      headerShown: false,
    },
  },
);
