import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.primary.white,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  reactions: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 53,
  },
  title: {
    marginTop: 58,
    textAlign: 'center',
  },
  desc: {
    marginTop: applicationDimensions.defaultPadding,
    textAlign: 'center',
  },
  reaction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactionLabel: {
    textAlign: 'center',
    marginTop: applicationDimensions.smallPadding,
  },
  notNowContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  notNowLabel: {
    color: applicationColors.semantic.error.shade500,
  },
  logo: {
    width: '70%',
    aspectRatio: 1,
  },
});
