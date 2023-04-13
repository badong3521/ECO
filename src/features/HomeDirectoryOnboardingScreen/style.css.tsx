import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('screen').height,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  circle1: {
    opacity: 0.1,
    position: 'absolute',
    borderRadius: 256,
    width: 256,
    height: 256,
    bottom: -120,
    right: -100,
  },
  circle2: {
    opacity: 0.1,
    position: 'absolute',
    borderRadius: 119,
    width: 119,
    height: 119,
    bottom: 100,
    left: -70,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 40,
    marginBottom: 80,
  },
  image: {
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.66,
    aspectRatio: 571 / 506,
    marginRight: -(571 / (Dimensions.get('screen').width * 0.66)) * 30,
  },
  title: {
    textAlign: 'left',
    color: applicationColors.neutral.shade100,
  },
  text: {
    textAlign: 'left',
    color: applicationColors.neutral.shade100,
    marginTop: applicationDimensions.defaultPadding,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    width: Dimensions.get('screen').width - 80,
    borderRadius: applicationDimensions.roundBorderRadius,
    paddingVertical: applicationDimensions.smallPadding,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    marginHorizontal: 40,
    borderColor: applicationColors.neutral.shade100,
  },
  buttonLabel: {
    marginRight: applicationDimensions.defaultPadding,
    color: applicationColors.neutral.shade100,
  },
});
