import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Text from '../../../../../components/Text';
import useInterval from '../../../../../utils/hooks/useInterval';
import styles from '../style.css';

interface CountdownTimeProps {
  remainTime: number; // in milliseconds
  isDetail?: boolean;
  onTimeout: () => void;
}

// Countdown from `remainTime` to 0
function CountdownTime(props: CountdownTimeProps) {
  const { remainTime, isDetail, onTimeout } = props;
  const i18n = useTranslation();
  const [time, setTime] = useState(remainTime);
  const timesArr = getTimeArray(time);

  useInterval({
    callback: () => {
      if (time > 0) {
        setTime(time - 1);
      }
    },
    delay: 1000,
  });

  useEffect(() => {
    if (time === 0) {
      onTimeout();
    }
  }, [time]);

  useEffect(() => {
    setTime(remainTime);
  }, [remainTime]);

  return (
    <View>
      {!isDetail ? (
        <Text
          style={[styles.text, styles.fullTime]}
          fontSize="small"
          allowFontScaling={false}
        >
          {timesArr.join(':')}
        </Text>
      ) : (
        <View style={styles.times}>
          {timesArr.map((num, index) => (
            <View style={styles.timeColumn} key={index.toString()}>
              <Text style={[styles.text]} bold="bold" allowFontScaling={false}>
                {num}
              </Text>
              <Text
                style={[styles.text, styles.timeDesc]}
                fontSize="tiny"
                allowFontScaling={false}
              >
                {i18n.t(
                  `features.home.lixi.timeAttributes.${TIME_ATTRIBUTES[index]}`,
                )}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const TIME_ATTRIBUTES = ['hours', 'minutes', 'seconds'];

function getTimeArray(seconds: number): string[] {
  return [
    get2digitsString(Math.floor(seconds / 3600)),
    get2digitsString(Math.floor((seconds % 3600) / 60)),
    get2digitsString(Math.floor((seconds % 3600) % 60)),
  ];
}

export default React.memo(
  CountdownTime,
  (prevProps, nextProps) => prevProps.remainTime === nextProps.remainTime,
);

function get2digitsString(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}
