import React from 'react';
import { View } from 'react-native';
import Heading from '../../../../../../components/Heading';
import Text from '../../../../../../components/Text';
import styles from './style.css';

interface PropTypes {
  item: EcoIdOnboardingItemType;
}

interface EcoIdOnboardingItemType {
  image: React.ReactNode;
  title: string;
  text: string;
  button?: React.ReactNode;
}

export default function EcoIdOnboardingItem(props: PropTypes) {
  const { item } = props;
  const { image, title, text, button } = item;
  return (
    <View style={styles.container}>
      <View style={styles.illustration}>{image}</View>
      <View style={styles.content}>
        <Heading size="h2" bold="bold" style={styles.title}>
          {title}
        </Heading>
        <Text fontSize="small" style={styles.description}>
          {text}
        </Text>
        {button && <>{button}</>}
      </View>
    </View>
  );
}
