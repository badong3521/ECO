import React from 'react';
import { Linking, View, Alert } from 'react-native';
import Text from '../../../../../../components/Text';
import {
  AttachmentType,
  isImageFile,
} from '../../../../../../components/AttachmentList/components/Attachment';
import AttachmentList from '../../../../../../components/AttachmentList';
import styles from './style.css';

interface Props {
  content: string;
  attachments?: AttachmentType[];
}

// List all comments in a help desk ticket
export default function CommentBottom(props: Props) {
  const { content, attachments } = props;

  const images = attachments?.filter(att => isImageFile(att.mime));
  const files = attachments?.filter(att => !isImageFile(att.mime));

  async function onClickAttachment(attachment: AttachmentType) {
    if (attachment.link) {
      const canOpen = await Linking.canOpenURL(attachment.link);
      if (canOpen) {
        Linking.openURL(attachment.link);
      } else {
        Alert.alert("Can't open URL.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${content}`}</Text>
      {attachments && attachments.length > 0 && (
        <View style={styles.attachments}>
          {images && (
            <AttachmentList
              attachments={images}
              onClick={onClickAttachment}
              canDelete={false}
            />
          )}
          {files && (
            <AttachmentList
              attachments={files}
              onClick={onClickAttachment}
              canDelete={false}
            />
          )}
        </View>
      )}
    </View>
  );
}
