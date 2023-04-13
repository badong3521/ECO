import { View } from 'react-native';
import i18n from 'i18next';
import React from 'react';
import TouchableComponent from '../../../../components/TouchableComponent';
import styles from './style.css';
import Text from '../../../../components/Text';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../style.css';
import RateAppIcon from '../../../../assets/profile/img_rate-app.svg';
import IconComponent from '../../../../components/Icon';

interface PropTypes {
  onPress?: () => void;
  title: string;
  subtitle: string;
}

export default function RateAppBanner(props: PropTypes) {
  const { onPress, title, subtitle } = props;
  return (
    <TouchableComponent onPress={onPress} disabled={onPress === undefined}>
      <View
        style={[
          styles.rateAppBanner,
          { paddingLeft: onPress ? undefined : 25 },
        ]}
      >
        <View style={styles.rateAppText}>
          <View>
            <Text bold="bold">{title}</Text>
            <Text
              style={{
                color: applicationColors.neutral.shade700,
                marginTop: applicationDimensions.smallPadding,
              }}
            >
              {subtitle}
            </Text>
          </View>
          {onPress && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: applicationDimensions.defaultPadding,
                alignItems: 'center',
              }}
            >
              <Text
                bold="bold"
                style={{
                  color: applicationColors.primary.shade900,
                }}
              >
                {i18n.t('features.userScreen.rateAppAction')}
              </Text>
              <IconComponent
                size={applicationDimensions.iconSizeSmall}
                name={applicationIcons.arrowRight}
                color={applicationColors.primary.shade900}
                iconPack="feather"
              />
            </View>
          )}
        </View>
        <View style={styles.rateAppIcon}>
          <RateAppIcon />
        </View>
      </View>
    </TouchableComponent>
  );
}
