import { TextInput, View } from 'react-native';
import React, { useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../../../components/Button';
import styles from './style.css';
import AttachmentsList from '../../../../../../components/AttachmentList';
import Input from '../../../../../../components/Input';
import { applicationColors } from '../../../../../../../style.css';
import { TicketStatus } from '../../../../reducers';
import { AttachmentType } from '../../../../../../components/AttachmentList/components/Attachment';
import IconButton from '../../../../../../components/IconButton';
import Loader from '../../../../../../components/Loader';

interface SendCommentInputProps {
  status?: TicketStatus;
  onReopenTicket: () => void;
  onRateTicket: () => void;
  onUploadFile: () => void;
  onUploadImage: () => void;
  onRemoveAttachment: (attachment: AttachmentType) => void;
  onSendMessage: (message: string, attachments: AttachmentType[]) => void;
  attachments: AttachmentType[];
  loading: boolean;
  uploadingImage?: boolean;
  uploadingFile?: boolean;
  inputRef: React.RefObject<any>;
}
export default function SendCommentInput(props: SendCommentInputProps) {
  const {
    status,
    onReopenTicket,
    onUploadFile,
    onUploadImage,
    uploadingFile,
    uploadingImage,
    loading,
    onRemoveAttachment,
    attachments,
    onSendMessage,
    onRateTicket,
    inputRef,
  } = props;
  const i18n = useTranslation();
  const textRef = React.useRef<TextInput>();
  const [message, setMessage] = useState<string>();

  useImperativeHandle(inputRef, () => ({
    clearText: () => {
      setMessage('');
    },
  }));

  function onSendMessagePress() {
    if (message) {
      onSendMessage(message, attachments);
    }
  }
  return (
    <View style={styles.inputContainer}>
      {status === 'closed' && (
        <View style={styles.reopenButtons}>
          <Button
            containerStyle={styles.reopenButtonContainer}
            style={styles.reopenButton}
            type="secondary"
            title={i18n.t('features.helpDesk.ticketScreen.rateTicket')}
            uppercase={false}
            onPress={onRateTicket}
          />
          <Button
            containerStyle={styles.reopenButtonContainer}
            style={styles.reopenButton}
            type="primary"
            title={i18n.t('features.helpDesk.ticketScreen.reopenLabel')}
            uppercase={false}
            onPress={onReopenTicket}
          />
        </View>
      )}
      {status !== 'closed' && (
        <>
          <Input
            inputRef={textRef}
            value={message}
            label={i18n.t('features.helpDesk.ticketScreen.inputLabel')}
            inputStyle={styles.inputStyle}
            placeholderTextColor={applicationColors.neutral.shade500}
            containerStyle={styles.input}
            textAlignVertical="top"
            multiline
            editable={!loading}
            onChangeText={text => setMessage(text)}
          />
          {attachments && attachments.length > 0 && (
            <AttachmentsList
              attachments={attachments}
              onClick={onRemoveAttachment}
              canDelete
              contentStyle={styles.attachments}
            />
          )}
          <View style={styles.buttons}>
            {uploadingImage ? (
              <Loader style={styles.loader} />
            ) : (
              <IconButton
                iconName="image"
                iconColor={applicationColors.neutral.shade900}
                iconPack="feather"
                onPress={onUploadImage}
                type="circle"
                style={styles.circleButton}
              />
            )}
            {uploadingFile ? (
              <Loader style={styles.loader} />
            ) : (
              <IconButton
                iconName="paperclip"
                iconColor={applicationColors.neutral.shade900}
                iconPack="feather"
                onPress={onUploadFile}
                type="circle"
                style={styles.circleButton}
              />
            )}
            <View style={styles.spacer} />
            <IconButton
              iconName="navigation"
              iconColor={applicationColors.neutral.shade900}
              iconPack="feather"
              onPress={onSendMessagePress}
              type="clear"
            />
          </View>
        </>
      )}
      <View style={styles.divider} />
    </View>
  );
}
