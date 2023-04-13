import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  appBar: {
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
  },
  routeName: {
    color: applicationColors.primary.white,
  },
  routeNameContainer: {
    paddingBottom: applicationDimensions.defaultPadding,
  },
  actionContainer: {
    flexDirection: 'row',
    paddingBottom: applicationDimensions.defaultPadding,
    paddingHorizontal: applicationDimensions.defaultPadding / 2,
  },
  buttonContainer: {
    width: '50%',
    paddingHorizontal: applicationDimensions.defaultPadding / 2,
  },
});
