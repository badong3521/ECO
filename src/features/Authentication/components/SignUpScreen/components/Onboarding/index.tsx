import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import OnboardingItem from '../OnboardingItem';
import styles from './style.css';
import Onboarding1 from '../../../../../../assets/onboarding/onboarding_1.svg';
import Onboarding2 from '../../../../../../assets/onboarding/onboarding_2.svg';
import Onboarding3 from '../../../../../../assets/onboarding/onboarding_3.svg';
import { applicationColors } from '../../../../../../../style.css';

interface PropTypes {
  data?: any[];
  renderItem?: (props: any) => any;
  paginationContainerStyle?: ViewStyle;
}

// This component contains a slide of onboarding
export default function Onboarding(props: PropTypes) {
  const i18n = useTranslation();
  const onboardingItems = ONBOARDING_ITEMS(i18n);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const {
    data = onboardingItems,
    renderItem = OnboardingItem,
    paginationContainerStyle,
  } = props;

  return (
    <View style={styles.onboardingSection}>
      <Carousel
        data={data}
        layout="default"
        renderItem={renderItem}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width}
        removeClippedSubviews
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        containerStyle={[styles.pagination, paginationContainerStyle]}
        dotsLength={data.length}
        inactiveDotStyle={styles.inactiveStyle}
        dotColor={applicationColors.neutral.shade500}
        inactiveDotColor={applicationColors.neutral.shade500}
        dotStyle={styles.dotStyle}
        activeDotIndex={activeIndex}
      />
    </View>
  );
}

const ONBOARDING_ITEMS = (i18n: UseTranslationResponse) => [
  {
    text: i18n.t('features.signUp.onboarding.1'),
    image: <Onboarding1 preserveAspectRatio="xMidYMid meet" height="100%" />,
  },
  {
    text: i18n.t('features.signUp.onboarding.2'),
    image: <Onboarding2 preserveAspectRatio="xMidYMid meet" height="100%" />,
  },
  {
    text: i18n.t('features.signUp.onboarding.3'),
    image: <Onboarding3 preserveAspectRatio="xMidYMid meet" height="78%" />,
  },
];
