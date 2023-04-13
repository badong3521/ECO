import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.primary.white,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '80%',
    aspectRatio: 1,
    marginBottom: 30,
  },
  button: {
    minWidth: 270,
    borderRadius: applicationDimensions.roundBorderRadius,
    marginTop: applicationDimensions.defaultPadding,
  },
  title: {
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: applicationDimensions.defaultPadding,
  },
});
