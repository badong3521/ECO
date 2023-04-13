import React, { useState } from 'react';
import { Dimensions, Platform, View, ViewStyle } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles, { photoSize } from './style.css';
import Image from '../../../Image';
import { CardType } from '../../../Card/types';
import TouchableComponent from '../../../TouchableComponent';

interface FeatureCardsProps {
  cards: CardType[];
  onCardPress: (card: CardType) => void;
  style?: ViewStyle;
}

const slideWidth =
  Platform.OS === 'android' ? Dimensions.get('screen').width : photoSize;

// List of Featured cards. It plays to next card automatically.
function FeatureCards(props: FeatureCardsProps) {
  const { cards, onCardPress, style } = props;
  const [currentItem, setCurrentItem] = useState<number>(0);

  function renderItem(card: CardType) {
    return (
      <TouchableComponent onPress={() => onCardPress(card)}>
        <View style={styles.photoContainer}>
          <Image
            uri={card.photoFeatured || card.photoCover}
            resizeMode="cover"
            style={styles.photo}
          />
        </View>
      </TouchableComponent>
    );
  }
  return (
    <View style={[styles.container, style]}>
      <Carousel
        containerCustomStyle={styles.carousel}
        contentContainerCustomStyle={styles.carousel}
        data={cards}
        layout="default"
        renderItem={item => renderItem(item.item)}
        activeSlideAlignment="center"
        sliderWidth={slideWidth}
        itemWidth={slideWidth}
        loop
        autoplay
        onSnapToItem={index => setCurrentItem(index)}
        inactiveSlideScale={1}
        removeClippedSubviews={false}
        inactiveSlideOpacity={1}
        centerContent
      />
      <Pagination
        dotsLength={cards.length}
        activeDotIndex={currentItem}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.inactiveDot}
        dotContainerStyle={styles.dotContainer}
        containerStyle={styles.pagination}
      />
    </View>
  );
}

export default React.memo(
  FeatureCards,
  (prevProps, nextProps) => nextProps.cards === prevProps.cards,
);
