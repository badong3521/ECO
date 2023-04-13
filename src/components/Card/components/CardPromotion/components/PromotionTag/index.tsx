import { View, ViewStyle } from 'react-native';
import React from 'react';
import { UseTranslationResponse } from 'react-i18next';
import Text from '../../../../../Text';
import styles from '../../style.css';
import { PromotionType } from '../../../../types';

interface PromotionTagProps {
  i18n: UseTranslationResponse;
  promotion: PromotionType;
  style?: ViewStyle;
}

// Tag Component for type of Promotion
function PromotionTag(props: PromotionTagProps) {
  const { i18n, promotion, style } = props;
  return (
    <View style={[styles.couponTag, style]}>
      <Text
        adjustsFontSizeToFit
        style={styles.couponText}
        fontSize="small"
        bold="bold"
        numberOfLines={1}
      >
        {getPromotionTypeText(i18n, promotion)}
      </Text>
    </View>
  );
}

function getPromotionTypeText(
  i18n: UseTranslationResponse,
  promotion?: PromotionType,
): string {
  switch (promotion?.promotionType) {
    case 'buy_get':
      return i18n.t('features.directory.promotions.types.buy_get', {
        buy: promotion?.buyGetBuy,
        get: promotion?.buyGetFree,
      });
    case 'only_from':
      return i18n.t('features.directory.promotions.types.only_from', {
        price: promotion?.onlyFrom,
      });
    case 'percent_off':
      return i18n.t('features.directory.promotions.types.percent_off', {
        percent: promotion?.percentOff,
      });
    case 'percent_off_upto':
      return i18n.t('features.directory.promotions.types.percent_off_upto', {
        percent: promotion?.percentOffUpto,
      });
    case 'same_price':
      return i18n.t('features.directory.promotions.types.same_price', {
        price: promotion?.samePrice,
      });
    case 'lixi':
      if (promotion?.lixiAmount && promotion.lixiAmount === '1million') {
        return i18n.t('features.directory.promotions.types.1million');
      }
      return promotion?.lixiAmount || '';
    case 'gift':
      return i18n.t('features.directory.promotions.types.gift');
    case 'voucher':
      return i18n.t('features.directory.promotions.types.voucher');
    default:
      return '';
  }
}

export default React.memo(
  PromotionTag,
  (prevProps, nextProps) =>
    nextProps.promotion === prevProps.promotion &&
    nextProps.i18n === prevProps.i18n &&
    nextProps.style === prevProps.style,
);
