import { View } from 'react-native';
import React from 'react';
import { UseTranslationResponse } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { applicationColors } from '../../../../../style.css';
import Image from '../../../Image';
import Text from '../../../Text';
import { CardType, MerchantType } from '../../types';
import TouchableComponent from '../../../TouchableComponent';
import styles from './style.css';
import UserInformationBar from '../../../UserInformationBar';
import DateUtils from '../../../../utils/date';
import PromotionTag from './components/PromotionTag';

const LIXI_IMAGE = require('../../../../assets/images/lixi_promotion.png');

interface PropTypes {
  card: CardType;
  onCardPress: (card: CardType) => void;
  onCardMerchantPress: (merchant?: MerchantType) => void;
  i18n: UseTranslationResponse;
}

function CardPromotion(props: PropTypes) {
  const { card, onCardPress, i18n, onCardMerchantPress } = props;

  function getCardImage() {
    /* eslint-disable react/prop-types */
    if (card.promotion?.promotionType === 'lixi') {
      return (
        <FastImage style={styles.logo} source={LIXI_IMAGE} resizeMode="cover" />
      );
    }
    return (
      <Image
        style={styles.logo}
        uri={card.photoCover || ''}
        resizeMode="cover"
      />
    );
    /* eslint-enable react/prop-types */
  }

  return (
    <TouchableComponent onPress={() => onCardPress(card)}>
      <View style={styles.container}>
        {getCardImage()}
        <View style={styles.infoContainer}>
          <View>
            {card.merchant && (
              <UserInformationBar
                onClick={() => onCardMerchantPress(card.merchant)}
                avatar={card.merchant?.logo}
                name={card.merchant?.name}
                size="small"
                color={applicationColors.neutral.shade700}
                nameNumberLines={1}
              />
            )}
            <Text style={styles.title} numberOfLines={1}>
              {card.title}
            </Text>
          </View>
          <Text fontSize="small" style={styles.expired}>
            {i18n.t('features.directory.promotions.expired')}
            <Text style={styles.expiredDate} fontSize="small">
              {`  ${DateUtils.getDateString(
                card.expiry,
                DateUtils.MOMENT_FORMATS.FULL_DATE,
              )}`}
            </Text>
          </Text>
        </View>

        {card.promotion?.promotionType && (
          <PromotionTag i18n={i18n} promotion={card.promotion} />
        )}
      </View>
    </TouchableComponent>
  );
}

export default React.memo(
  CardPromotion,
  (prevProps, nextProps) =>
    nextProps.card === prevProps.card &&
    nextProps.i18n === prevProps.i18n &&
    nextProps.onCardPress === prevProps.onCardPress &&
    nextProps.onCardMerchantPress === prevProps.onCardMerchantPress,
);
