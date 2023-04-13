import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.neutral.shade150,
  },
  emptyContainer: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.7,
  },
  divider: {
    height: 4,
    backgroundColor: applicationColors.neutral.shade300,
    width: Dimensions.get('screen').width,
    left: -applicationDimensions.defaultPadding,
    marginVertical: applicationDimensions.defaultPadding,
  },
});
