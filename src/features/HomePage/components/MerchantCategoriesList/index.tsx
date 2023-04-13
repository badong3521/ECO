import { View } from 'react-native';
import React from 'react';
import { UseTranslationResponse } from 'react-i18next';
import MerchantCategoryItem from '../MerchantCategoryItem';
import styles from './style.css';
import { CategoryType } from '../../../../components/Card/types';
import { LanguageType } from '../../../User/reducers';

interface MerchantCategoriesListProps {
  categories: CategoryType[];
  language: LanguageType;
  onViewAllPress: () => void;
  onCategoryPress: (category: CategoryType) => void;
  i18n: UseTranslationResponse;
}

// List of merchant categories. Max length of categories is 7 items.
// View all option will be shown in the last of list.
function MerchantCategoriesList(props: MerchantCategoriesListProps) {
  const { categories, language, onCategoryPress, onViewAllPress, i18n } = props;
  const aboveCategories =
    categories.length >= 4 ? categories.slice(0, 4) : categories;
  const belowCategories =
    categories.length >= 4
      ? categories.slice(4, Math.min(categories.length, 7))
      : [];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {aboveCategories.map(category => (
          <MerchantCategoryItem
            onPress={() => onCategoryPress(category)}
            title={category.name[language]}
            image={category.image}
            key={category.id.toString()}
            shadow
          />
        ))}
      </View>

      <View style={styles.bottom}>
        <View style={styles.row}>
          {belowCategories.map(category => (
            <MerchantCategoryItem
              onPress={() => onCategoryPress(category)}
              title={category.name[language]}
              image={category.image}
              key={category.id.toString()}
              shadow
            />
          ))}
        </View>
        <View style={styles.viewAllContainer}>
          <MerchantCategoryItem
            onPress={onViewAllPress}
            title={i18n.t('features.home.viewAll')}
            image={
              <View style={styles.viewAll}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}

export default React.memo(
  MerchantCategoriesList,
  (prevProps, nextProps) =>
    nextProps.categories === prevProps.categories &&
    nextProps.language === prevProps.language &&
    nextProps.i18n === prevProps.i18n,
);
