import { Platform, StyleSheet } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default StyleSheet.create({
  cardImage: {
    width: 24,
    height: 24,
    marginTop: Platform.OS === 'ios' ? 8 : 5,
  },
  itemRadioButton: {
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
    padding: applicationDimensions.defaultPadding,
  },
  selectType: {
    paddingTop: applicationDimensions.defaultPadding,
  },
  paymentFee: {
    color: applicationColors.vaccine.statusBag.rejected.color,
    fontSize: applicationDimensions.textSizeSmall,
    paddingVertical: 6,
  },
  payNow: {
    flexDirection: 'row',
    paddingTop: applicationDimensions.smallPadding,
    alignItems: 'center',
    backgroundColor: applicationColors.primary.white,
    padding: applicationDimensions.defaultPadding,
    marginBottom: -applicationDimensions.defaultPadding,
    marginHorizontal: -applicationDimensions.defaultPadding,
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
  loader: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
  },
  cardDetails: {
    flex: 1,
  },
});
