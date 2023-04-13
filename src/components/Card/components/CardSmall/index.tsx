import React from 'react';
import { View } from 'react-native';
import styles from './style.css';
import { CardType } from '../../types';
import Text from '../../../Text';
import TouchableComponent from '../../../TouchableComponent';
import Icon from '../../../Icon';

interface CardProps {
  card: CardType;
  onCardPress: (card: CardType) => void;
}

export default function CardSmall(props: CardProps) {
  const { card, onCardPress } = props;

  return (
    <View style={styles.wrapper}>
      <TouchableComponent
        onPress={() => {
          onCardPress(card);
        }}
        useForeground
      >
        <View
          style={[
            styles.cardContainer,
            card.backgroundColor
              ? { backgroundColor: card.backgroundColor }
              : null,
          ]}
        >
          <View style={styles.cardContentContainer}>
            <Text style={styles.cardTitle} fontSize="small" bold="bold">
              {card.title}
            </Text>
            {card.subtitle && (
              <Text style={styles.cardSubtitle} fontSize="small">
                {card.subtitle}
              </Text>
            )}
          </View>
          <View style={styles.cardIconContainer}>
            {card.icon && <Icon name={card.icon} size={45} color="white" />}
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
}
