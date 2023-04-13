import React from 'react';
import { LayoutAnimation, View } from 'react-native';
import Text from '../../../Text';
import Icon from '../../../Icon';
import TouchableComponent from '../../../TouchableComponent';
import styles from './style.css';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';
import IconButton from '../../../IconButton';
import Image from '../../../Image';

export interface AttachmentType {
  name: string;
  mime: string;
  sgid?: string;
  link?: string;
  uri?: string;
}

interface Props {
  attachment: AttachmentType;
  onClick: (attachment: AttachmentType) => void;
  canDelete: boolean;
}

// Render a little square box after an attachment has been uploaded
export default function Attachment(props: Props) {
  const { attachment, onClick, canDelete } = props;
  const marginRight = canDelete ? applicationDimensions.smallPadding : 5;

  function emitPress() {
    if (canDelete) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    onClick(attachment);
  }

  function renderDeleteButton(): React.ReactNode {
    return (
      <View style={styles.deleteButton}>
        <IconButton
          onPress={emitPress}
          type="button"
          iconName="clear"
          iconColor={applicationColors.semantic.error.shade500}
          iconSize={14}
          padding={0}
          buttonBackgroundColor={applicationColors.primary.white}
        />
      </View>
    );
  }

  function renderImage(): React.ReactNode {
    return (
      <View
        style={[
          styles.imageContainer,
          {
            marginRight,
          },
        ]}
      >
        <Image
          // eslint-disable-next-line react/prop-types
          uri={attachment.link ? attachment.link : attachment.uri || ''}
          resizeMode="cover"
          style={styles.imageFile}
        />
        {canDelete && renderDeleteButton()}
      </View>
    );
  }

  function renderFile(): React.ReactNode {
    return (
      <View
        style={[
          styles.fileContainer,
          {
            marginRight,
          },
        ]}
      >
        <View style={[styles.fileInfo]}>
          <Icon
            name="file"
            size={styles.iconSize}
            color={applicationColors.neutral.shade500}
            iconPack="feather"
          />
          <Text
            style={styles.fileName}
            fontSize="tiny"
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {/* eslint-disable-next-line react/prop-types */}
            {attachment.name || ''}
          </Text>
        </View>
        {canDelete && renderDeleteButton()}
      </View>
    );
  }

  function renderAttachment(
    renderedAttachment: AttachmentType,
  ): React.ReactNode {
    return isImageFile(renderedAttachment.mime) ? renderImage() : renderFile();
  }

  return canDelete ? (
    <>{renderAttachment(attachment)}</>
  ) : (
    <TouchableComponent onPress={emitPress}>
      {renderAttachment(attachment)}
    </TouchableComponent>
  );
}

export function isImageFile(mine?: string) {
  return mine?.includes('image');
}
