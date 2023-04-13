import React from 'react';
import { View } from 'react-native';
import { CardType } from '../../../../components/Card/types';
import Heading from '../../../../components/Heading';
import UserInformationBar from '../../../../components/UserInformationBar';
import Text from '../../../../components/Text';
import styles from './style.css';
import CardBookmarkCount from '../CardBookmarkCount';
import HTMLView from '../../../../components/HTMLView';

interface NewsProps {
  card: CardType;
  onMerchantProfilePress: (merchantCardId: number) => void;
}

// Render the description of a card where type is "CardNews"
export default function CardDescriptionNews(props: NewsProps) {
  const { card, onMerchantProfilePress } = props;

  function onMerchantPress() {
    onMerchantProfilePress(card.merchant?.profileCard.id!);
  }

  return (
    <View style={styles.container}>
      <Heading style={styles.title} size="h1" bold="bold">
        {card.title}
      </Heading>
      <View style={styles.infoWrapper}>
        <Text style={styles.createdAt} fontSize="tiny" italic>
          {card.createdAt}
        </Text>
        <CardBookmarkCount
          style={styles.favoriteCount}
          bookmarkCount={card.bookmarkCount}
        />
      </View>
      <View style={styles.userInformationContainer}>
        <UserInformationBar
          avatar={card.merchant?.logo || ''}
          name={card.merchant?.name || ''}
          onClick={onMerchantPress}
        />
      </View>
      <View style={styles.body}>
        <HTMLView html={card.description} />
      </View>
    </View>
  );
}
