import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    marginBottom: 40,
  },
  content: {
    marginHorizontal: 40,
    alignItems: 'center',
    marginBottom: 60,
    minHeight: '35%',
  },
  title: {
    textAlign: 'center',
    color: applicationColors.semantic.info.shade500,
    marginBottom: applicationDimensions.defaultPadding,
  },
  description: {
    textAlign: 'center',
    color: applicationColors.secondary.darkGrey,
    marginBottom: applicationDimensions.defaultPadding,
    lineHeight: 18,
  },
});
