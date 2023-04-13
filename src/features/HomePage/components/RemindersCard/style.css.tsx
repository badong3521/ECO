import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export const slideHeight = 120;
const dotSize = 8;
const weatherIcon = 86;

export default EStyleSheet.create({
  billContainer: {
    flex: 1,
    padding: applicationDimensions.smallPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  billContent: {
    flex: 1,
  },
  container: {
    marginTop: applicationDimensions.defaultPadding,
    height: slideHeight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: applicationColors.primary.evenWhite,
    marginHorizontal: applicationDimensions.defaultPadding,
    paddingRight: applicationDimensions.smallPadding,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  payNow: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 100,
  },
  arrow: {
    marginTop: 3,
  },
  text: {
    color: applicationColors.primary.white,
    paddingVertical: applicationDimensions.smallPadding,
  },
  textWeather: {
    color: applicationColors.primary.white,
  },
  pagination: {
    position: 'absolute',
    right: -20,
    top: 0,
    bottom: 0,
  },
  inactiveStyle: {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
    margin: 2,
  },
  billIcon: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginHorizontal: 5,
  },
  weatherContainer: {
    flex: 1,
    paddingHorizontal: applicationDimensions.smallPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: weatherIcon,
    height: weatherIcon,
    margin: applicationDimensions.smallPadding,
  },
  weatherContent: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  celsius: {
    color: applicationColors.primary.white,
    fontSize: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  today: {
    color: applicationColors.primary.white,
    flex: 1,
  },
  textInfo: {
    color: applicationColors.primary.white,
    flex: 1,
    marginLeft: applicationDimensions.smallPadding,
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  info: {
    flex: 1,
    marginLeft: 20,
  },
  darkFilter: {
    position: 'absolute',
    borderRadius: 20,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    opacity: 0.15,
    backgroundColor: 'black',
  },
  blurView: {
    position: 'absolute',
    borderRadius: 20,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
