import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  applicationFontFamily,
} from '../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.smallPadding / 2,
  },
  scrollView: {
    flex: 1,
  },
  fontStyle: {
    lineHeight: 27,
    fontFamily: applicationFontFamily,
    fontSize: '1.125rem',
    color: applicationColors.neutral.shade900,
  },
});
