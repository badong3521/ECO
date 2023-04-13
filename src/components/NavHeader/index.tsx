import { View } from 'react-native';
import React from 'react';
import { withNavigation } from 'react-navigation';
import styles from './style.css';
import Heading from '../Heading';
import Text from '../Text';
import HeaderBackIcon from '../HeaderBackIcon';
import { applicationColors } from '../../../style.css';

type NavigationHeaderProps = {
  title?: string;
  subtitle?: string;
  navigation: any;
  rightHeader?: React.ReactNode;
  hasBackButton?: boolean;
};

function NavigationHeader(props: NavigationHeaderProps) {
  const { title, subtitle, navigation, rightHeader, hasBackButton } = props;

  return (
    <View style={styles.headerContainer}>
      {hasBackButton && (
        <HeaderBackIcon
          onPress={() => {
            navigation.goBack();
          }}
          color={applicationColors.neutral.shade900}
        />
      )}
      <View style={styles.title}>
        {!!title && (
          <Heading bold="bold" size="h4" numberOfLines={1}>
            {title}
          </Heading>
        )}
        {!!subtitle && (
          <Text fontSize="small" color="grey" numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightHeader}
    </View>
  );
}

export default withNavigation(NavigationHeader);
