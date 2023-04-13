import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

const iconSize = Dimensions.get('screen').width * 0.25;
export default EStyleSheet.create({
  root: {
    marginTop: applicationDimensions.smallPadding,
    borderRadius: 8,
    paddingHorizontal: applicationDimensions.defaultPadding,
    marginHorizontal: applicationDimensions.defaultPadding,
    paddingBottom: 30,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: applicationDimensions.defaultPadding,
    flex: 1,
  },
  title: {
    color: applicationColors.primary.white,
    marginTop: 5,
  },
  desc: {
    color: applicationColors.primary.white,
    marginTop: 8,
    lineHeight: 20,
    opacity: 0.7,
  },
  column: {
    marginLeft: applicationDimensions.defaultPadding,
    flex: 1,
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
    marginBottom: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.smallPadding,
    backgroundColor: 'rgba(255,255,255, 1)',
  },
  buttonTitle: {
    color: applicationColors.semantic.info.shade500,
    fontWeight: 'bold',
  },
});
