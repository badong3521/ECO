import { View } from 'react-native';
import React from 'react';
import Text from '../../../../../../components/Text';
import styles from '../../style.css';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';
import TouchableComponent from '../../../../../../components/TouchableComponent';
import IconComponent from '../../../../../../components/Icon';
import { ResidentType } from '../../../../../../services/api/types/ecoid';

interface DetectedResidentItemProps {
  resident: ResidentType;
  checked: boolean;
  onPress: () => void;
}

// Item in the residents list
// Containing resident's name and area info
export default function DetectedResidentItem(props: DetectedResidentItemProps) {
  const { checked, onPress, resident } = props;
  const textColor = checked
    ? applicationColors.primary.white
    : applicationColors.secondary.darkGrey;
  const backgroundColor = checked
    ? applicationColors.semantic.info.shade500
    : applicationColors.primary.white;
  const checkboxColor = checked
    ? applicationColors.primary.white
    : applicationColors.secondary.lightGrey;

  return (
    <TouchableComponent onPress={onPress}>
      <View
        style={[
          styles.row,
          {
            backgroundColor,
          },
        ]}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: checkboxColor,
            },
          ]}
        >
          {checked && (
            <IconComponent
              style={styles.checked}
              size={applicationDimensions.iconSize}
              name="done"
              color={checkboxColor}
            />
          )}
        </View>
        <View>
          <Text style={[styles.title, { color: textColor }]} bold="bold">
            {resident.fullName}
          </Text>
          <Text
            style={[styles.subTitle, { color: textColor }]}
            fontSize="small"
          >
            {`${resident.locationCode} ${resident.areaName}`}
          </Text>
        </View>
      </View>
    </TouchableComponent>
  );
}
