import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  textContainer: {
    padding: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.secondary.background,
  },
  paddingBottom: {
    paddingBottom: applicationDimensions.defaultPadding,
  },
  tabIndicator: {
    backgroundColor: applicationColors.primary.shade900,
    width: Dimensions.get('screen').width / 4,
    marginLeft: Dimensions.get('screen').width / 8,
  },
  tabLabel: {
    textTransform: 'capitalize',
    color: applicationColors.primary.shade900,
    fontWeight: 'bold',
  },
  tab: {
    backgroundColor: applicationColors.neutral.shade100,
  },
});
