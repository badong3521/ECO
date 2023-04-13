import { View, ViewStyle } from 'react-native';
import React from 'react';
import Text from '../Text';
import styles from './style.css';
import Logo from '../../assets/logos/ecoone_white.svg';
import Heading from '../Heading';

interface GreetingProps {
  subTitle?: string;
  title?: string;
  color?: string;
  logo?: boolean;
  style?: ViewStyle | ViewStyle[];
  titleStyle?: ViewStyle | ViewStyle[];
}

// Containing a subtitle above the title
// if logo is true, will display ecoone logo in the right
export default function Greeting(props: GreetingProps) {
  const { subTitle, title, color, logo, style, titleStyle } = props;
  return (
    <View style={[styles.heading, style]}>
      {subTitle && (
        <Text fontSize="small" style={{ color }}>
          {subTitle}
        </Text>
      )}
      {title && (
        <Heading
          bold="bold"
          size="h3"
          style={[styles.title, titleStyle, { color }]}
        >
          {title}
        </Heading>
      )}
      {logo && (
        <Logo
          style={styles.logo}
          width="30%"
          preserveAspectRatio="xMidYMid meet"
        />
      )}
    </View>
  );
}
