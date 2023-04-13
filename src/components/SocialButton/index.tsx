import React from 'react';
import { View } from 'react-native';
import Icon, { IconPackType } from '../Icon';
import IconButton from '../IconButton';
import Button from '../Button';
import { applicationColors, applicationDimensions } from '../../../style.css';
import Firebase from '../../services/firebase';

const facebookBlue = '#3b5998';

interface SocialButtonProps {
  social: 'facebook' | 'instagram';
  link: string;
  onPress: (social: string, link: string) => void;
  padding?: number;
  type: 'circle' | 'large';
}

// Render a clickable icon for any social site
// 'cirlce' => Small round icon
// 'large' => Full width button
export default function SocialButton(props: SocialButtonProps) {
  const { social, link, onPress, padding, type } = props;
  const capitalizedSocial = social.charAt(0).toUpperCase() + social.slice(1);

  function emitPress() {
    Firebase.track('social_link_press', {
      type: social,
      value: link,
    });
    onPress(social, link);
  }

  function getIconName(): string {
    if (social === 'facebook') {
      return 'sc-facebook';
    }
    return 'instagram';
  }

  function getIconPack(): IconPackType {
    if (social === 'facebook') {
      return 'evil';
    }
    return 'ant';
  }

  function getIconColor(): string {
    if (social === 'facebook') {
      return facebookBlue;
    }
    return applicationColors.semantic.info.shade500;
  }

  return (
    <View>
      {type === 'circle' && (
        <IconButton
          iconName={getIconName()}
          type="button"
          iconPack={getIconPack()}
          iconSize={25}
          buttonBackgroundColor={getIconColor()}
          iconColor="white"
          padding={padding}
          onPress={emitPress}
        />
      )}
      {type === 'large' && (
        <Button
          type="primary"
          color={getIconColor()}
          icon={() => (
            <Icon size={24} name={getIconName()} iconPack={getIconPack()} />
          )}
          title={capitalizedSocial}
          uppercase={false}
          onPress={emitPress}
          containerStyle={{
            borderRadius: 10,
          }}
        />
      )}
    </View>
  );
}

SocialButton.defaultProps = {
  padding: applicationDimensions.defaultPadding,
  type: 'circle',
};
