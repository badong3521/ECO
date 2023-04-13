import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../style.css';

export default EStyleSheet.create({
  footer: {
    marginVertical: applicationDimensions.defaultPadding,
  },
  flatList: {
    backgroundColor: applicationColors.secondary.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  listItem: {
    padding: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.secondary.background,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: applicationDimensions.smallPadding,
  },
  date: {
    color: applicationColors.neutral.shade500,
  },
  title: {
    color: applicationColors.neutral.shade900,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: applicationDimensions.smallPadding,
  },
  description: {
    color: applicationColors.neutral.shade900,
  },
  divider: {
    ...applicationStyle.smallDivider,
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  listEmptyContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 35,
  },
  listEmptyText: {
    textAlign: 'center',
    marginBottom: 80,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: applicationColors.neutral.shade900,
    marginLeft: applicationDimensions.smallPadding,
    textTransform: 'uppercase',
  },
  avatar: {
    elevation: 0,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unread: {
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: applicationDimensions.smallPadding,
    backgroundColor: applicationColors.semantic.error.shade500,
  },
});
