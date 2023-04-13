import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import IconComponent from 'components/Icon';
import navigationService from 'services/navigationService';
import styles from './style.css';

interface PropTypes {
  title: string;
  RightIcon?: any;
}

const Header = (props: PropTypes) => {
  const { title, RightIcon } = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigationService.back();
        }}
        style={styles.iconContainer}
        activeOpacity={0.6}
      >
        <IconComponent
          iconPack="feather"
          name="chevron-left"
          size={26}
          color="#000"
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      {RightIcon || (
        <TouchableOpacity
          style={[styles.iconContainer, { opacity: 0 }]}
          activeOpacity={0.6}
          disabled
        >
          <IconComponent iconPack="feather" name="save" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
