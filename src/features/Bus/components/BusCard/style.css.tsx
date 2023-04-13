import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    padding: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  circle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  cardNumber: {
    color: applicationColors.secondary.shade300,
    marginTop: applicationDimensions.smallPadding,
  },
  row: {
    flexDirection: 'row',
  },
  startFrom: {
    marginTop: applicationDimensions.defaultPadding,
  },
  label: {
    opacity: 0.5,
    marginTop: 24,
  },
  value: {
    marginTop: applicationDimensions.smallPadding,
  },
  tag: {
    position: 'absolute',
    right: 0,
    marginTop: applicationDimensions.defaultPadding,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 8,
    maxWidth: 150,
  },
  tripRemaining: {
    marginLeft: 40,
  },
  fullName: {
    color: applicationColors.primary.white,
    marginRight: 120,
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  match: {
    flex: 1,
  },
  arrow: {
    position: 'absolute',
    right: applicationDimensions.smallPadding,
  },
  dropdownContainer: {
    width: 120,
    paddingVertical: 5,
    flexDirection: 'row',
    paddingHorizontal: applicationDimensions.smallPadding,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 5,
    borderColor: applicationColors.primary.white,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  amountContainer: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    borderWidth: 1,
    borderColor: applicationColors.primary.white,
    borderRadius: 8,
    paddingVertical: 5,
  },
  checkboxContainer: {
    position: 'absolute',
    top: applicationDimensions.defaultPadding,
    right: applicationDimensions.defaultPadding,
  },
});
