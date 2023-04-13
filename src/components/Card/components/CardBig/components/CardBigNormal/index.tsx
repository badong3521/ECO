import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import { CardType } from '../../../../types';
import TouchableComponent from '../../../../../TouchableComponent';
import IconFeatured from '../../../../../IconFeatured';
import Image from '../../../../../Image';
import Heading from '../../../../../Heading';
import Badge from '../../../../../Badge';
import Icon from '../../../../../Icon';
import { useUserState } from '../../../../../../features/User/reducers';
import ImagePlaceholder from '../../../../../ImagePlaceholder';

interface CardBigNormalProps {
  card: CardType;
  onCardPress: (card: CardType) => void;
}

export default function CardBigNormal(props: CardBigNormalProps) {
  const { card, onCardPress } = props;
  const { i18n } = useTranslation();
  const [userState] = useUserState();

  return (
    <View style={styles.wrapper}>
      <TouchableComponent
        onPress={() => {
          onCardPress(card);
        }}
        useForeground
      >
        <View style={styles.cardContainer}>
          <ImagePlaceholder />
          <Image
            uri={card.verticalCover ? card.verticalCover : card.photoCover}
            resizeMode="cover"
            style={styles.backgroundImage}
          />
          <LinearGradient
            colors={['transparent', 'black']}
            start={{ x: 0, y: 0.65 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientContainer}
          >
            <View style={styles.bottomInformation}>
              <View style={styles.iconContainer}>
                {card.featured && (
                  <IconFeatured
                    type="badge"
                    text={i18n.t('components.card.featured')}
                  />
                )}
                <Badge
                  type="clear"
                  text={card.category.name[userState.userLanguage]}
                />
              </View>
              <View style={styles.row}>
                <Heading style={styles.cardTitle} size="h3" bold="semiBold">
                  {card.title}
                </Heading>
                <Icon name="keyboard-arrow-right" size={25} color="white" />
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableComponent>
    </View>
  );
}
