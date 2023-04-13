import React from 'react';
import { withNavigation } from 'react-navigation';
import { applicationColors } from '../../../../../../../style.css';
import IconComponent from '../../../../../../components/Icon';
import { useUserState } from '../../../../../User/reducers';
import IconButtonWithCounter from '../../../../../../components/IconButtonWithCounter';

interface PropTypes {
  navigation: any;
  color?: string | any;
}

function BookmarkButton(props: PropTypes) {
  const { navigation, color = applicationColors.neutral.shade900 } = props;
  const [userState, userActions] = useUserState();

  function onPress() {
    userActions.setShouldRefreshBookmarks(true);
    navigation.navigate('BookmarkScreen');
  }

  return (
    <IconButtonWithCounter
      onPress={onPress}
      iconComponent={
        <IconComponent
          color={color}
          name="heart"
          iconPack="feather"
          size={24}
        />
      }
      count={userState.bookmarkOverview?.totalBookmarked}
    />
  );
}

export default withNavigation(BookmarkButton);
