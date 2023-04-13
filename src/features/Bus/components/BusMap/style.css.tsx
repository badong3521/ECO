import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  floatings: {
    position: 'absolute',
    top: 22 + getStatusBarHeight(),
    right: applicationDimensions.defaultPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 22 + getStatusBarHeight(),
    left: applicationDimensions.defaultPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingMyLocationButton: {
    marginTop: applicationDimensions.defaultPadding,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningMessageContainer: {
    position: 'absolute',
    marginLeft:
      Dimensions.get('screen').width * 0.33 -
      applicationDimensions.defaultPadding,
    marginTop: getStatusBarHeight() + 22 + 40 + 40 + 20 + 3,
  },
  busCardFab: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: applicationColors.primary.shade100,
  },
  busCardFabLabel: {
    color: applicationColors.primary.shade900,
  },
  scheduleFab: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: applicationColors.primary.shade900,
  },
});

export const mapEdgePadding = {
  top: getStatusBarHeight(),
  right: 30,
  bottom: Dimensions.get('screen').height * 0.5,
  left: 30,
};
