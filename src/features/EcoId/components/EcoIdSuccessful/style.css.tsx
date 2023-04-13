import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.primary.white,
  },
  background: {
    maxHeight: '45%',
  },
  icon: {
    position: 'absolute',
    bottom: '-25%',
    alignSelf: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: applicationDimensions.defaultPadding,
    marginTop: 30,
  },
  title: {
    color: applicationColors.semantic.info.shade500,
    textAlign: 'center',
  },
  description: {
    color: applicationColors.neutral.shade900,
    textAlign: 'center',
    marginHorizontal: applicationDimensions.defaultPadding,
    marginVertical: 35,
  },
  button: {
    borderRadius: 30,
    minWidth: applicationDimensions.singleButtonWidth,
  },
});
