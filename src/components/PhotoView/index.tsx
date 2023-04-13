import React, { useImperativeHandle, useState } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';
import { Portal as RPortal } from 'react-native-paper';
import { ImageViewer } from 'react-native-image-zoom-viewer';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import { PhotoType } from '../Card/types';
import ZoomableImage from './component/ZoomableImage';
import useBackButton from '../../utils/hooks/useBackButton';
import PhotoViewHeader from './component/PhotoViewHeader';
import { setStatusBarBackground } from '../../utils/hooks/useStatusBar';
import Loader from '../Loader';
import { applicationColors } from '../../../style.css';
import savePicture from '../../utils/file';

const screenHeight = Dimensions.get('screen').height;

export interface PhotoViewRef {
  show: (index?: number) => void;
}

interface PhotoViewProps {
  images: PhotoType[];
  photoViewRef?: React.RefObject<PhotoViewRef>;
}

const dismissDuration = 200;

// View full screen a photo or a gallery.
// For gallery, can swipe to view next/previous image and show the `currentIndex/totalImages` numbers
// Can Drag to dismiss
export default function PhotoView(props: PhotoViewProps) {
  const { photoViewRef, images } = props;
  const i18n = useTranslation();
  const [visible, setVisible] = useState(false);
  const [animatedValueY] = useState(new Animated.Value(0)); // use to animate backgroundColor of model when swipe down
  const [imageTranslateY] = useState(new Animated.Value(0)); // use to animate backgroundColor of model when swipe down
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function onMove(position?: any) {
    if (position && position.scale <= 1) {
      animatedValueY.setValue(position.positionY);
    }
  }

  function onRequestClose() {
    Animated.parallel([
      Animated.timing(imageTranslateY, {
        duration: dismissDuration,
        toValue: screenHeight,
        easing: Easing.ease,
      }),
      Animated.timing(animatedValueY, {
        duration: dismissDuration,
        toValue: screenHeight,
        easing: Easing.ease,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setStatusBarBackground('transparent');
        setVisible(false);
      }
    });
  }

  function renderZoomImage(photoUrl: string) {
    return <ZoomableImage uri={photoUrl} translateY={imageTranslateY} />;
  }

  // allow parent can call show function
  useImperativeHandle(
    photoViewRef,
    (): PhotoViewRef => ({
      show: (index?: number) => {
        animatedValueY.setValue(0);
        imageTranslateY.setValue(0);
        setVisible(true);
        setCurrentIndex(index || 0);
        setStatusBarBackground('black');
      },
    }),
  );

  useBackButton(() => {
    if (visible) {
      onRequestClose();
      return true;
    }
    return false;
  });

  return visible ? (
    <RPortal>
      <Animated.View
        style={[
          styles.animated,
          {
            backgroundColor: animatedValueY.interpolate({
              inputRange: [0, screenHeight],
              outputRange: ['rgba(0,0,0,1)', 'rgba(0,0,0,0)'],
            }),
          },
        ]}
      >
        {images && (
          <ImageViewer
            backgroundColor="transparent"
            renderImage={prs => renderZoomImage(prs.source.uri)}
            enablePreload
            index={currentIndex}
            renderHeader={index => (
              <PhotoViewHeader
                index={index}
                imagesLength={images.length}
                onClosed={onRequestClose}
                backgroundColor={animatedValueY.interpolate({
                  inputRange: [0, screenHeight],
                  outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)'],
                })}
              />
            )}
            renderIndicator={() => <View />}
            minScale={1}
            menuContext={{
              saveToLocal: i18n.t('components.gallery.saveToLocal'),
              cancel: i18n.t('actions.cancel'),
            }}
            enableSwipeDown
            onSwipeDown={onRequestClose}
            onMove={onMove}
            loadingRender={() => (
              <Loader color={applicationColors.primary.white} />
            )}
            imageUrls={images.map(img => ({
              url: img.photoUrl,
            }))}
            onSave={url => {
              savePicture(url);
            }}
          />
        )}
      </Animated.View>
    </RPortal>
  ) : (
    <View />
  );
}
