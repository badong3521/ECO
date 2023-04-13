import React from 'react';
import { View } from 'react-native';
import { UseTranslationResponse } from 'react-i18next';
import styles from './style.css';
import Image from '../../../Image';
import UserInformationBar from '../../../UserInformationBar';
import Text from '../../../Text';
import { CardType, MerchantType } from '../../types';
import TouchableComponent from '../../../TouchableComponent';
import Badge from '../../../Badge';
import { applicationColors } from '../../../../../style.css';

interface CardNewsProps {
  card: CardType;
  onCardPress: (card: CardType) => void;
  onCardMerchantPress: (merchant?: MerchantType) => void;
  i18n: UseTranslationResponse;
  type: 'box' | 'clear';
}

// Display overview conetnt of News Card in the list
function CardNews(props: CardNewsProps) {
  const { card, onCardPress, i18n, type, onCardMerchantPress } = props;

  return (
    <TouchableComponent onPress={() => onCardPress(card)}>
      <View style={styles[type]}>
        <Image
          uri={card.photoCover || ''}
          resizeMode="cover"
          style={styles[`image_${type}`]}
        />
        <View style={styles[`infoContainer_${type}`]}>
          <View style={styles.row}>
            {card.merchant && (
              <View style={styles.merchant}>
                <UserInformationBar
                  size="small"
                  avatar={card.merchant?.logo}
                  onClick={() => onCardMerchantPress(card.merchant)}
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
          <Text style={styles.title} bold="bold" numberOfLines={2}>
            {card.title}
          </Text>
          <Text fontSize="small" style={styles.date}>
            {card.createdAt}
          </Text>
        </View>
      </View>
    </TouchableComponent>
  );
}

export default React.memo(
  CardNews,
  (prevProps, nextProps) =>
    nextProps.card === prevProps.card && nextProps.i18n === prevProps.i18n,
);
