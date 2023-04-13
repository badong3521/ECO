import React from 'react';
import { View } from 'react-native';
import { applicationDimensions } from '../../../../../../../style.css';
import Background from '../../../../../../assets/ecoid/svg/household-card-background.svg';
import TouchableComponent from '../../../../../../components/TouchableComponent';
import IconComponent from '../../../../../../components/Icon';
import { ResidentType } from '../../../../../../services/api/types/ecoid';
import styles from './style.css';
import Text from '../../../../../../components/Text';

interface PropTypes {
  onPress: () => void;
  resident: ResidentType;
}

export default function ResidenceCard(props: PropTypes) {
  const { onPress, resident } = props;
  return (
    <TouchableComponent onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.background}>
          <Background width="100%" />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <Text bold="bold" style={styles.text}>
                  {resident.areaName!}
                </Text>
              </View>
              <View style={styles.rowItem}>
                <Text bold="bold" style={styles.locationCode}>
                  {resident.locationCode!}
                </Text>
              </View>
            </View>
          </View>
          <IconComponent
            style={styles.actionIcon}
            size={applicationDimensions.iconSize}
            name="chevron-right"
          />
        </View>
      </View>
    </TouchableComponent>
  );
}
