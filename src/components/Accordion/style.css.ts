import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';
import { applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: applicationDimensions.smallPadding,
    marginLeft: Platform.OS === 'android' ? 5 : 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: applicationDimensions.smallPadding,
  },
});
