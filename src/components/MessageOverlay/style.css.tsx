import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  warningMessageBackground: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: applicationColors.secondary.softBlack,
  },
  warningMessage: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: Dimensions.get('screen').width * 0.66,
    marginTop: -1,
    padding: applicationDimensions.smallPadding,
    backgroundColor: 'white',
    borderRadius: applicationDimensions.squareBorderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  warningMessageText: {
    width: '90%',
  },
  warningMessageAction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    alignSelf: 'flex-end',
    elevation: 5,
    marginRight: applicationDimensions.smallPadding,
  },
});
