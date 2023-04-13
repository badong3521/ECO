import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Config from 'react-native-config';
import styles from '../../style.css';
import Text from '../../../../../../components/Text';
import Image from '../../../../../../components/Image';
import IconComponent from '../../../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';
import { ReminderWeatherType } from '../../../../../../services/api/types/reminder';
import DateUtils from '../../../../../../utils/date';

interface WeatherReminderProps {
  reminder: ReminderWeatherType;
}
function WeatherReminder(props: WeatherReminderProps) {
  const i18n = useTranslation();
  const { reminder } = props;

  function renderWeatherInfo(property: WeatherProperty) {
    return (
      <View style={styles.rowInfo} key={property.type}>
        <IconComponent
          size={applicationDimensions.iconSizeSmall}
          color={applicationColors.primary.white}
          name={property.icon}
          iconPack="feather"
        />
        <Text style={styles.textInfo} fontSize="small" allowFontScaling={false}>
          {i18n.t(`features.home.weather.${property.type}`, {
            windSpeed: reminder?.windSpeed,
            humidity: reminder?.humidity,
          })}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.weatherContainer}>
      <Image
        style={styles.weatherIcon}
        uri={`${Config.API_BASE_URL}${reminder.weatherIcon}`}
        resizeMode="contain"
      />
      <View style={styles.weatherContent}>
        <View style={styles.row}>
          <Text style={styles.today} bold="bold" allowFontScaling={false}>
            {i18n.t('features.home.weather.ecopark')}
          </Text>
          <Text style={styles.textWeather} allowFontScaling={false}>
            {DateUtils.getDateString(
              new Date(),
              DateUtils.MOMENT_FORMATS.DAY_MONTH,
            )}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.celsius} bold="bold" allowFontScaling={false}>
            {`${reminder.temp}°`}
          </Text>
          <View style={styles.info}>
            {weathersProperties.map(item => renderWeatherInfo(item))}
          </View>
        </View>
      </View>
    </View>
  );
}

interface WeatherProperty {
  type: string;
  icon: string;
}
const weathersProperties: WeatherProperty[] = [
  {
    type: 'windSpeed',
    icon: 'wind',
  },
  {
    type: 'humidity',
    icon: 'droplet',
  },
];

export default React.memo(
  WeatherReminder,
  (prevProps, nextProps) => nextProps.reminder === prevProps.reminder,
);
