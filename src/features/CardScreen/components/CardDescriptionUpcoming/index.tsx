import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CardType } from '../../../../components/Card/types';
import Heading from '../../../../components/Heading';
import UserInformationBar from '../../../../components/UserInformationBar';
import Text from '../../../../components/Text';
import Badge from '../../../../components/Badge';
import styles from './style.css';
import CardBookmarkCount from '../CardBookmarkCount';

interface CardDescriptionUpcomingProps {
  card: CardType;
  onPressMerchant: (merchantCardId: number) => void;
}

// Render the description of a card where type is "CardUpcoming"
export default function CardDescriptionUpcoming(
  props: CardDescriptionUpcomingProps,
) {
  const { card, onPressMerchant } = props;
  const i18n = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <Badge
          type="clear"
          text={i18n.t('features.cardScreen.upcoming')}
          color="black"
        />
      </View>
      <Heading style={styles.title} size="h1" bold="bold">
        {card.title}
      </Heading>
      <View style={styles.infoWrapper}>
        <Text style={styles.createdAt} fontSize="tiny" italic>
          {card.createdAt}
        </Text>
        <CardBookmarkCount bookmarkCount={card.bookmarkCount} />
      </View>
      <View style={styles.userInformationContainer}>
        <UserInformationBar
          avatar={card.merchant?.logo!}
          name={card.merchant?.name!}
          onClick={() => {
            onPressMerchant(card.merchant?.id!);
          }}
        />
      </View>
      <View style={styles.body}>
        <Text fontSize="small">{card.description}</Text>
      </View>
    </View>
  );
}
