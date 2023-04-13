import React from 'react';
import ImagePicker, { ImagePickerOptions } from 'react-native-image-picker';
import TouchableComponent from '../TouchableComponent';

interface InputFileProps {
  children: React.ReactNode;
  imagePickerOptions: ImagePickerOptions;
  onCustomButtonPress?: (name: string) => void;
  name?: string; // use for Form
  onValueChange?: (value: any) => void; // use for Form
}

// Component allow take an image or select an image from gallery
// this can be used in Form
export default function InputImagePicker(props: InputFileProps) {
  const {
    children,
    imagePickerOptions,
    onCustomButtonPress,
    onValueChange,
  } = props;

  function onPress() {
    ImagePicker.showImagePicker(imagePickerOptions, response => {
      if (response.customButton) {
        if (onCustomButtonPress) {
          onCustomButtonPress(response.customButton);
        }
        return;
      }
      if (response.uri && onValueChange) {
        // on got the image file
        onValueChange(response);
      }
    });
  }

  return <TouchableComponent onPress={onPress}>{children}</TouchableComponent>;
}
