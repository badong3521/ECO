import React, { useEffect, useState } from 'react';
import { FlatList, LayoutAnimation, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import PopupBottomModal from '../../../../components/PopupBottomModal';
import IconButton from '../../../../components/IconButton';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../style.css';
import Text from '../../../../components/Text';
import { LanguageType } from '../../../User/reducers';
import styles from './style.css';
import TopicItem from './components/TopicItem';
import { Topic, UserRole } from '../../reducers';

interface ChooseTopicModalProps {
  visible: boolean;
  onClosed: () => void;
  onTopicSelected: (topic: Topic) => void;
  roles: UserRole[];
  userLanguage: LanguageType;
}

export default function ChooseTopicModal(props: ChooseTopicModalProps) {
  const { visible, onClosed, onTopicSelected, roles, userLanguage } = props;
  const i18n = useTranslation();
  const defaultRole = roles.length === 1 ? roles[0] : undefined;
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();
  const list = selectedRole ? selectedRole.ecofeedbackTopics : roles;

  function onItemPress(item: UserRole | Topic) {
    if (!selectedRole) {
      updateSelectedRole(item as UserRole);
    } else {
      onTopicSelected(item as Topic);
    }
  }

  function updateSelectedRole(role?: UserRole) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedRole(role);
  }

  useEffect(() => {
    if (!visible) {
      setSelectedRole(defaultRole);
    }
  }, [visible]);

  return (
    <PopupBottomModal visible={visible} onClose={onClosed}>
      <View style={styles.container}>
        <View style={styles.headers}>
          {selectedRole && roles?.length > 1 && (
            <View style={styles.backButtonContainer}>
              <IconButton
                type="clear"
                iconName={applicationIcons.back}
                iconPack="feather"
                iconSize={applicationDimensions.iconSize}
                iconColor={applicationColors.neutral.shade900}
                onPress={() => updateSelectedRole(undefined)}
              />
            </View>
          )}
          <Text bold="bold" style={styles.title}>
            {selectedRole
              ? i18n.t('features.helpDesk.create.selectTopicTitle')
              : i18n.t('features.helpDesk.create.selectRoleTitle')}
          </Text>
          <View style={styles.closeButton}>
            <IconButton
              type="clear"
              iconName="close"
              onPress={onClosed}
              iconColor={applicationColors.neutral.shade900}
            />
          </View>
        </View>
        <FlatList
          // @ts-ignore
          data={list}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          renderItem={({ item }) => (
            <TopicItem
              key={item.id.toString()}
              id={item.id.toString()}
              avatar={item.avatar}
              name={item.name}
              onPress={() => onItemPress(item)}
              userLanguage={userLanguage}
            />
          )}
        />
      </View>
    </PopupBottomModal>
  );
}
