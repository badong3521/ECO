import React from 'react';
import { View } from 'react-native';
import { UserType } from '../../../../../User/types';
import { HelpDeskComment } from '../../../../../../services/api/types/helpDesk';
import Comment from '../Comment';
import styles from './style.css';
import { Department } from '../../../../reducers';

interface Props {
  comments: HelpDeskComment[];
  department: Department;
  user: UserType;
}

// List all comments in a help desk ticket
export default function CommentList(props: Props) {
  const { comments, department, user } = props;

  return (
    <View style={styles.container}>
      {comments.map((comment: HelpDeskComment) => (
        <View
          style={[
            styles.commentContainer,
            comment.role === 'user'
              ? styles.containerUser
              : styles.containerSupport,
          ]}
          key={`${comment.content.message}-${comment.createdAt}`}
        >
          <Comment comment={comment} department={department} user={user} />
        </View>
      ))}
    </View>
  );
}
