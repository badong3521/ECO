import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: applicationColors.secondary.softBlack,
  },
  icon: {
    zIndex: 10,
    elevation: 0,
  },
  content: {
    backgroundColor: applicationColors.primary.white,
    padding: 30,
    marginTop: -45,
    width: '80%',
    borderRadius: 12,
    margin: 30,
    alignItems: 'center',
  },
  title: {
    marginTop: applicationDimensions.smallPadding,
    textAlign: 'center',
  },
  message: {
    marginTop: applicationDimensions.smallPadding,
    textAlign: 'center',
  },
  backButton: {
    flex: 1,
    marginRight: 15,
  },
  confirm: {
    borderRadius: 20,
  },
  confirmContainer: {
    width: '100%',
    marginTop: applicationDimensions.defaultPadding,
  },
});
