import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../style.css';
import DateUtils from '../../../../../../utils/date';
import Text from '../../../../../../components/Text';
import UserInformationBar from '../../../../../../components/UserInformationBar';
import { CardType } from '../../../../../../components/Card/types';
import DashedLine from '../../../../../../components/DashedLine';

import CardBookmarkCount from '../../../CardBookmarkCount';
import HTMLView from '../../../../../../components/HTMLView';
import Heading from '../../../../../../components/Heading';
import PromotionTag from '../../../../../../components/Card/components/CardPromotion/components/PromotionTag';

interface TopPromotionCardProps {
  card: CardType;
  onMerchantProfilePress: () => void;
}

// The top component of promotion card
export default function TopPromotionCard(props: TopPromotionCardProps) {
  const { card, onMerchantProfilePress } = props;
  const i18n = useTranslation();
  return (
    <View style={styles.topContainer}>
      <View style={styles.row}>
        {card.promotion && (
          <PromotionTag
            i18n={i18n}
            promotion={card.promotion}
            style={styles.couponTag}
          />
        )}
        <Text style={styles.expire} fontSize="small">
          {i18n.t('features.directory.promotions.expiredAt')}
          {card.expiry && (
            <Text style={styles.expiredDate} fontSize="small">
              {` ${DateUtils.getDateString(
                card.expiry,
                DateUtils.MOMENT_FORMATS.FULL_DATE,
              )}`}
            </Text>
          )}
        </Text>
      </View>
      <Heading style={styles.title} bold="bold" size="h3">
        {card.title}
      </Heading>
      {!isLixi(card) && (
        <CardBookmarkCount
          bookmarkCount={card.bookmarkCount}
          style={styles.favoriteCount}
        />
      )}
      <UserInformationBar
        avatar={card.merchant?.logo!}
        name={card.merchant?.name!}
        onClick={onMerchantProfilePress}
      />

      <View style={styles.description}>
        <HTMLView html={card.description} />
      </View>
      <DashedLine type="bottom" style={styles.topDash} />
    </View>
  );
}

export function isLixi(card: CardType) {
  return (
    card.promotion?.promotionType === 'lixi' ||
    card.promotion?.promotionType === 'voucher' ||
    card.promotion?.promotionType === 'gift'
  );
}
