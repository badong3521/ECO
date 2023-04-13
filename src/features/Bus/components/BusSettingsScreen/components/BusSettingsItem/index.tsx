import React from 'react';
import { View } from 'react-native';
import { Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Text from '../../../../../../components/Text';
import { BusSettingsOption } from '../../../../reducers/busSettings';
import TouchableComponent from '../../../../../../components/TouchableComponent';
import IconComponent from '../../../../../../components/Icon';

import { applicationColors } from '../../../../../../../style.css';
import styles from './style.css';

interface BusSettingsItemProps {
  item: BusSettingsOption;
  onEnableChange: (enable: boolean) => void;
  onItemClick: (item: BusSettingsOption) => void;
}

// Component has title and a switcher to turn on/off a setting option
export default function BusSettingsItem(props: BusSettingsItemProps) {
  const { item, onEnableChange, onItemClick } = props;
  const { title, enable } = item;
  const i18n = useTranslation();

  function onSwitchValueChange(b: boolean) {
    onEnableChange(b);
  }

  return (
    <TouchableComponent onPress={() => onItemClick(item)}>
      <View style={styles.row}>
        <Text style={styles.title}>{i18n.t(title)}</Text>
        {item.enable !== undefined && (
          <Switch
            value={enable}
            color={applicationColors.primary.shade900}
            onValueChange={onSwitchValueChange}
          />
        )}
        {item.navigateTo && (
          <IconComponent
            size={25}
            name="chevron-right"
            color={applicationColors.neutral.shade900}
          />
        )}
      </View>
    </TouchableComponent>
  );
}
