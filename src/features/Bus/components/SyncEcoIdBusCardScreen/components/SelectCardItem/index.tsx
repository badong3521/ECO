import { View } from 'react-native';
import React from 'react';
import { applicationColors } from '../../../../../../../style.css';
import Text from '../../../../../../components/Text';
import IconComponent from '../../../../../../components/Icon';
import { BusCardV2Type } from '../../../../../../services/api/types/busCardType';
import TouchableComponent from '../../../../../../components/TouchableComponent';
import styles from '../../style.css';

interface SelectCardItemProps {
  busCard: BusCardV2Type;
  checked: boolean;
  onSelectChanged: (checked: boolean) => void;
}
function SelectCardItem(props: SelectCardItemProps) {
  const { busCard, checked, onSelectChanged } = props;
  return (
    <TouchableComponent onPress={() => onSelectChanged(!checked)}>
      <View style={styles.itemContainer}>
        <Text bold="bold">{busCard.fullName || ''}</Text>
        <Text style={styles.cardNumber} color="grey">
          {busCard.cardNumber || ''}
        </Text>
        <View
          style={[
            styles.checkbox,
            {
              borderColor: checked
                ? applicationColors.primary.shade900
                : applicationColors.neutral.shade300,
              backgroundColor: checked
                ? applicationColors.primary.shade900
                : undefined,
            },
          ]}
        >
          {checked && (
            <IconComponent
              size={15}
              name="done"
              color={applicationColors.primary.white}
            />
          )}
        </View>
      </View>
    </TouchableComponent>
  );
}

export default React.memo(SelectCardItem);
