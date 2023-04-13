import { useState } from 'react';
import { Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {
  AttachmentType,
  isImageFile,
} from '../../components/AttachmentList/components/Attachment';
import DirectUploadsApi from '../../services/api/directUploads';

const uploadApi = new DirectUploadsApi();
const documentOptions = {
  type: [
    DocumentPicker.types.pdf,
    DocumentPicker.types.csv,
    DocumentPicker.types.plainText,
  ],
};

// the options setup for image picker
const imagePickerOptions = (
  i18n: UseTranslationResponse,
): ImagePickerOptions => ({
  title: i18n.t('features.helpDesk.create.uploadAttachment'),
  takePhotoButtonTitle: i18n.t('features.updateProfileScreen.takePhoto'),
  chooseFromLibraryButtonTitle: i18n.t(
    'components.attachmentModal.chooseFromLibrary',
  ),
  maxHeight: 500, // auto scale if image dimension is greater than 1000
  maxWidth: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images',
    privateDirectory: true,
  },
});

interface Return {
  // Call this to upload attachment image
  onUploadImage: () => void;
  // Call this to upload attachment file
  onUploadFile: () => void;
  // Call this to remove any attachment
  removeAttachment: (attachment: AttachmentType) => void;
  // Array of the attached attachments
  attachments: AttachmentType[];
  // Array of the attached images
  images: AttachmentType[];
  // Clear all attachments
  clearAttachments: () => void;
  // the flag to check when attachment is uploading
  uploading?: boolean;
  // the flag to check when image attachment is uploading
  uploadingImage?: boolean;
}

interface Props {
  // Callback when an attachment is added
  onAttachmentAdded?: (attachment: AttachmentType) => void;
  // Callback when an attachment is removed
  onAttachmentRemoved?: (attachment: AttachmentType) => void;
  // Limit the number of attachments
  uploadLimit?: number;
  // if mixFileAndImage is true, the result files will include both files and images
  mixFileAndImage?: boolean;
  onLoadImages?: AttachmentType[];
}

// Handle uploading file and image attachments.
// Will return functions for using the upload API and the final attachment array.
// This works only with the Direct Uploads API endpoint currently!
export default function useAttachments(props: Props): Return {
  const {
    onAttachmentAdded,
    onAttachmentRemoved,
    uploadLimit,
    mixFileAndImage,
    onLoadImages = [],
  } = props;
  // For storing which attachments have been uploaded so that we can display
  const [attachments, setAttachments] = useState<AttachmentType[]>([]);
  const [images, setImages] = useState<AttachmentType[]>(onLoadImages);
  const [uploading, setUploading] = useState<boolean>();
  const [uploadingImage, setUploadingImage] = useState<boolean>();
  const i18n = useTranslation();

  async function onUploadFile() {
    if (uploadingImage || uploading) return;
    const attachment = await DocumentPicker.pick(documentOptions);
    const { uri, type, name } = attachment;
    uploadAttachment(uri, name, type);
  }

  function onUploadImage() {
    if (uploadingImage || uploading) return;
    ImagePicker.showImagePicker(
      imagePickerOptions(i18n),
      async (response: ImagePickerResponse) => {
        // Get the image file
        if (response.uri) {
          uploadAttachment(response.uri, undefined, response.type);
        }
      },
    );
  }

  // Upload a single attachment to API and append to array
  async function uploadAttachment(uri: string, name?: string, mime?: string) {
    if (uploadLimit && uploadLimit <= attachments.length) {
      Alert.alert(
        i18n.t('errors.attachments.attachmentLimit'),
        i18n.t('errors.attachments.attachmentLimitBody', {
          attachmentLimit: 4,
        }),
      );
      return;
    }
    try {
      if (isImageFile(mime)) {
        setUploadingImage(true);
      } else {
        setUploading(true);
      }
      const res = await uploadApi.uploadFile({
        uri,
        mime,
        name,
      });
      if (isImageFile(mime)) {
        setUploadingImage(false);
      } else {
        setUploading(false);
      }
      if (res.status === 'success') {
        const attachmentId = res.result.data.attachableSgid;
        const attachment: AttachmentType = {
          mime: res.result.data.contentType,
          name: res.result.data.filename,
          sgid: attachmentId,
          uri,
        };

        // Append attachment to list of attachments
        // We have to duplicate the array in order to force React to update the view
        if (isImageFile(mime) && !mixFileAndImage) {
          setImages([...images, attachment]);
        } else {
          setAttachments([...attachments, attachment]);
        }

        if (onAttachmentAdded) {
          onAttachmentAdded(attachment);
        }
      }
    } catch (err) {
      Alert.alert(i18n.t('errors.attachments.failedUpload'));
    }
  }

  // Remove a value in attachments.
  function removeAttachment(attachment: AttachmentType) {
    setAttachments(
      attachments.filter((att: AttachmentType) => att.sgid !== attachment.sgid),
    );
    setImages(
      images.filter((att: AttachmentType) => att.sgid !== attachment.sgid),
    );
    if (onAttachmentRemoved) {
      onAttachmentRemoved(attachment);
    }
  }

  function clearAttachments() {
    setAttachments([]);
  }

  return {
    removeAttachment,
    onUploadFile,
    onUploadImage,
    attachments,
    images,
    uploading,
    uploadingImage,
    clearAttachments,
  };
}
