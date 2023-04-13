import React from 'react';
import { View } from 'react-native';
import { UserType } from '../../../../../User/types';
import {
  getUserFullNameByLocale,
  useUserState,
} from '../../../../../User/reducers';
import Text from '../../../../../../components/Text';
import Avatar from '../../../../../../components/Avatar';
import styles from './style.css';
import { Department } from '../../../../reducers';

interface Props {
  department: Department;
  user: UserType;
  isUser: boolean; // If it's a user ticket or support
}

// List all comments in a help desk ticket
export default function CommentTop(props: Props) {
  const { department, user, isUser } = props;
  const [userState] = useUserState();
  const { userLanguage } = userState;

  return isUser ? (
    <View style={[styles.container, styles.containerUser]}>
      <View style={styles.contentContainer}>
        <Text style={styles.textUser} numberOfLines={1}>
          {getUserFullNameByLocale(
            userLanguage,
            user.firstName!,
            user.lastName!,
          )}
        </Text>
        <Avatar avatarUrl={user.avatar} size={32} />
      </View>
    </View>
  ) : (
    <View style={[styles.container, styles.containerDepartment]}>
      <View style={styles.contentContainer}>
        <Avatar avatarUrl={department.logo} size={32} />
        <Text style={styles.textDepartment} numberOfLines={1}>
          {department.name || ''}
        </Text>
      </View>
    </View>
  );
}
