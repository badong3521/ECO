import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: applicationColors.neutral.shade200,
    alignItems: 'center',
  },
  stopName: {
    flex: 1,
    color: applicationColors.neutral.shade900,
    marginRight: 10,
  },
  routes: {
    maxWidth: '60%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export const routeContainer = (routeColor: string) =>
  EStyleSheet.create({
    alignSelf: 'baseline',
    flexDirection: 'row',
    borderRadius: applicationDimensions.squareBorderRadius,
    borderWidth: 1,
    borderColor: routeColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  });

export const routeName = (routeColor: string) =>
  EStyleSheet.create({
    marginRight: 6,
    color: routeColor,
  });
