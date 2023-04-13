import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  height?: number;
  width?: number;
}

function Spacer(props: SpacerProps) {
  const { height, width } = props;
  return <View style={{ height, width }} />;
}

export default Spacer;
