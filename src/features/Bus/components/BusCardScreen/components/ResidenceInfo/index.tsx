import { View } from 'react-native';
import React from 'react';
import { applicationColors } from '../../../../../../../style.css';
import IconComponent from '../../../../../../components/Icon';
import Heading from '../../../../../../components/Heading';

import styles from './style.css';

interface ResidenceInfoProps {
  locationCode: string;
}
function ResidenceInfo(props: ResidenceInfoProps) {
  const { locationCode } = props;
  return (
    <View style={styles.container}>
      <IconComponent
        size={20}
        color={applicationColors.neutral.shade900}
        name="home"
        iconPack="feather"
      />
      <Heading style={styles.locationCode} size="h4">
        {locationCode || ''}
      </Heading>
    </View>
  );
}

export default React.memo(ResidenceInfo);
