import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  row: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  connectRowContainer: {
    width: 20,
  },
  hideConnectLine: {
    flex: 1,
  },
  dashConnectLine: {
    flex: 1,
    borderStyle: 'dotted',
    borderRadius: 0.5,
    borderWidth: 2,
    borderColor: applicationColors.neutral.shade500,
  },
  aboveHiddenLine: {
    borderLeftWidth: 2,
    borderLeftColor: applicationColors.neutral.shade500,
    borderBottomWidth: 2,
    borderBottomColor: applicationColors.neutral.shade500,
    borderBottomLeftRadius: 10,
    borderStyle: 'dotted',
    flex: 1,
    borderWidth: 2,
    borderColor: applicationColors.neutral.shade500,
  },
  topConnectLine: {
    borderLeftWidth: 2,
    borderLeftColor: applicationColors.neutral.shade500,
    borderBottomWidth: 2,
    borderBottomColor: applicationColors.neutral.shade500,
    borderBottomLeftRadius: 10,
    flex: 1,
  },
  bottomConnectLine: {
    borderLeftWidth: 2,
    borderLeftColor: applicationColors.neutral.shade500,
    borderTopWidth: 2,
    borderTopColor: applicationColors.neutral.shade500,
    borderTopLeftRadius: 10,
    flex: 1,
    marginTop: -2,
  },
  belowHiddenConnectLine: {
    borderLeftWidth: 2,
    borderLeftColor: applicationColors.neutral.shade500,
    borderTopWidth: 2,
    borderTopColor: applicationColors.neutral.shade500,
    borderTopLeftRadius: 10,
    flex: 1,
    marginTop: -2,
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: applicationColors.neutral.shade500,
  },
  squareIndicator: {
    width: 8,
    height: 8,
    backgroundColor: applicationColors.neutral.shade500,
    marginRight: 10,
    transform: [{ rotate: '45deg' }],
  },
  circleIndicator: {
    width: 8,
    height: 8,
    backgroundColor: applicationColors.neutral.shade500,
    marginRight: 10,
    borderRadius: 8,
  },
  noIndicator: {
    width: 8,
    height: 8,
    marginRight: 10,
  },
});
export const overWhiteMask = (hasTopRadius: boolean) =>
  EStyleSheet.create({
    backgroundColor: 'white',
    top: '-50%',
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: hasTopRadius ? 10 : 0,
    borderBottomLeftRadius: hasTopRadius ? 0 : 10,
    height: '100%',
    alignSelf: 'center',
    left: 2,
    right: 0,
  });
