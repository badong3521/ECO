import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  appBar: {
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.smallPadding,
  },
  label: {
    marginLeft: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
  },
  dropDown: {
    marginLeft: applicationDimensions.defaultPadding,
    marginRight: applicationDimensions.defaultPadding,
    marginTop: -20,
    marginBottom: applicationDimensions.defaultPadding,
  },
  arriveTimeList: {
    marginBottom: applicationDimensions.defaultPadding,
  },
});
