import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../../style.css';

export default EStyleSheet.create({
  routeName: {
    color: 'white',
  },
});

export const container = (color: string) =>
  EStyleSheet.create({
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    elevation: 2,
    backgroundColor: color,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 30,
    marginLeft: applicationDimensions.smallPadding,
    marginBottom: applicationDimensions.defaultPadding,
    marginRight: applicationDimensions.smallPadding,
  });
