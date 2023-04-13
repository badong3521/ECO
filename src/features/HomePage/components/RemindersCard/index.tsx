import Carousel, { Pagination } from 'react-native-snap-carousel';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import BillReminder from './components/BillReminder';
import styles, { slideHeight } from './style.css';
import { applicationColors } from '../../../../../style.css';
import WeatherReminder from './components/WeatherReminder';
import {
  ReminderElectricBillType,
  ReminderNewBillType,
  ReminderType,
  ReminderWeatherType,
} from '../../../../services/api/types/reminder';

interface RemindersCardProps {
  reminders: ReminderType[];
}

function RemindersCard(props: RemindersCardProps) {
  const { reminders } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function renderItem(reminder: ReminderType) {
    switch (reminder.type) {
      case 'weather':
        return <WeatherReminder reminder={reminder as ReminderWeatherType} />;
      case 'ecoid_onboarding':
        return <BillReminder />;
      case 'electricBill':
        return (
          <BillReminder electricBill={reminder as ReminderElectricBillType} />
        );
      default:
        return (
          <BillReminder newBillReminder={reminder as ReminderNewBillType} />
        );
    }
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <View style={styles.darkFilter} />}
      {Platform.OS === 'ios' && (
        <BlurView
          blurType="light"
          blurAmount={5}
          blurRadius={2}
          reducedTransparencyFallbackColor="transparent"
          style={styles.blurView}
        />
      )}

      <Carousel
        data={reminders}
        layout="default"
        renderItem={item => renderItem(item.item)}
        activeSlideAlignment="center"
        sliderHeight={slideHeight}
        itemHeight={slideHeight}
        vertical
        style={{ zIndex: 200 }}
        loop
        nestedScrollEnabled
        inactiveSlideScale={Platform.OS === 'android' ? 1 : undefined}
        inactiveSlideOpacity={Platform.OS === 'android' ? 1 : undefined}
        removeClippedSubviews={false}
        autoplay
        centerContent
        autoplayInterval={5000}
        autoplayDelay={3000}
        onSnapToItem={index => {
          setCurrentIndex(index);
        }}
      />
      <Pagination
        containerStyle={styles.pagination}
        dotsLength={reminders.length}
        inactiveDotStyle={styles.inactiveStyle}
        dotColor={applicationColors.primary.white}
        inactiveDotColor={applicationColors.primary.white}
        dotStyle={styles.inactiveStyle}
        vertical
        animatedFriction={100}
        inactiveDotScale={1}
        animatedTension={100}
        activeDotIndex={currentIndex}
      />
    </View>
  );
}

export default React.memo(
  RemindersCard,
  (prevProps, nextProps) => nextProps.reminders === prevProps.reminders,
);
