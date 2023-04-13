import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../style.css';

export default EStyleSheet.create({
  root: {
    paddingHorizontal: applicationDimensions.defaultPadding,
  },
  section: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingTop: applicationDimensions.smallPadding,
    paddingBottom: applicationDimensions.smallPadding,
    color: applicationColors.neutral.shade900,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: applicationDimensions.defaultPadding,
    paddingRight: applicationDimensions.defaultPadding,
    paddingTop: applicationDimensions.smallPadding,
    paddingBottom: applicationDimensions.smallPadding,
  },
  label: {
    color: applicationColors.neutral.shade900,
  },
  labelContainer: {
    flex: 1,
    paddingRight: '20%',
  },
  accordionContainer: {
    backgroundColor: applicationColors.neutral.shade200,
    paddingLeft: applicationDimensions.smallPadding,
  },
  accordion: {
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  accordionTitle: {
    color: applicationColors.neutral.shade900,
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
});
