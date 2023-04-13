import React from 'react';
import { Avatar as RAvatar } from 'react-native-paper';
import { Platform, View, ViewStyle } from 'react-native';
import styles from './style.css';
import Image from '../Image';
import EmptyAvatar from '../../assets/profile/empty_avatar.svg';

interface AvatarProps {
  avatarUrl?: string;
  size: number;
  style?: ViewStyle;
  borderWidth?: number;
}

// Show a little circular avatar
export default function Avatar(props: AvatarProps) {
  const { avatarUrl, size, style, borderWidth } = props;
  const borderSize = borderWidth || 0;

  const renderAvatar = () => {
    return Platform.OS === 'android' ? (
      <RAvatar.Image
        size={size}
        source={{ uri: avatarUrl }}
        style={[
          styles.avatar,
          {
            borderWidth: borderSize,
            width: size + borderSize,
            height: size + borderSize,
          },
          style,
        ]}
      />
    ) : (
      <View
        style={[
          styles.avatar,
          {
            width: size + borderSize,
            height: size + borderSize,
            borderWidth: borderSize,
          },
          style,
        ]}
      >
        <Image
          uri={avatarUrl!}
          style={{
            width: size,
            height: size,
            borderRadius: size,
          }}
        />
      </View>
    );
  };

  return avatarUrl ? (
    renderAvatar()
  ) : (
    <EmptyAvatar width={size} height={size} style={style} />
  );
}
