import { FlatList, View } from 'react-native';
import React from 'react';
import { ResidentType } from '../../../../services/api/types/ecoid';
import ResidenceCard, { cardWidth } from './components/ResidenceCard';
import styles from './style.css';
import { applicationDimensions } from '../../../../../style.css';

interface ListEcoIdResidencesProps {
  residences?: ResidentType[];
  onResidentPress: (resident: ResidentType) => void;
}

export default function ListEcoIdResidences(props: ListEcoIdResidencesProps) {
  const { residences, onResidentPress } = props;

  const slideWidth = cardWidth + applicationDimensions.defaultPadding;

  return residences ? (
    <FlatList
      contentContainerStyle={styles.listContent}
      showsHorizontalScrollIndicator={false}
      extraData={props}
      data={residences}
      renderItem={item => (
        <ResidenceCard
          onResidentPress={onResidentPress}
          resident={item.item}
          index={item.index}
          fullWidth={residences?.length === 1}
        />
      )}
      horizontal
      snapToInterval={slideWidth}
      snapToAlignment="start"
      disableIntervalMomentum
      decelerationRate="fast"
      getItemLayout={(data, index) => ({
        length: slideWidth,
        offset: slideWidth * index,
        index,
      })}
    />
  ) : (
    <View />
  );
}
