import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  rateAppIcon: {
    position: 'absolute',
    top: -30,
    right: -30,
  },
  rateAppText: {
    width: '60%',
    justifyContent: 'space-between',
  },
  rateAppBanner: {
    minHeight: 100,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EDFEF5',
    marginHorizontal: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
    marginBottom: 30,
    padding: applicationDimensions.defaultPadding,
  },
});
