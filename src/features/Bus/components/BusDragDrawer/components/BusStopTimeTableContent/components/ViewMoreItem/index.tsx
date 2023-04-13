import { View } from 'react-native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { applicationColors } from '../../../../../../../../../style.css';
import IconComponent from '../../../../../../../../components/Icon';
import Text from '../../../../../../../../components/Text';
import TouchableComponent from '../../../../../../../../components/TouchableComponent';
import styles from './style.css';

interface ViewMoreItemProps {
  onViewMorePress: () => void;
  betweenCounts: number;
}

// Show the count of left items. Click on this component will show all items in list.
export default function ViewMoreItem(props: ViewMoreItemProps) {
  const { onViewMorePress, betweenCounts } = props;
  const int18 = useTranslation();

  function onPress() {
    if (betweenCounts > 0) {
      onViewMorePress();
    }
  }

  return (
    <TouchableComponent onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.label} fontSize="small" numberOfLines={1}>
          {betweenCounts === 0
            ? ''
            : int18.t('features.busScreen.busRoute.moreStops', {
                moreSteps: betweenCounts,
              })}
        </Text>
        {betweenCounts > 0 && (
          <IconComponent
            size={10}
            name="expand-more"
            color={applicationColors.primary.shade900}
          />
        )}
      </View>
    </TouchableComponent>
  );
}
