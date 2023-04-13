import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    backgroundColor: applicationColors.neutral.shade200,
    marginLeft: -25,
    paddingRight: applicationDimensions.defaultPadding,
    paddingVertical: applicationDimensions.smallPadding,
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 86,
    position: 'absolute',
    left: 30,
    height: 50,
  },
  matchText: {
    color: applicationColors.neutral.shade900,
    marginRight: 5,
    flex: 1,
  },
  billPriceText: {
    textAlign: 'right',
    color: applicationColors.neutral.shade900,
  },
  accordion: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: applicationColors.secondary.background,
  },
  line: {
    backgroundColor: applicationColors.neutral.shade900,
    height: 1,
  },
  lineTop: {
    backgroundColor: applicationColors.neutral.shade500,
    height: 1,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...applicationStyle.shadow,
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.05)',
    opacity: Platform.OS === 'ios' ? 0.1 : 0.05,
  },
  billTitle: {
    width: Dimensions.get('window').width - 86,
    left: 30,
    height: 50,
  },
  totalItem: {
    marginLeft: 0,
    flexDirection: 'row',
    paddingVertical: applicationDimensions.smallPadding,
    paddingRight: 0,
  },
});
