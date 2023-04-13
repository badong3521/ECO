import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  label: {
    paddingLeft: applicationDimensions.defaultPadding,
    paddingRight: applicationDimensions.defaultPadding,
  },
  searchResult: {
    marginTop: applicationDimensions.smallPadding,
  },
  bigDivider: {
    height: 4,
    backgroundColor: applicationColors.neutral.shade200,
    marginBottom: applicationDimensions.smallPadding,
  },
  noStops: {
    alignSelf: 'center',
    margin: 30,
    color: applicationColors.neutral.shade500,
    textAlign: 'center',
  },
});
