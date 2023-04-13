import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import Attachment, { AttachmentType } from './components/Attachment';
import styles from './style.css';
import { applicationColors } from '../../../style.css';
import IconComponent from '../Icon';
import TouchableComponent from '../TouchableComponent';
import Loader from '../Loader';

interface Props {
  name?: string;
  attachments: AttachmentType[];
  onClick: (attachment: AttachmentType) => void;
  canDelete: boolean;
  contentStyle?: ViewStyle;
  onAddPhotoPress?: () => void;
  loading?: boolean;
}

// Renders a list of square attachments to show a user that they have
// successfully been uploaded
export default function AttachmentList(props: Props) {
  const {
    attachments,
    onClick,
    canDelete,
    contentStyle,
    onAddPhotoPress,
    loading,
  } = props;

  function onPhotoButtonPress() {
    if (onAddPhotoPress && !loading) {
      onAddPhotoPress();
    }
  }
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.content, contentStyle]}
    >
      {attachments &&
        attachments.map((attachment: AttachmentType) => (
          <Attachment
            attachment={attachment}
            key={attachment.sgid}
            canDelete={canDelete}
            onClick={onClick}
          />
        ))}
      {onAddPhotoPress && (
        <TouchableComponent onPress={onPhotoButtonPress}>
          <View style={styles.addPhotoContainer}>
            <View style={styles.addPhotoButton}>
              {loading ? (
                <Loader />
              ) : (
                <IconComponent
                  size={24}
                  name="image"
                  color={applicationColors.neutral.shade900}
                  iconPack="feather"
                />
              )}
            </View>
          </View>
        </TouchableComponent>
      )}
    </ScrollView>
  );
}

AttachmentList.defaultProps = {
  canDelete: true,
};
