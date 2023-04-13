import React from 'react';
import { View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Image from '../Image';
import ImagePlaceholder from '../ImagePlaceholder';
import styles from './style.css';
import CurvedBackground from '../../assets/ecoid/svg/curved_background.svg';

interface PropTypes {
  uri: string;
  style?: ViewStyle;
}

export default function CurvedCoverPhoto(props: PropTypes) {
  const { uri, style } = props;

  return (
    <View style={style}>
      {uri.length === 0 ? (
        <ImagePlaceholder />
      ) : (
        <Image resizeMode="cover" uri={uri} style={styles.image} />
      )}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.7)']}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 0, y: 0.15 }}
        style={styles.gradient}
      />
      <LinearGradient
        colors={['rgba(92, 170, 204, 0.2)', 'rgba(92, 170, 204, 0.2)']}
        style={styles.gradient}
      />
      <View style={styles.curve}>
        <CurvedBackground width="100%" />
      </View>
    </View>
  );
}
