import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    padding: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
    backgroundColor: applicationColors.primary.white,
    maxHeight: 150,
  },
  subtext: {
    color: applicationColors.secondary.softGrey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  subject: {
    paddingVertical: applicationDimensions.smallPadding,
  },
  status: {
    position: 'absolute',
    right: applicationDimensions.defaultPadding,
    top: applicationDimensions.defaultPadding,
  },
  topic: {
    marginRight: 120,
  },
});
