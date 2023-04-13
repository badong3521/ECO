import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CardType } from '../../../../components/Card/types';
import Heading from '../../../../components/Heading';
import IconButton from '../../../../components/IconButton';
import Icon from '../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';
import Text from '../../../../components/Text';
import CardInfoBox from '../CardInfoBox';
import styles from './style.css';
import CardBookmarkCount from '../CardBookmarkCount';
import HTMLView from '../../../../components/HTMLView';
import UserInformationBar from '../../../../components/UserInformationBar';
import Badge from '../../../../components/Badge';

interface EventProps {
  card: CardType;
  onPressLink: (url: string) => void;
  onMerchantProfilePress: (merchantCardId: number) => void;
}

// Render the description of a card where type is "CardEvent"
export default function CardDescriptionEvent(props: EventProps) {
  const { card, onPressLink, onMerchantProfilePress } = props;
  const i18n = useTranslation();

  // Simply emit press up to parent
  const emitLink = () => onPressLink(card.websiteLink!);

  function onMerchantPress() {
    if (card.merchant?.profileCard?.id) {
      onMerchantProfilePress(card.merchant?.profileCard.id);
    }
  }
  return (
    <View style={styles.container}>
      <CardInfoBox>
        <View style={styles.infoBoxContainer}>
          <View style={styles.badgeContainer}>
            <Badge
              type="clear"
              text={i18n.t('features.directory.event.events')}
              color={applicationColors.neutral.shade700}
              textColor={applicationColors.neutral.shade700}
            />
          </View>
          <View style={styles.titleContainer}>
            <Heading style={styles.title} size="h3" bold="bold">
              {card.title}
            </Heading>
            <View style={styles.websiteButton}>
              {!!card.websiteLink && (
                <IconButton
                  iconName="link"
                  onPress={emitLink}
                  iconColor="white"
                  buttonBackgroundColor={applicationColors.secondary.shade300}
                  type="button"
                  padding={5}
                  iconSize={30}
                />
              )}
            </View>
          </View>
          <View style={styles.eventInformationContainer}>
            <View style={styles.eventTimeContainer}>
              <Icon
                name="alarm"
                size={applicationDimensions.iconSizeSmall}
                color="black"
              />
              <View style={styles.timeContainer}>
                {card.event!.startTime && (
                  <Text fontSize="small">{card.event!.startTime}</Text>
                )}
                {card.event!.endTime && (
                  <Text fontSize="small">{card.event!.endTime}</Text>
                )}
              </View>
            </View>
            <View style={styles.eventLocationContainer}>
              <Icon
                name="room"
                size={applicationDimensions.iconSizeSmall}
                color="black"
              />
              <View style={styles.timeContainer}>
                <Text fontSize="small">{card.event!.address}</Text>
              </View>
            </View>
            <CardBookmarkCount
              bookmarkCount={card.bookmarkCount}
              style={styles.favoriteCount}
            />
          </View>
        </View>
      </CardInfoBox>
      {card.merchant && (
        <View style={styles.merchant}>
          <UserInformationBar
            onClick={onMerchantPress}
            avatar={card.merchant?.logo}
            name={card.merchant?.name}
          />
        </View>
      )}
      <View style={styles.body}>
        <HTMLView html={card.description} />
      </View>
    </View>
  );
}
