import { ScrollView, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../style.css';
import Text from '../../../../../../components/Text';
import IconComponent from '../../../../../../components/Icon';
import { StopStyleType } from '../../../../../Bus/types';
import { Stop } from '../../../../../../services/api/types/bus';
import { LanguageType } from '../../../../../User/reducers';

interface ScheduleTableHeaderProps {
  stops: Stop[];
  language: LanguageType;
}

// Column of stops that will stick at the left of the table
export default function StopsStickyColumn(props: ScheduleTableHeaderProps) {
  const i18n = useTranslation();
  const { stops, language } = props;
  return (
    <View style={styles.stopsName}>
      <View style={styles.stopPointContainer}>
        <Text style={styles.stopPoint} fontSize="small">
          {i18n.t('features.busScheduleScreen.busStops')}
        </Text>
      </View>

      {/* render stops name as a column */}
      <ScrollView horizontal style={styles.scrollView}>
        <View>
          {stops.map((stop, index) => (
            <View style={styles.stopNameContainer} key={index.toString()}>
              <IconComponent
                size={18}
                color={StopStyleType.get(stop.stopType).color}
                name={StopStyleType.get(stop.stopType).icon}
              />
              <Text
                style={[
                  styles.stopName,
                  {
                    color: StopStyleType.get(stop.stopType).color,
                  },
                ]}
                fontSize="small"
              >
                {parseText(stop.name[language])}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// convert text into 2 lines if length of text is greater than 25
function parseText(text: string): string {
  if (text.length < 25) return text;
  let index = 0;
  const half = Math.round(text.length / 2);
  for (let i = 0; i < half; i += 1) {
    if (text.charAt(i + half) === ' ') {
      index = i + half;
      break;
    }
    if (text.charAt(text.length - i - half) === ' ') {
      index = text.length - i - half;
      break;
    }
  }
  return text
    .substring(0, index)
    .concat('\n', text.substring(index + 1, text.length));
}
