import React from 'react';
import { ScrollView, View } from 'react-native';
import Image from '../Image';
import TouchableComponent from '../TouchableComponent';
import PhotoView, { PhotoViewRef } from '../PhotoView';
import { PhotoType } from '../Card/types';
import styles, { imageSize } from './style.css';

interface GalleryProps {
  images: PhotoType[];
  imageColumns: number;
}

// Display list of images with 2 rows and can scroll by horizontal
export default function Gallery(props: GalleryProps) {
  const { images, imageColumns } = props;
  const photoRef = React.createRef<PhotoViewRef>();
  const galleryWidth = (imageSize + 5) * imageColumns + 30; // =  total columns size and padding between the columns

  function onImagePress(index: number) {
    photoRef.current?.show(index);
  }

  function renderImage(item: PhotoType, index: number) {
    return (
      <TouchableComponent
        onPress={() => onImagePress(index)}
        key={index.toString()}
      >
        <View>
          <Image
            style={styles.image}
            uri={item.photoSmUrl || item.photoUrl}
            resizeMode="cover"
          />
        </View>
      </TouchableComponent>
    );
  }

  return (
    <View>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.gallery,
          {
            width: galleryWidth,
          },
        ]}
      >
        {images.map((img, index) => renderImage(img, index))}
      </ScrollView>
      <PhotoView images={images} photoViewRef={photoRef} />
    </View>
  );
}
