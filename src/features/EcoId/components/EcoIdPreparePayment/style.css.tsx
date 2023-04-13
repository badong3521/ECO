import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  rootAccordion: {
    width: '100%',
  },
  householdInfo: {
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    color: applicationColors.semantic.info.shade500,
  },
  line: {
    height: 2,
    backgroundColor: applicationColors.neutral.shade300,
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: applicationDimensions.defaultPadding,
    paddingHorizontal: applicationDimensions.defaultPadding,
  },
  totalAmount: {
    flex: 1,
  },
  button: {
    borderRadius: 30,
    backgroundColor: applicationColors.semantic.info.shade500,
    marginHorizontal: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
  },
  areaName: {
    color: applicationColors.neutral.shade900,
    lineHeight: 25,
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '40%',
  },
});
