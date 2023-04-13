import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles.css';
import useAttachments from '../../../../utils/hooks/useAttachments';
import { AttachmentType } from '../../../../components/AttachmentList/components/Attachment';
import Image from '../../../../components/Image';
import ImagePlaceholder from '../ImagePlaceholder';
import DeleteButton from '../DeleteButton';

const uploadLimit = 1;

interface SingleImagePickerProps {
  name: string;
  uri: string | undefined;
  onImageAdded: (data: AttachmentType) => void;
  textPlaceholder: string;
  onDeleteImage: () => void;
  error?: any;
  onImagePreviewPress: (photoUrl: string) => void;
}

export default function SingleImagePicker({
  uri,
  onImageAdded,
  textPlaceholder,
  onDeleteImage,
  error,
  onImagePreviewPress,
}: SingleImagePickerProps) {
  const { onUploadImage, uploadingImage } = useAttachments({
    onAttachmentAdded,
    uploadLimit,
    mixFileAndImage: false,
  });

  function onAttachmentAdded(attachment: AttachmentType) {
    onImageAdded(attachment);
  }

  function onImageClickHandle() {
    if (uri) onImagePreviewPress(uri);
    else onUploadImage();
  }

  function renderPlaceholder() {
    if (uploadingImage) {
      return <ActivityIndicator animating />;
    }

    return <ImagePlaceholder textPlaceholder={textPlaceholder} />;
  }

  const canDelete = !!uri;

  return (
    <>
      <TouchableOpacity
        onPress={onImageClickHandle}
        style={[styles.imageContainer, error && styles.imageError]}
      >
        {uri ? <Image style={styles.image} uri={uri} /> : renderPlaceholder()}
        {canDelete && <DeleteButton onPress={onDeleteImage} />}
      </TouchableOpacity>
    </>
  );
}
