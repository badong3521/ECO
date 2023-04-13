import React from 'react';
import { View } from 'react-native';
import { UseTranslationResponse } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styles from './style.css';
import Heading from '../../../../../../components/Heading';
import Text from '../../../../../../components/Text';
import IconComponent from '../../../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';
import { CardType } from '../../../../../../components/Card/types';
import DateUtils from '../../../../../../utils/date';
import TouchableComponent from '../../../../../../components/TouchableComponent';

const NO_SPECIAL_EVENT_IMAGE = require('../../../../../../assets/home/event/no_special_events.png');

interface PickedEventsCardProps {
  events?: CardType[];
  onCardPress: (card: CardType) => void;
  i18n: UseTranslationResponse;
}

function PickedEventsCard(props: PickedEventsCardProps) {
  const { events, onCardPress, i18n } = props;

  function renderEvent(event: CardType) {
    return (
      <TouchableComponent onPress={() => onCardPress(event)} key={event.id}>
        <View style={styles.eventContainer}>
          <View style={styles.indicator} />
          <Text fontSize="small" style={styles.eventName} numberOfLines={2}>
            {event.title}
          </Text>
          <IconComponent
            name="chevron-right"
            iconPack="feather"
            size={applicationDimensions.iconSize}
            color={applicationColors.primary.shade900}
          />
        </View>
      </TouchableComponent>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Heading size="h2" bold="bold" style={styles.month}>
          {DateUtils.getDateString(
            events ? events[0].event!.endTime : new Date(),
            DateUtils.MOMENT_FORMATS.MONTH,
            DateUtils.MOMENT_FORMATS.DATE_TIME,
          ).toUpperCase()}
        </Heading>
        <Text>
          {DateUtils.getDateString(
            events ? events[0].event!.endTime : new Date(),
            DateUtils.MOMENT_FORMATS.YEAR,
            DateUtils.MOMENT_FORMATS.DATE_TIME,
          )}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.eventsContainer}>
        {events && (
          <Text bold="bold">
            {i18n.t('features.directory.event.specialEvents')}
          </Text>
        )}
        {events ? (
          events.map(event => renderEvent(event))
        ) : (
          <View style={styles.noSpecialEvent}>
            <FastImage
              source={NO_SPECIAL_EVENT_IMAGE}
              style={styles.noEventLogo}
              resizeMode="contain"
            />
            <Text style={styles.noSpecialEventsText}>
              {i18n.t('features.directory.event.noSpecialEvents')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default React.memo(
  PickedEventsCard,
  (prevProps, nextProps) => prevProps.events === nextProps.events,
);
