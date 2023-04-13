import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  listContent: {
    paddingRight: applicationDimensions.defaultPadding,
    marginTop: 10,
  },
  loader: {
    margin: applicationDimensions.defaultPadding,
  },
  cardContainer: {
    marginTop: 5,
    marginLeft: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
    padding: applicationDimensions.defaultPadding,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 4,
    borderWidth: 2,
    marginBottom: 25,
  },
  locationCode: {
    color: applicationColors.primary.white,
  },
  address: {
    color: applicationColors.primary.white,
    opacity: 0.7,
    marginTop: 5,
  },
  line: {
    height: 2,
    backgroundColor: applicationColors.primary.white,
    opacity: 0.19,
    marginVertical: applicationDimensions.smallPadding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    marginRight: applicationDimensions.smallPadding,
  },
  billIcon: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },
  totalBill: {
    color: applicationColors.primary.white,
    marginLeft: applicationDimensions.smallPadding,
    flex: 1,
  },
  button: {
    marginTop: applicationDimensions.defaultPadding,
    backgroundColor: 'rgba(255,255,255, 0.3)',
    borderWidth: 0,
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: applicationColors.primary.white,
  },
});
