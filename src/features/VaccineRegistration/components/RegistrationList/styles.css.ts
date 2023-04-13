import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.neutral.shade200,
    padding: applicationDimensions.smallPadding,
  },
  containerStyle: {
    paddingBottom: applicationDimensions.defaultPadding,
  },
  descText: {
    margin: applicationDimensions.smallPadding,
  },
  residentItem: {
    margin: applicationDimensions.smallPadding,
    backgroundColor: applicationColors.primary.white,
    borderRadius: applicationDimensions.borderRadius.default,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    padding: applicationDimensions.defaultPadding,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  note: {
    paddingTop: applicationDimensions.smallPadding,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  textNote: {
    marginLeft: applicationDimensions.smallPadding,
  },
  needUpdateNote: {
    color: applicationColors.vaccine.statusBag.needUpdate.color,
  },
  unverifiedNote: {
    color: applicationColors.vaccine.statusBag.rejected.color,
  },
  editButtonContainer: {
    width: '100%',
  },
  editButton: {
    marginTop: applicationDimensions.smallPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
    paddingVertical: 0,
  },
  firstRow: {
    paddingBottom: applicationDimensions.smallPadding,
    alignItems: 'center',
  },
  firstText: {
    flex: 1,
  },
  statusBag: {
    padding: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  verified: {
    color: applicationColors.vaccine.statusBag.verified.color,
    backgroundColor: applicationColors.vaccine.statusBag.verified.bgColor,
    borderColor: applicationColors.vaccine.statusBag.verified.color,
  },
  verifying: {
    color: applicationColors.vaccine.statusBag.verifying.color,
    backgroundColor: applicationColors.vaccine.statusBag.verifying.bgColor,
    borderColor: applicationColors.vaccine.statusBag.verifying.color,
  },
  rejected: {
    color: applicationColors.vaccine.statusBag.rejected.color,
    backgroundColor: applicationColors.vaccine.statusBag.rejected.bgColor,
    borderColor: applicationColors.vaccine.statusBag.rejected.color,
  },
  needUpdate: {
    color: applicationColors.vaccine.statusBag.needUpdate.color,
    backgroundColor: applicationColors.vaccine.statusBag.needUpdate.bgColor,
    borderColor: applicationColors.vaccine.statusBag.needUpdate.color,
  },
  loader: {
    paddingTop: applicationDimensions.defaultPadding,
  },
});
