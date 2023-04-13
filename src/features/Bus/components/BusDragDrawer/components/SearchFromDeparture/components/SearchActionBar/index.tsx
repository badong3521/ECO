import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
  applicationStyle,
} from '../../../../../../../../../style.css';
import SearchBarIndicators from '../SearchBarIndicators';
import SearchBar from '../../../../../../../../components/SearchBar';
import Button from '../../../../../../../../components/Button';
import { SearchbarType } from '../../../../../../types';
import Icon from '../../../../../../../../components/Icon';

interface SearchActionBarProps {
  onBackPress: () => void;
  departureText: string;
  departureHintText: string;
  departureHintColor: string;
  destinationText: string;
  destinationHintText: string;
  destinationHintColor: string;
  onClearText: (type: SearchbarType) => void;
  onFocusChange: (focus: boolean, type: SearchbarType) => void;
  onSubmitSearch: (text: string, type: SearchbarType) => void;
  onSwapLocation: () => void;
  onCurrentLocationPress: () => void;
  onChooseOnMapPress: () => void;
  isSearching: boolean;
}

export default function SearchActionBar(props: SearchActionBarProps) {
  const {
    onBackPress,
    departureText,
    departureHintText,
    departureHintColor,
    destinationText,
    destinationHintText,
    destinationHintColor,
    onClearText,
    onFocusChange,
    onSubmitSearch,
    onSwapLocation,
    onCurrentLocationPress,
    onChooseOnMapPress,
    isSearching,
  } = props;
  const int18 = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <IconButton
          icon={applicationIcons.back}
          onPress={onBackPress}
          color={applicationColors.neutral.shade900}
        />

        <SearchBarIndicators />

        <View style={styles.inputs}>
          <SearchBar
            style={styles.input}
            text={departureText}
            hintText={departureHintText}
            hintColor={departureHintColor}
            onClearText={() => onClearText('departure')}
            onFocusChange={f => onFocusChange(f, 'departure')}
            onSubmitEditing={t => onSubmitSearch(t, 'departure')}
          />
          <SearchBar
            style={styles.input}
            text={destinationText}
            hintText={destinationHintText}
            hintColor={destinationHintColor}
            onClearText={() => onClearText('destination')}
            onFocusChange={f => onFocusChange(f, 'destination')}
            onSubmitEditing={t => onSubmitSearch(t, 'destination')}
          />
        </View>
        <IconButton
          icon="import-export"
          onPress={onSwapLocation}
          color={applicationColors.primary.shade900}
        />
      </View>
      {isSearching && (
        <>
          <View style={styles.buttons}>
            <Button
              containerStyle={styles.currentLocationButton}
              icon={() => (
                <Icon
                  name="my-location"
                  iconPack="material"
                  size={applicationDimensions.iconSize}
                />
              )}
              title={int18.t(
                'features.busScreen.searchDestination.currentLocation',
              )}
              fontColor="dark"
              type="clear"
              uppercase={false}
              color={applicationColors.semantic.info.shade500}
              labelStyle={styles.currentLocationText}
              onPress={onCurrentLocationPress}
            />
            <Button
              icon="add-location"
              containerStyle={styles.chooseOnMapButton}
              type="clear"
              title={int18.t(
                'features.busScreen.searchDestination.chooseOnMap',
              )}
              onPress={onChooseOnMapPress}
              fontColor="dark"
              color={applicationColors.neutral.shade900}
              uppercase={false}
            />
          </View>
        </>
      )}
      {isSearching && <View style={applicationStyle.bigDivider} />}
    </View>
  );
}
