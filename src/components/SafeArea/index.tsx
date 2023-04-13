import { Platform, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style.css';

interface SafeAreaProps {
  children: React.ReactNode;
}

// Only Use SafeAreaView for Android, because there is a space at the bottom of IOS
// for IOS: will have the paddingTop = statusBarHeight
export default function SafeArea(props: SafeAreaProps) {
  const { children } = props;
  return Platform.OS === 'ios' ? (
    <View style={styles.containerIos}>{children}</View>
  ) : (
    <SafeAreaView style={styles.containerAndroid}>{children}</SafeAreaView>
  );
}
