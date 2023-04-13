import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: applicationColors.primary.white,
    padding: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
    marginBottom: applicationDimensions.defaultPadding,
  },
  customerDetails: {
    marginTop: applicationDimensions.smallPadding,
    padding: applicationDimensions.smallPadding,
    backgroundColor: applicationColors.secondary.background,
    borderRadius: applicationDimensions.roundBorderRadius,
    paddingBottom: applicationDimensions.smallPadding * 2,
  },
  detailsRow: {
    flexDirection: 'row',
    paddingTop: applicationDimensions.smallPadding,
  },
  detailContent: {
    flex: 1,
    textAlign: 'right',
    paddingLeft: applicationDimensions.smallPadding,
  },
  payNow: {
    flexDirection: 'row',
    paddingTop: applicationDimensions.smallPadding,
    alignItems: 'center',
  },
  totalDetails: {
    flex: 1,
    paddingRight: applicationDimensions.smallPadding,
  },
  totalDetailsBtn: {
    flex: 1,
  },
  totalNumber: {
    paddingTop: applicationDimensions.smallPadding,
  },
});
