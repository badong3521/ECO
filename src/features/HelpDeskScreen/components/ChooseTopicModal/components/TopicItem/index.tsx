import { View } from 'react-native';
import React from 'react';
import Text from '../../../../../../components/Text';
import TouchableComponent from '../../../../../../components/TouchableComponent';
import styles from '../../style.css';
import { Multilanguage } from '../../../../../../services/api/types/api';
import { LanguageType } from '../../../../../User/reducers';
import Image from '../../../../../../components/Image';

interface TopicItemProps {
  id: string;
  avatar: string;
  name: Multilanguage;
  onPress: () => void;
  userLanguage: LanguageType;
}
export default function TopicItem(props: TopicItemProps) {
  const { id, avatar, name, onPress, userLanguage } = props;
  return (
    <TouchableComponent key={id.toString()} onPress={onPress}>
      <View style={styles.topicItemContainer}>
        <Image uri={avatar} style={styles.image} resizeMode="contain" />
        <Text style={styles.topicName}>{name[userLanguage]}</Text>
      </View>
    </TouchableComponent>
  );
}
