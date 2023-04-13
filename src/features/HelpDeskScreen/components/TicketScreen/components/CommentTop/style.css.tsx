import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingVertical: applicationDimensions.smallPadding,
    borderTopLeftRadius: applicationDimensions.roundBorderRadius,
    borderTopRightRadius: applicationDimensions.roundBorderRadius,
  },
  containerUser: {
    backgroundColor: applicationColors.primary.shade900,
    alignItems: 'flex-end',
  },
  containerDepartment: {
    backgroundColor: applicationColors.secondary.shade500,
    alignItems: 'flex-start',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textUser: {
    marginRight: applicationDimensions.smallPadding,
    flex: 1,
    textAlign: 'right',
    color: applicationColors.primary.white,
  },
  textDepartment: {
    flex: 1,
    marginLeft: applicationDimensions.defaultPadding,
    color: applicationColors.primary.white,
  },
  textGrey: {
    marginTop: 5,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: applicationDimensions.defaultPadding,
  },
});
