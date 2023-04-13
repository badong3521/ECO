import React from 'react';
import { View } from 'react-native';
import { UserType } from '../../../../../User/types';
import { HelpDeskComment } from '../../../../../../services/api/types/helpDesk';
import Text from '../../../../../../components/Text';
import CommentTop from '../CommentTop';
import CommentBottom from '../CommentBottom';
import styles from './style.css';
import DateUtils from '../../../../../../utils/date';
import { Department } from '../../../../reducers';

interface Props {
  comment: HelpDeskComment;
  department: Department;
  user: UserType;
}

// List all comments in a help desk ticket
export default function Comment(props: Props) {
  const { comment, department, user } = props;

  // Save if this comment is from the user or support
  const isUserComment = comment.role === 'user';

  return (
    <View>
      <View style={styles.comment}>
        <CommentTop
          department={department}
          user={user}
          isUser={isUserComment}
        />
        <CommentBottom
          content={comment.content.message}
          attachments={comment.content.attachments}
        />
      </View>
      <View
        style={[
          styles.createdAtContainer,
          isUserComment ? styles.createdAtUser : styles.createdAtSupport,
        ]}
      >
        <Text style={styles.createdAt} fontSize="tiny" color="grey">
          {DateUtils.getDateString(
            comment.createdAt,
            DateUtils.MOMENT_FORMATS.DATE_TIME,
          )}
        </Text>
      </View>
    </View>
  );
}
