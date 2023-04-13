import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    padding: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.neutral.shade200,
  },
  content: {
    paddingBottom: applicationDimensions.smallPadding,
  },
  emailButtonLabel: {
    color: applicationColors.semantic.info.shade700,
  },
  phoneButtonLabel: {
    color: applicationColors.primary.shade900,
  },
  button: {
    padding: 0,
    backgroundColor: '#FFF',
    marginRight: 5,
    minWidth: '49%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  smallBottomMargin: {
    marginBottom: applicationDimensions.smallPadding,
  },
  smallMargin: {
    marginRight: applicationDimensions.defaultPadding,
  },
  grey: {
    color: applicationColors.neutral.shade500,
  },
  lightGrey: {
    color: applicationColors.neutral.shade200,
  },
});
