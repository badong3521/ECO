import React from 'react';
import { View, ViewStyle } from 'react-native';
import Text from '../Text';
import Avatar from '../Avatar';
import TouchableComponent from '../TouchableComponent';
import styles from './style.css';

interface UserInformationBarProps {
  avatar: string;
  name: string;
  onClick?: () => void;
  nameStyle?: ViewStyle;
  size?: 'default' | 'small';
  color?: string;
  nameNumberLines?: number;
}

// Display a little bar including information about the user.
// It can be seen in the Card view when a user owns a card.
export default function UserInformationBar(props: UserInformationBarProps) {
  const {
    avatar,
    name,
    onClick,
    nameStyle,
    size,
    color,
    nameNumberLines = 2,
  } = props;

  return (
    <View style={styles.row}>
      <TouchableComponent
        onPress={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <View style={styles.row}>
          <View style={styles.avatarContainer}>
            <Avatar size={size === 'small' ? 28 : 40} avatarUrl={avatar} />
          </View>
          <Text
            fontSize="small"
            bold="bold"
            numberOfLines={nameNumberLines}
            style={[styles.userName, nameStyle, { color }]}
          >
            {name}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
}
