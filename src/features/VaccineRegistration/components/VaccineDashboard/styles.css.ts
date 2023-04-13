import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.neutral.shade200,
    padding: applicationDimensions.smallPadding,
  },
  cardProcess: {
    margin: applicationDimensions.smallPadding,
    backgroundColor: applicationColors.primary.white,
    borderRadius: applicationDimensions.borderRadius.default,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  descText: {
    marginTop: 8,
  },
  textCardProcess: {
    flex: 1,
  },
  loader: {
    paddingTop: applicationDimensions.defaultPadding,
  },
});
