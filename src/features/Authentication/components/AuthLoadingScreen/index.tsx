import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useUserState } from '../../../User/reducers';
import styles from './style.css';

// This component is rendered as the first component in the application
// while state is loaded from AsyncStorage on device
export default function AuthLoadingScreen(props: any) {
  const { navigation } = props;
  const [userState] = useUserState();
  const { user, userToken } = userState;

  useEffect(() => {
    if (userToken) {
      if (user?.status === 'inactive') {
        navigation.navigate('Auth');
      } else {
        navigation.navigate('App');
      }
    } else {
      navigation.navigate('Auth');
    }
  });

  return (
    <View style={styles.centerContent}>
      <ActivityIndicator />
    </View>
  );
}
