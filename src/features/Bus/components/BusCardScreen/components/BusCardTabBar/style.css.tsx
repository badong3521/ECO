import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingTop: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.primary.white,
  },
  tab: {
    marginHorizontal: 0,
    paddingVertical: 0,
    minHeight: 0,
  },
  content: {
    backgroundColor: applicationColors.primary.shade300,
    marginHorizontal: applicationDimensions.defaultPadding,
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
  labelContainer: {
    width:
      (Dimensions.get('screen').width -
        applicationDimensions.defaultPadding * 2) /
        2 -
      8,
    flex: 1,
    borderRadius: applicationDimensions.squareBorderRadius,
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    color: applicationColors.primary.shade900,
  },
});
