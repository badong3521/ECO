import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  coverImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    marginTop: -200,
    flex: 1,
    marginBottom: 60,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: applicationDimensions.defaultPadding,
  },
  areaName: {
    color: applicationColors.primary.white,
    marginBottom: applicationDimensions.defaultPadding,
  },
  text: {
    color: applicationColors.primary.white,
  },
  headerImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
  },
  root: {
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
  },
});
