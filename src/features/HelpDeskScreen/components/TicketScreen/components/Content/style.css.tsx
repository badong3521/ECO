import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
  },
  scrollView: {
    paddingTop: applicationDimensions.defaultPadding,
    paddingBottom: 160,
  },
  loader: {
    marginTop: applicationDimensions.defaultPadding,
  },
  heading: {
    color: applicationColors.neutral.shade900,
  },
  resolveButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resolveLabel: {
    color: applicationColors.primary.shade900,
  },
  resolve: {
    marginBottom: 20,
    marginTop: 0,
    width: 200,
    borderColor: applicationColors.primary.shade900,
  },
  reopen: {
    marginHorizontal: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
  },
});
