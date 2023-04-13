import React, { useState } from 'react';
import { FlatList, LayoutAnimation, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IconButton } from 'react-native-paper';
import Text from '../../../../../../components/Text';
import styles from './style.css';
import {
  BillTypes,
  SortTypes,
} from '../../../../../../services/api/types/ecoid';
import CheckboxFilterItem from '../CheckboxFilterItem';
import {
  applicationColors,
  applicationIcons,
} from '../../../../../../../style.css';

interface FilterAccordionProps {
  sort: SortTypes;
  filterBy: BillTypes[];
  onFilterUpdated: (sort: SortTypes, filterBy: BillTypes[]) => void;
  onBackPress: () => void;
}

// Include header of screen and the Filter accordion.
// when filter accordion show/hide, the filter icon also changes the color, so put the header here to avoid whole screen changes when accordion changed.
export default function FilterAccordion(props: FilterAccordionProps) {
  const { onBackPress, sort, filterBy, onFilterUpdated } = props;
  const [expandFilter, setExpandFilter] = useState<boolean>(false); // to check show/hide filter accordion, set state here to not affect to the flatList when it changes
  const i18n = useTranslation();

  function onCheckboxFilterPress(item: BillTypes) {
    let array = Array.from(filterBy);
    const index = filterBy?.findIndex(filter => filter === item);
    if (index < 0) {
      array = array.concat(item);
    } else {
      array.splice(index, 1);
    }
    onFilterUpdated(sort, array);
  }

  function onToggleFilter() {
    LayoutAnimation.configureNext(EXPAND_ANIMATE_SPRING);
    setExpandFilter(!expandFilter);
  }

  return (
    <View>
      <View style={styles.header}>
        <IconButton
          icon={applicationIcons.back}
          color={applicationColors.neutral.shade900}
          onPress={onBackPress}
          style={styles.backButton}
        />
        <Text style={styles.title} bold="bold">
          {i18n.t('headers.paymentHistory')}
        </Text>
        <IconButton
          icon="tune"
          color={
            expandFilter
              ? applicationColors.semantic.info.shade500
              : applicationColors.neutral.shade900
          }
          onPress={() => onToggleFilter()}
        />
      </View>
      {expandFilter && (
        <View style={styles.accordionContent}>
          <Text color="darkGrey" bold="bold">
            {i18n.t('features.ecoId.ecoIdPaymentHistoryScreen.filter')}
          </Text>
          <FlatList
            style={styles.checkboxes}
            data={FILTER_TYPES}
            keyExtractor={item => item}
            renderItem={item => (
              <CheckboxFilterItem
                title={i18n.t(
                  `features.ecoId.ecoIdPreparePaymentScreen.billTypes.${item.item}`,
                )}
                value={filterBy?.indexOf(item.item) >= 0}
                onValueChange={() => onCheckboxFilterPress(item.item)}
              />
            )}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
}

const FILTER_TYPES: BillTypes[] = ['DIEN', 'NUOC', 'XE', 'OTHER'];

const EXPAND_ANIMATE_SPRING = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 1,
  },
};
