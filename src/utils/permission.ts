import { Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export type PermissionStatus = 'unavailable' | 'denied' | 'blocked' | 'granted';

// Since Android and iOS have different permission strings,
// we use these utilities to avoid the verbosity of writing switch cases
export function requestLocationPermission(
  granted?: (param: any) => void,
  denied?: (param: any) => void,
  blocked?: (param: any) => void,
): void {
  const { OS } = Platform;
  switch (OS) {
    case 'android':
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => {
        locationPermissionCallback(res, granted, denied, blocked);
      });
      break;
    case 'ios':
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(res => {
        locationPermissionCallback(res, granted, denied, blocked);
      });
      break;
    default:
      break;
  }
}

export function checkLocationPermission(
  callback: (res: PermissionStatus) => void,
): void {
  const { OS } = Platform;
  switch (OS) {
    case 'android':
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => {
        callback(res);
      });
      break;
    case 'ios':
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(res => {
        callback(res);
      });
      break;
    default:
      break;
  }
}

function locationPermissionCallback(
  res: string,
  granted?: (param: any) => void,
  denied?: (param: any) => void,
  blocked?: (param: any) => void,
): void {
  switch (res) {
    case RESULTS.GRANTED:
      if (granted) granted(res);
      break;
    case RESULTS.DENIED:
      if (denied) denied(res);
      break;
    case RESULTS.BLOCKED:
      if (blocked) blocked(res);
      break;
    default:
      break;
  }
}
