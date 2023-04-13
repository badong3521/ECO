import React from 'react';
import { View } from 'react-native';
import styles from './style.css';

// Renders the little line that shows that the Drawer is draggable
export default function DragLine() {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.dragBarLine} />
    </View>
  );
}
