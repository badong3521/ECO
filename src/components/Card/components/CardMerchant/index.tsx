import { View } from 'react-native';
import React from 'react';
import { applicationColors } from '../../../../../style.css';
import Image from '../../../Image';
import Text from '../../../Text';
import Badge from '../../../Badge';
import IconComponent from '../../../Icon';
import { CardType } from '../../types';
import { useUserState } from '../../../../features/User/reducers';
import TouchableComponent from '../../../TouchableComponent';
import styles from './style.css';

interface PropTypes {
  card: CardType;
  onCardPress: (card: CardType) => void;
}

function CardMerchant(props: PropTypes) {
  const { card, onCardPress } = props;
  const { merchant } = card;
  const [userState] = useUserState();
  const { userLanguage } = userState;
  return (
    <TouchableComponent onPress={() => onCardPress(card)}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            uri={card.photoCover || ''}
            resizeMode="cover"
          />
          {merchant?.hasPromotion && (
            <View style={styles.promoBadge}>
              <Text fontSize="tiny" style={styles.promoText}>
                Promo
              </Text>
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text bold="bold" style={styles.merchantName} numberOfLines={1}>
              {card.title || ''}
            </Text>
            <View style={styles.categoryBadgeContainer}>
              <Badge
                style={styles.categoryBadge}
                type="fill"
                color={applicationColors.semantic.error.shade100}
                text={card?.category?.name[userLanguage]}
                textColor={applicationColors.semantic.error.shade500}
              />
            </View>
          </View>
          <View style={styles.addressContainer}>
            <IconComponent
              size={16}
              name="map-pin"
              iconPack="feather"
              color={applicationColors.neutral.shade500}
            />
            <Text style={styles.address} numberOfLines={1} fontSize="small">
              {`${merchant?.streetNumber} ${merchant?.street}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableComponent>
  );
}

export default React.memo(
  CardMerchant,
  (prevProps, nextProps) =>
    nextProps.card === prevProps.card &&
    nextProps.onCardPress === prevProps.onCardPress,
);
