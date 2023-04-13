import { Dimensions, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { withNavigation } from 'react-navigation';
import {
  applicationColors,
  applicationDimensions,
  applicationFontFamily,
} from '../../../style.css';
import Icon from '../Icon';
import Text from '../Text';
import styles from './style.css';
import Tooltip from '../Tooltip';
import { useUserState } from '../../features/User/reducers';

interface BottomTabBarProps {
  focused: boolean;
  icon: string;
  tintColor: string;
  title: string;
  navigation: any;
}

function BottomTabBar(props: BottomTabBarProps) {
  const { focused, icon, tintColor, title, navigation } = props;
  const tooltipRef = useRef(null);
  const [userState] = useUserState();
  const { tooltip, userLanguage, user } = userState;

  useEffect(() => {
    if (
      tooltipRef &&
      tooltipRef.current &&
      user?.reachedAppOnboardingScreen &&
      navigation.isFocused()
    ) {
      tooltipRef.current.toggleTooltip();
    }
  }, [tooltip, user?.reachedAppOnboardingScreen]);

  function renderIcon() {
    if (tooltip) {
      switch (tooltip.menuType) {
        case 'profile':
          if (icon === 'person' && !focused) {
            return (
              <Tooltip
                title={tooltip.title[userLanguage]}
                details={
                  tooltip.description
                    ? tooltip.description[userLanguage]
                    : undefined
                }
                tooltipRef={tooltipRef}
              >
                <Icon
                  name={icon}
                  size={applicationDimensions.iconSize}
                  color={tintColor}
                />
              </Tooltip>
            );
          }
          break;
        case 'bus':
          if (icon === 'directions-bus' && !focused) {
            return (
              <Tooltip
                title={tooltip.title[userLanguage]}
                details={
                  tooltip.description
                    ? tooltip.description[userLanguage]
                    : undefined
                }
                tooltipRef={tooltipRef}
              >
                <Icon
                  name={icon}
                  size={applicationDimensions.iconSize}
                  color={tintColor}
                />
              </Tooltip>
            );
          }
          break;
        default:
          break;
      }
    }
    return (
      <Icon
        name={icon}
        size={applicationDimensions.iconSize}
        color={tintColor}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: focused ? Dimensions.get('screen').width * 0.25 : undefined,
          backgroundColor: focused
            ? applicationColors.primary.shade100
            : undefined,
        },
      ]}
    >
      {renderIcon()}
      {focused && (
        <Text
          fontSize="small"
          style={{
            color: tintColor,
            textAlign: 'center',
            fontFamily: applicationFontFamily,
            marginLeft: 5,
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
}

export default withNavigation(BottomTabBar);
