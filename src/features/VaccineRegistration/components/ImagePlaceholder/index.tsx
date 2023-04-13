import React from 'react';
import { View } from 'react-native';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import styles from './styles.css';

interface Props {
  textPlaceholder: string;
}

const BORDER_COLOR = '#8B8B8B';

export default function ImagePlaceholder(props: Props) {
  const { textPlaceholder } = props;

  return (
    <View style={styles.container}>
      <Icon
        iconPack="material"
        size={25}
        color={BORDER_COLOR}
        name="camera-alt"
      />
      <Text color="grey" style={styles.imageText}>
        {textPlaceholder || ''}
      </Text>
    </View>
  );
}
