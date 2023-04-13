import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../../../style.css';

const routeStyle = (color: string) =>
  EStyleSheet.create({
    routeNameContainer: {
      alignSelf: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: color,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 6,
      paddingBottom: 6,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: applicationDimensions.smallPadding,
    },
    routeName: {
      marginRight: 6,
      color,
    },
  });

export default routeStyle;
