import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
  },
  backgroundHeader: {
    backgroundColor: applicationColors.primary.shade500,
    height: 250,
    width: '100%',
    position: 'absolute',
  },
  leaf: {
    position: 'absolute',
    bottom: -100,
  },
  title: {
    marginHorizontal: applicationDimensions.defaultPadding,
    marginTop: 20,
  },
  header: {
    marginBottom: -20,
  },
  bookmarkButtonContainer: {
    marginRight: applicationDimensions.defaultPadding,
  },
});
