import { PermissionsAndroid, Platform } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

export const appName = 'EcoOne';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

// save url image to the local storage
export default async function savePicture(url: string) {
  console.log('url', url);
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }

  if (Platform.OS === 'android') {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: '.jpeg',
    })
      .fetch('GET', url)
      .then(res => {
        CameraRoll.save(res.data, {
          type: 'photo',
          album: appName,
        });
      })
      .catch(error => console.log(error));
  } else {
    CameraRoll.save(url, {
      type: 'photo',
      album: appName,
    }).catch(error => console.log(error));
  }
}
