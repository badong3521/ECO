import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Badge } from 'react-native-elements';
import styles from './style.css';
import { CardActionType } from '../../types';
import Text from '../../../../components/Text';
import TouchableComponent from '../../../../components/TouchableComponent';
import IconComponent from '../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../style.css';

interface CardActionProps {
  action: CardActionType;
  onPress: (action: CardActionType) => void;
  hideDivider: boolean;
}

// CardAction is a button will link to another screen in UserDashboard
export default function CardAction(props: CardActionProps) {
  const { action, onPress, hideDivider } = props;
  const { i18n } = useTranslation();

  return (
    <TouchableComponent onPress={() => onPress(action)}>
      <View style={styles.root}>
        {action.icon}

        <View style={styles.titleGroup}>
          <Text style={styles.title}>
            {i18n.t(`features.userScreen.actions.${action.type}`)}
          </Text>

          {action.totalBookmarked && action.totalBookmarked > 0 ? (
            <Badge
              containerStyle={styles.badgeContainer}
              badgeStyle={styles.bookmarkBadge}
              value={action.totalBookmarked.toString()}
            />
          ) : (
            <></>
          )}

          {action.totalBills && action.totalBills > 0 ? (
            <Badge
              containerStyle={styles.badgeContainer}
              value={action.totalBills.toString()}
              status="error"
            />
          ) : (
            <></>
          )}
        </View>

        <IconComponent
          size={applicationDimensions.iconSize}
          color={applicationColors.neutral.shade900}
          name={applicationIcons.arrowRight}
          iconPack="feather"
        />
        {!hideDivider && <View style={styles.line} />}
      </View>
    </TouchableComponent>
  );
}
