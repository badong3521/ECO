import { StatusBar } from 'react-native';
import React from 'react';

export default function LightStatusBar() {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor="rgba(0,0,0,0.4)"
      translucent
    />
  );
}
