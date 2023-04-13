import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/vi';
import styles from './style.css';
import Text from '../../../Text';
import IconComponent from '../../../Icon';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';
import Image from '../../../Image';
import UserInformationBar from '../../../UserInformationBar';
import Badge from '../../../Badge';
import Button from '../../../Button';
import { CardType, MerchantType } from '../../types';
import { LanguageType } from '../../../../features/User/reducers';

interface CardEventProps {
  card: CardType;
  onCardPress: (card: CardType) => void;
  onCardMerchantPress: (merchant?: MerchantType) => void;
  language: LanguageType;
}
// Display overview of EventCard in the List
function CardEvent(props: CardEventProps) {
  const { card, onCardPress, language, onCardMerchantPress } = props;
  const i18n = useTranslation();

  function onPress() {
    onCardPress(card);
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.startTime}>
            {getDisplayStartDate(
              i18n,
              language,
              card.event?.startTime,
              card.event?.endTime,
            )}
          </Text>
          {card.event?.ecoparkRegion && (
            <View style={styles.locationContainer}>
              <Text style={styles.location}>
                {card.event?.ecoparkRegion.name}
              </Text>
              <IconComponent
                color={applicationColors.primary.shade500}
                size={applicationDimensions.iconSize}
                name="map-pin"
                iconPack="feather"
              />
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.leftConnect} />
          <View style={styles.rightConnect} />
          <Image
            uri={card.photoCover}
            resizeMode="cover"
            style={styles.image}
          />
          <Text style={styles.title} bold="bold">
            {card.title}
          </Text>
          <View style={styles.row}>
            {card.merchant && (
              <View style={styles.merchant}>
                <UserInformationBar
                  onClick={() => onCardMerchantPress(card.merchant)}
                  size="small"
                  avatar={card.merchant.logo}
                  name={card.merchant.name}
                />
              </View>
            )}
            {card.merchant?.isOfficial && (
              <Badge
                type="fill"
                color={applicationColors.semantic.success.shade100}
                textColor={applicationColors.semantic.success.shade500}
                text={i18n.t('features.home.official')}
                bold="bold"
              />
            )}
          </View>
          <Button
            type="secondary"
            title={i18n.t('features.home.joinNow')}
            onPress={onPress}
            uppercase={false}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function getDisplayStartDate(
  i18n: UseTranslationResponse,
  language: LanguageType,
  startDate?: string,
  endDate?: string,
): string {
  moment.locale(language === 'vn' ? 'vi' : language);
  if (!startDate) return '';
  const start: Date = moment(startDate, 'HH:mm DD-MM-yyyy').toDate();
  const end: Date = moment(endDate, 'HH:mm DD-MM-yyyy').toDate();
  return `${i18n.t(
    `date.daysOfWeek.${
      Object.keys(
        i18n.t('date.daysOfWeek', {
          returnObjects: true,
        }),
      )[start.getDay()]
    }`,
  )}\n${moment(start).format('Do MMM')} - ${moment(end).format('Do MMM')}`;
}

export default React.memo(
  CardEvent,
  (prevProps, nextProps) =>
    nextProps.card === prevProps.card &&
    nextProps.language === prevProps.language,
);
