import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 5,
  },
  title: {
    color: applicationColors.neutral.shade900,
  },
  value: {
    marginTop: 10,
  },
  dash: {
    width: '100%',
    height: 1,
    marginTop: 10,
  },
  description: {
    flex: 1,
  },
  detailsContainer: {
    marginTop: applicationDimensions.smallPadding,
  },
  detailItem: {
    marginLeft: 0,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingRight: 0,
  },
});
