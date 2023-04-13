import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
  applicationFontFamily,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.primary.white,
  },
  background: {
    maxHeight: '35%',
  },
  icon: {
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: applicationDimensions.defaultPadding,
  },
  title: {
    color: applicationColors.semantic.info.shade500,
    textAlign: 'center',
  },
  description: {
    color: applicationColors.neutral.shade900,
    textAlign: 'center',
    marginHorizontal: applicationDimensions.defaultPadding,
    marginVertical: 30,
    lineHeight: 22,
    fontFamily: applicationFontFamily,
    fontSize: '1rem',
  },
  customMessageContainer: {
    margin: applicationDimensions.defaultPadding,
  },
  button: {
    borderRadius: 30,
    minWidth: applicationDimensions.singleButtonWidth,
  },
  closeButton: {
    position: 'absolute',
    top: getStatusBarHeight(),
    margin: applicationDimensions.smallPadding,
  },
});
