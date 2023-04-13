import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { Image as RImage, Platform, ImageStyle } from 'react-native';

type Resize = 'cover' | 'contain' | 'center' | 'stretch';

interface Props {
  uri: string;
  resizeMode: Resize;
  placeholder?: React.ReactNode;
  style?: ImageStyle | ImageStyle[];
}

export default function Image(props: Props) {
  const { uri, resizeMode, placeholder, style } = props;
  const [loaded, setLoaded] = useState<boolean>(false);

  function onLoadEnd() {
    if (placeholder) {
      setLoaded(true);
    }
  }

  return (
    <>
      {!loaded && placeholder ? (
        <>{placeholder}</>
      ) : (
        <>
          {Platform.OS === 'android' ? (
            <RImage
              style={style}
              source={{ uri }}
              resizeMode={resizeMode}
              onLoadEnd={onLoadEnd}
            />
          ) : (
            <FastImage
              style={style}
              source={{
                uri,
              }}
              resizeMode={resizeMode}
              onLoadEnd={onLoadEnd}
            />
          )}
        </>
      )}
    </>
  );
}

Image.defaultProps = {
  resizeMode: FastImage.resizeMode.cover,
};
