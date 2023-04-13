import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  background: {
    width:
      Dimensions.get('screen').width - applicationDimensions.defaultPadding * 2,
    marginHorizontal: applicationDimensions.defaultPadding,
    aspectRatio: 343 / 121,
  },
  content: {
    position: 'absolute',
    right: '20%',
  },
  text: {
    color: applicationColors.semantic.warning.shade300,
  },
  totalPrize: {
    marginTop: applicationDimensions.smallPadding,
  },
  oneMillion: {
    marginBottom: 5,
    marginTop: applicationDimensions.smallPadding,
  },
  closedCountdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openCountdown: {
    position: 'absolute',
    right: '5%',
  },
  times: {
    flexDirection: 'row',
  },
  timeColumn: {
    marginRight: 5,
    marginTop: 5,
    minWidth: 24,
  },
  timeDesc: {
    opacity: 0.7,
  },
  openFromText: {
    marginRight: 5,
  },
  viewNow: {
    color: applicationColors.semantic.warning.shade500,
  },
  viewNowContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightArrow: {
    marginTop: 3,
  },
  lixiIcons: {
    marginTop: -22,
  },
  lixiTotalContainer: {
    marginTop: applicationDimensions.smallPadding,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  lixiTotalTextContainer: {
    marginLeft: 30,
  },
  fullTime: {
    minWidth: 100,
  },
});
