import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Text from '../Text';
import IconButton from '../IconButton';
import { applicationColors } from '../../../style.css';
import { lightNavigationOptions } from '../../config/navigation';
import styles from './styles.css';

interface Props {
  goBack?: () => void;
  onButtonRightPress?: () => void;
  header: string;
}

function PlaceholderButton() {
  return <View style={styles.button} />;
}

export default function Nav(props: Props) {
  const { goBack, onButtonRightPress, header } = props;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {goBack ? (
          <View>
            <IconButton
              iconPack="feather"
              iconColor={applicationColors.neutral.shade900}
              type="circle"
              onPress={goBack}
              style={styles.button}
              iconSize={24}
              iconName="chevron-left"
            />
          </View>
        ) : (
          <PlaceholderButton />
        )}

        <Text
          fontSize="large"
          bold="bold"
          style={[styles.header, lightNavigationOptions.headerTitleStyle]}
          numberOfLines={1}
        >
          {header}
        </Text>
        {onButtonRightPress ? (
          <View>
            <IconButton
              iconPack="feather"
              iconColor={applicationColors.neutral.shade900}
              type="circle"
              onPress={goBack}
              style={styles.button}
              iconSize={24}
              iconName="chevron-right"
            />
          </View>
        ) : (
          <PlaceholderButton />
        )}
      </View>
    </SafeAreaView>
  );
}

Nav.defaultProps = {
  header: 'Header',
};
