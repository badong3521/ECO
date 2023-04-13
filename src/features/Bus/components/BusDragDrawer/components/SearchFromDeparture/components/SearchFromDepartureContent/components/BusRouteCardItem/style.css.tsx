import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../../../style.css';

export const styles = EStyleSheet.create({
  container: {
    padding: applicationDimensions.defaultPadding,
    flex: 1,
  },
  leftContainer: {
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 25,
  },
  connectLine: {
    borderColor: applicationColors.semantic.info.shade500,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 16,
    position: 'absolute',
    flex: 1,
    top: 2,
    bottom: 2,
    alignSelf: 'flex-end',
    width: '50%',
  },
  stopNameContainerDeparture: {
    width: '80%',
  },
  stopNameContainerDestination: {
    position: 'absolute',
    width: '80%',
    bottom: 0,
  },
  topIndicator: {
    width: 8,
    height: 8,
    backgroundColor: applicationColors.semantic.info.shade500,
    marginRight: 5,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    right: 0,
    top: -1,
  },
  bottomIndicator: {
    width: 8,
    height: 8,
    backgroundColor: applicationColors.semantic.info.shade500,
    marginRight: 5,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    right: 0,
    bottom: -1,
  },
  routeNameContainer: {
    backgroundColor: applicationColors.semantic.info.shade500,
    borderRadius: 30,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 6,
    paddingBottom: 6,
    alignSelf: 'baseline',
  },
  routeName: {
    color: 'white',
    textAlign: 'center',
  },
  routeTime: {
    height: 30,
    marginLeft: 80,
    color: '#606060',
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
});

export const itemContainer = (index: number, itemsCount: number) =>
  EStyleSheet.create({
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('screen').width * 0.8,
    marginLeft: index === 0 ? applicationDimensions.defaultPadding : 0,
    marginRight:
      index === itemsCount - 1 ? applicationDimensions.defaultPadding : 10,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    height: Dimensions.get('screen').width * 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  });
