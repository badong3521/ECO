import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Ticket, Topic } from '../../reducers';
import Input from '../../../../components/Input';
import { AttachmentType } from '../../../../components/AttachmentList/components/Attachment';
import Button from '../../../../components/Button';
import HelpDeskApi from '../../../../services/api/helpDesk';
import useAttachments from '../../../../utils/hooks/useAttachments';
import { CreateTicketParams } from '../../../../services/api/types/helpDesk';
import styles from './style.css';
import Form from '../../../../components/Form';
import RequiredValidation from '../../../../components/Form/validators';
import SubjectValidation from '../../validators';
import AttachmentList from '../../../../components/AttachmentList';
import Firebase from '../../../../services/firebase';
import Text from '../../../../components/Text';
import IconComponent from '../../../../components/Icon';

interface Props {
  onSubmitSuccess: (ticket: Ticket) => void;
  topic: Topic;
}

const uploadLimit = 4;

export default function TicketCreateForm(props: Props) {
  const { topic, onSubmitSuccess } = props;
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  // Form controllers
  const { handleSubmit, errors, setValue, getValues, register } = useForm<
    CreateTicketParams
  >();
  const i18n = useTranslation();
  const {
    removeAttachment,
    onUploadImage,
    onUploadFile,
    attachments,
    images,
    uploading,
    uploadingImage,
  } = useAttachments({
    onAttachmentAdded,
    onAttachmentRemoved,
    uploadLimit,
    mixFileAndImage: false,
  });

  // Set a value in "attachments" (for API) and "uploadedAttachments" for UI.
  function onAttachmentAdded(attachment: AttachmentType) {
    let formAttachments: string[] = getValues('attachments')!;
    if (!formAttachments) {
      formAttachments = [];
    }
    formAttachments.push(attachment.sgid!);
    setValue('attachments', formAttachments);
  }

  // Remove a value in "attachments" (for API) and "uploadedAttachments" for UI.
  function onAttachmentRemoved(attachment: AttachmentType) {
    const formAttachments: string[] = getValues('attachments')!;
    setValue(
      'attachments',
      formAttachments.filter((sgid: string) => sgid !== attachment.sgid),
    );
  }

  // Submit form
  async function onSubmit(data: CreateTicketParams) {
    setApiLoading(true);
    const api = new HelpDeskApi();
    const res = await api.createTicket({
      ...data,
      ecofeedbackTopicId: topic.id,
      ecofeedbackDepartmentId: topic.department.id,
    });
    if (res.status === 'success') {
      Firebase.track('submit_new_topic_successful');
      onSubmitSuccess(res.result.data);
    } else {
      Firebase.track('submit_new_topic_failed');
    }
    setApiLoading(false);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="never"
    >
      <View>
        <Form register={register} errors={errors} setValue={setValue}>
          <Text key="subjectLabel" style={styles.labelInput}>
            {i18n.t('features.helpDesk.create.subjectLabel')}
          </Text>
          <Input
            name="subject"
            inputStyle={styles.subTitle}
            rules={SubjectValidation}
          />

          <Text key="descriptionLabel" style={styles.labelInput}>
            {i18n.t('features.helpDesk.create.descriptionLabel')}
          </Text>
          <Input
            name="description"
            multiline
            inputStyle={styles.description}
            rules={RequiredValidation}
          />

          <Text key="photoLabel" style={styles.labelInput}>
            {i18n.t('features.helpDesk.create.photoLabel')}
          </Text>
          <AttachmentList
            name="images"
            attachments={images}
            onClick={removeAttachment}
            canDelete
            contentStyle={styles.imageList}
            onAddPhotoPress={onUploadImage}
            loading={uploadingImage}
          />
          <Text key="fileLabel" style={styles.labelInput}>
            {i18n.t('features.helpDesk.create.fileLabel')}
          </Text>
          <AttachmentList
            name="attachments"
            attachments={attachments}
            onClick={removeAttachment}
            canDelete
            contentStyle={styles.attachmentList}
          />
        </Form>

        <View style={styles.uploadButtonContainer}>
          <Button
            type="secondary"
            title={i18n.t('features.helpDesk.create.uploadAttachment')}
            style={styles.uploadButton}
            showSuccessAnimation
            uppercase={false}
            loading={uploading}
            labelStyle={styles.label}
            icon={() => (
              <IconComponent
                name="upload"
                iconPack="feather"
                color={styles.greenColor}
                size={18}
              />
            )}
            onPress={onUploadFile}
          />
        </View>
      </View>
      <Button
        type="primary"
        title={i18n.t('features.helpDesk.ticketList.createRequest')}
        disable={apiLoading || uploading}
        loading={apiLoading}
        style={styles.button}
        uppercase={false}
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}
