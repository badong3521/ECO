import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    backgroundColor: applicationColors.secondary.background,
    padding: applicationDimensions.defaultPadding,
    flex: 1,
  },
  loading: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginBottom: applicationDimensions.defaultPadding,
  },
  note: {
    paddingVertical: applicationDimensions.defaultPadding,
  },
});
