import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
  scaleFactor,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.primary.white,
    paddingVertical: 5,
  },
  inputStyle: {
    width: undefined,
    height: undefined,
    flex: 1,
    paddingLeft: applicationDimensions.defaultPadding,
    paddingTop: 15 * scaleFactor,
    paddingBottom: 15 * scaleFactor,
    textAlignVertical: Platform.OS === 'android' ? 'center' : undefined,
    paddingRight: 40,
    borderWidth: 1,
    borderRadius: applicationDimensions.roundBorderRadius,
    maxHeight: Dimensions.get('screen').height * 0.2,
    backgroundColor: applicationColors.neutral.shade150,
    color: applicationColors.neutral.shade900,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  circleButton: {
    backgroundColor: applicationColors.neutral.shade200,
    borderRadius: 100,
    elevation: 0,
    shadowOpacity: 0,
  },
  loader: {
    width: 60,
  },
  spacer: { flex: 1 },
  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 0.5,
    backgroundColor:
      Platform.OS === 'android' ? applicationColors.neutral.shade200 : 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  reopenButtonContainer: {
    flex: 1,
    marginHorizontal: applicationDimensions.smallPadding,
  },
  reopenButton: {
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  reopenButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: applicationDimensions.defaultPadding,
  },
  attachments: {
    marginTop: applicationDimensions.defaultPadding,
  },
});
