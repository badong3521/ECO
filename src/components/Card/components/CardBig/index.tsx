import React from 'react';
import { CardType } from '../../types';
import CardBigPromotion from './components/CardBigPromotion';
import CardBigNormal from './components/CardBigNormal';

interface CardProps {
  card: CardType;
  onCardPress: (card: CardType) => void;
}

export default function CardBig(props: CardProps) {
  const { card, onCardPress } = props;

  return card.type === 'CardPromotion' ? (
    <CardBigPromotion card={card} onCardPress={onCardPress} />
  ) : (
    <CardBigNormal card={card} onCardPress={onCardPress} />
  );
}
