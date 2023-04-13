import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import { CardType } from '../../../../types';
import Badge from '../../../../../Badge';
import Text from '../../../../../Text';
import IconComponent from '../../../../../Icon';
import IconFeatured from '../../../../../IconFeatured';
import { getExpiredTime } from '../../../../../../utils/date';
import DashedLine from '../../../../../DashedLine';
import UserInformationBar from '../../../../../UserInformationBar';
import TouchableComponent from '../../../../../TouchableComponent';

interface CardBigPromotionProps {
  card: CardType;
  onCardPress: (card: CardType) => void;
}

export default function CardBigPromotion(props: CardBigPromotionProps) {
  const { card, onCardPress } = props;
  const i18n = useTranslation();

  function onPress() {
    onCardPress(card);
  }
  return (
    <TouchableComponent onPress={onPress}>
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: card.colorScheme?.secondary,
          },
        ]}
      >
        <View style={styles.badgeContainer}>
          {card.featured && (
            <IconFeatured
              type="badge"
              text={i18n.t('components.card.featured')}
            />
          )}
          <Badge
            type="clear"
            text={i18n.t('features.cardScreen.coupon')}
            color={card.colorScheme?.primary}
          />
        </View>

        <Text
          style={[styles.title, { color: card.colorScheme?.primary }]}
          bold="bold"
        >
          {card.title}
        </Text>

        <View style={styles.expiredContainer}>
          <IconComponent
            size={14}
            name="alarm"
            color={card.colorScheme?.primary}
          />
          <Text fontSize="small" style={{ color: card.colorScheme?.primary }}>
            {`  ${i18n.t('features.cardScreen.expiredAt')} ${getExpiredTime(
              card.expiry!,
            )}`}
          </Text>
        </View>

        <View
          style={[
            styles.bottom,
            {
              backgroundColor: card.colorScheme?.primary,
            },
          ]}
        >
          <UserInformationBar
            avatar={card.merchant?.logo!}
            name={card.merchant?.name!}
            nameStyle={styles.merchantName}
            onClick={onPress}
          />
          <DashedLine style={styles.dash} />
        </View>
      </View>
    </TouchableComponent>
  );
}
