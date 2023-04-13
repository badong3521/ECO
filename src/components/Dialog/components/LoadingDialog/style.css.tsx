import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center',
    padding: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.secondary.softBlack,
  },
  title: {
    color: applicationColors.primary.white,
    textAlign: 'center',
  },
  animation: {
    width: 200,
    height: 200,
    marginTop: -50,
  },
  goBack: {
    marginTop: applicationDimensions.defaultPadding,
    borderRadius: 30,
    minWidth: applicationDimensions.singleButtonWidth,
  },
  errorContainer: {
    alignItems: 'center',
    margin: applicationDimensions.defaultPadding,
  },
  error: {
    color: applicationColors.primary.white,
    textAlign: 'center',
    marginTop: applicationDimensions.defaultPadding,
  },
});
