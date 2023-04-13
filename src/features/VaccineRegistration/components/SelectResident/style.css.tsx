import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
} from '../../../../../style.css';

export default EStyleSheet.create({
  containerStep: {
    width:
      applicationDimensions.screenWidth -
      applicationDimensions.defaultPadding * 2,
  },
  header: {
    paddingTop: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.smallPadding,
  },
  iconNote: {
    marginRight: applicationDimensions.smallPadding,
  },
  note: {
    flexDirection: 'row',
    paddingBottom: applicationDimensions.smallPadding,
    paddingRight: applicationDimensions.smallPadding,
  },
  noteText: {
    paddingRight: applicationDimensions.smallPadding,
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: applicationDimensions.smallPadding,
  },
  radio: {
    paddingLeft: 0,
    paddingRight: 8,
  },
  relationshipName: {
    color: '#D9852B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#D9852B',
    borderRadius: 12,
    maxWidth: 110,
  },
  relationshipNameOwner: {
    color: '#26A68C',
    borderColor: '#26A68C',
  },
  containerRelationshipName: {
    marginLeft: 8,
    backgroundColor: '#FFFBF0',
  },
  containerRelationshipNameOwner: {
    backgroundColor: '#EBFFFB',
  },
  registerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 110,
  },
  textRegistered: {
    color: applicationColors.semantic.success.shade500,
    marginRight: 6,
  },
  textUnverified: {
    color: applicationColors.semantic.error.shade500,
    marginRight: 6,
  },
  name: {
    maxWidth: applicationDimensions.screenWidth - 180,
  },
  nameDisable: {
    color: applicationColors.neutral.shade500,
  },
  nameRegistered: {
    maxWidth: applicationDimensions.screenWidth - 270,
  },
  textGroup: {
    width: applicationDimensions.screenWidth - 150,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  totalSurvey: {
    paddingTop: applicationDimensions.smallPadding,
    paddingBottom: applicationDimensions.defaultPadding,
  },
});
