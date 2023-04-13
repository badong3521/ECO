import { Dimensions, FlatList, View, ViewStyle } from 'react-native';
import React from 'react';
import styles from './style.css';
import Button from '../Button';
import { applicationColors, applicationDimensions } from '../../../style.css';
import Icon from '../Icon';
import TouchableComponent from '../TouchableComponent';

type ShortcutBarPropTypes = {
  canEdit: boolean;
  buttons: ShortcutButtonTypes[];
  onEditPress: () => any;
  style?: ViewStyle | ViewStyle[];
};

type ShortcutButtonTypes = {
  title: string;
  icon: string;
  onPress: () => any;
};

// renders an editable flatlist containing user's favorites
export default function ShortcutBar(props: ShortcutBarPropTypes) {
  const { canEdit, buttons, onEditPress, style } = props;

  return (
    <View style={[style, { flexDirection: 'row' }]}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        horizontal
        data={buttons}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => renderItem(item, canEdit)}
        contentContainerStyle={styles.actionContainer}
      />
      {canEdit && (
        <TouchableComponent onPress={onEditPress}>
          <View style={styles.customIconButton}>
            <Icon
              size={applicationDimensions.iconSize}
              name="edit"
              iconPack="material"
              color={applicationColors.primary.shade900}
            />
          </View>
        </TouchableComponent>
      )}
    </View>
  );
}

function renderItem(item: ShortcutButtonTypes, canEdit: boolean) {
  return (
    <View
      style={[
        styles.buttonContainer,
        {
          width: canEdit
            ? Dimensions.get('screen').width / 2 -
              applicationDimensions.defaultPadding * 3
            : Dimensions.get('screen').width / 2 -
              applicationDimensions.defaultPadding * 1.5,
        },
      ]}
    >
      <Button
        icon={() => (
          <Icon
            size={applicationDimensions.iconSize}
            name={item.icon}
            iconPack="material"
            color={applicationColors.primary.shade900}
          />
        )}
        type="secondary"
        title={item.title}
        onPress={item.onPress}
        uppercase={false}
      />
    </View>
  );
}
