import React from 'react';
import { Linking, Platform, View } from 'react-native';
import { CardType } from '../../../../components/Card/types';
import CardApi from '../../../../services/api/card';
import Loader from '../../../../components/Loader';
import CardDescriptionMerchant from '../CardDescriptionMerchant';
import CardDescriptionEvent from '../CardDescriptionEvent';
import CardDescriptionNews from '../CardDescriptionNews';
import styles from './style.css';
import CardDescriptionPromotion from '../CardDescriptionPromotion';
import { applicationColors } from '../../../../../style.css';
import CardDescriptionUpcoming from '../CardDescriptionUpcoming';
import { ListRef } from '../../../../utils/card';

interface CardDescriptionProps {
  cardLoaded: boolean;
  card: CardType;
  navigation: any;
  listRef: React.RefObject<ListRef>;
}

export default function CardDescription(props: CardDescriptionProps) {
  const { card, cardLoaded, navigation, listRef } = props;
  const cardApi = new CardApi();

  // Open phone app on user's device with given number (for example Merchant phone number)
  function onPressCall(number: string) {
    Linking.openURL(`tel:${number}`);
  }

  // Navigate outside of the app to the given url
  async function onPressLink(url: string) {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.log('Linking error with URL:', url);
    }
  }

  // Open device map application at given location
  async function onPressDirections(latitude: string, longitude: string) {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url!);
  }

  // When the merchant is clicked we have to fetch their profile card
  // and navigate to it
  async function onPressMerchant(merchantCardId: number) {
    const res = await cardApi.fetchCard(merchantCardId, 'CardMerchant');
    if (res.status === 'success') {
      const merchantCard = res.result.data;
      navigation.push('CardScreen', {
        card: merchantCard,
      });
    }
  }

  // eslint-disable-next-line no-nested-ternary
  return cardLoaded ? (
    card.type === 'CardMerchant' ? (
      <CardDescriptionMerchant
        navigation={navigation}
        listRef={listRef}
        card={card}
        onPressCall={onPressCall}
        onPressDirections={onPressDirections}
      />
    ) : (
      <View
        style={[
          styles.descriptionContainer,
          !card.showCoverPhoto ? styles.unsetPaddingTop : null,
          card.type === 'CardPromotion' ? styles.promotionContainer : null,
        ]}
      >
        {card.type === 'CardEvent' && (
          <CardDescriptionEvent
            card={card}
            onPressLink={onPressLink}
            onMerchantProfilePress={onPressMerchant}
          />
        )}
        {card.type === 'CardNews' && (
          <CardDescriptionNews
            card={card}
            onMerchantProfilePress={onPressMerchant}
          />
        )}
        {card.type === 'CardPromotion' && (
          <CardDescriptionPromotion
            card={card}
            onPressMerchant={onPressMerchant}
          />
        )}
        {card.type === 'CardUpcoming' && (
          <CardDescriptionUpcoming
            card={card}
            onPressMerchant={onPressMerchant}
          />
        )}
      </View>
    )
  ) : (
    <View style={styles.descriptionContainer}>
      <Loader
        color={
          card.type === 'CardPromotion'
            ? applicationColors.primary.white
            : applicationColors.primary.shade900
        }
        style={styles.loader}
      />
    </View>
  );
}
