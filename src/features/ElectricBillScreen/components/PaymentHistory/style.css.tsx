import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    backgroundColor: applicationColors.secondary.background,
    padding: applicationDimensions.defaultPadding,
    flex: 1,
  },
  loading: {
    flex: 1,
  },
  note: {
    color: applicationColors.neutral.shade900,
    paddingVertical: applicationDimensions.defaultPadding,
  },
  itemContainer: {
    backgroundColor: applicationColors.primary.white,
    padding: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
    marginBottom: applicationDimensions.defaultPadding,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDate: {
    flex: 1,
    paddingRight: applicationDimensions.smallPadding,
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
});
