import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingBottom: 50,
  },
  backButtonContainer: {
    marginLeft: -20,
  },
  title: {
    flex: 1,
  },
  subtitle: {
    marginTop: 5,
    color: applicationColors.neutral.shade500,
  },
  closeButton: {
    marginRight: -15,
  },
  topicItemContainer: {
    backgroundColor: applicationColors.neutral.shade200,
    borderRadius: applicationDimensions.squareBorderRadius,
    paddingVertical: applicationDimensions.smallPadding,
    paddingHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicName: {
    flex: 1,
    marginLeft: applicationDimensions.defaultPadding,
  },
  image: {
    width: 44,
    height: 44,
  },
  list: {
    maxHeight: Dimensions.get('screen').height * 0.8,
  },
  headers: {
    marginTop: -10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
