import { View } from 'react-native';
import React from 'react';
import styles from './style.css';
import TextLink from '../../../../../../components/TextLink';
import { applicationColors } from '../../../../../../../style.css';

type OnBoardingType = {
  text: string;
  image: React.ReactNode;
};

interface OnboardingItemProps {
  item: OnBoardingType;
  index: number;
}

// This component is a page in onboarding slide.
// Containing a title and an image
export default function OnboardingItem(props: OnboardingItemProps) {
  const { item } = props;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextLink
          fontSize="large"
          linkColor={applicationColors.primary.shade900}
          style={styles.title}
        >
          {item.text}
        </TextLink>
      </View>
      <View style={styles.imageContainer}>{item.image}</View>
    </View>
  );
}
