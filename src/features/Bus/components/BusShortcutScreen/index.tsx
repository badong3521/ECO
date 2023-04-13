import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import IconButton from '../../../../components/IconButton';
import { useUserState } from '../../../User/reducers';
import {
  SearchState,
  useStandardSearchState,
} from '../../reducers/standardSearch';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';
import Icon from '../../../../components/Icon';
import { useBusState } from '../../reducers/bus';
import FavoriteLocationApi from '../../../../services/api/favoriteLocation';

interface BusShortcutScreenPropTypes {
  navigation: any;
}

export default function BusShortcutScreen(props: BusShortcutScreenPropTypes) {
  const { i18n } = useTranslation();
  const { navigation } = props;
  const { params = {} } = navigation.state;
  const [userState] = useUserState();
  const [, standardStateActions] = useStandardSearchState();
  const [busState, busActions] = useBusState();
  const { defaultShortcuts } = busState;
  const { favoriteBusLocations } = userState;
  const favoriteLocationApi = new FavoriteLocationApi();

  async function deleteFavoriteLocation(id: number) {
    await favoriteLocationApi.deleteFavoriteLocation(id);
    await favoriteLocationApi.fetchFavoriteBusLocations();
  }

  const onDeleteShortcutPress = (id: number) => {
    deleteFavoriteLocation(id);
  };

  const onSetShortcutPress = (name: string) => {
    navigation.navigate('BusLanding', {
      isEditingBusShortcuts: true,
    });
    standardStateActions.setSearchState(SearchState.SEARCHING);
    busActions.setEditingShortcut(name);
  };

  const renderDefaultShortcuts = () => {
    return defaultShortcuts.map((shortcut, index) => {
      const temp = favoriteBusLocations?.find(
        location => location.name === shortcut,
      );
      let topRow;
      let bottomRow;
      if (temp) {
        // noinspection PointlessBooleanExpressionJS
        topRow = params.isEditingBusShortcuts ? (
          <Button
            onPress={() => onSetShortcutPress(shortcut)}
            title={i18n.t('features.busScreen.shortcuts.edit')}
            type="text"
            uppercase={false}
            fontColor="dark"
          />
        ) : (
          undefined
        );
        bottomRow = (
          <View style={styles.bottom}>
            <View style={styles.addressText}>
              <Text numberOfLines={1}>{temp.location.address || ''}</Text>
            </View>
            {params.isEditingBusShortcuts && (
              <View style={styles.deleteAddress}>
                <IconButton
                  onPress={() => onDeleteShortcutPress(temp.id)}
                  iconName="delete"
                  iconColor={applicationColors.neutral.shade900}
                />
              </View>
            )}
          </View>
        );
      } else {
        topRow = (
          <Button
            icon={() => (
              <Icon
                size={applicationDimensions.iconSize}
                name={shortcut}
                iconPack="material"
                color={applicationColors.primary.shade900}
              />
            )}
            type="secondary"
            title={`Set ${shortcut}`}
            uppercase={false}
            onPress={() => onSetShortcutPress(shortcut)}
          />
        );
      }
      return (
        <View key={index.toString()}>
          <View style={styles.wrapper}>
            <View style={styles.top}>
              <Text bold="bold">{`${shortcut.charAt(0).toUpperCase() +
                shortcut.slice(1)}`}</Text>
              {topRow}
            </View>
            {bottomRow}
          </View>
          <View style={styles.bigDivider} />
        </View>
      );
    });
  };

  return <>{renderDefaultShortcuts()}</>;
}
