import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { CardType } from '../../../../../../components/Card/types';
import styles from './style.css';
import HTMLView from '../../../../../../components/HTMLView';
import Gallery from '../../../../../../components/Gallery';
import Text from '../../../../../../components/Text';
import FacebookLogo from '../../../../../../assets/logos/facebook_round.svg';
import TouchableComponent from '../../../../../../components/TouchableComponent';
import InstaLogo from '../../../../../../assets/logos/instagram.svg';
import Email from '../../../../../../assets/images/email.svg';
import { applicationDimensions } from '../../../../../../../style.css';
import DateUtils from '../../../../../../utils/date';

interface AboutProps {
  card: CardType;
  onContactPress: (link: string) => void;
  onEmailPress: (email: string) => void;
}

// Display the "About" section of a Merchant card.
export default function About(props: AboutProps) {
  const { card, onContactPress, onEmailPress } = props;
  const i18n = useTranslation();

  return (
    <View style={styles.description}>
      {card.merchant?.images && (
        <Gallery
          images={card.merchant?.images}
          imageColumns={Math.ceil(card.merchant?.images.length / 2)}
        />
      )}
      <View style={styles.content}>
        <HTMLView html={card.description} />
        {card.merchant && (
          <>
            <View style={styles.section}>
              <Text bold="bold" style={styles.sectionTitle}>
                {i18n.t('features.cardScreen.openingHours')}
              </Text>
              {DateUtils.DAYS_OF_WEEK.map(day => {
                if (card.merchant?.merchantOpeningTime[`${day}Selected`]) {
                  const openingTime = moment(
                    card.merchant?.merchantOpeningTime[`${day}OpeningTime`],
                  ).format(DateUtils.MOMENT_FORMATS.TIME);
                  const closingTime = moment(
                    card.merchant?.merchantOpeningTime[`${day}ClosingTime`],
                  ).format(DateUtils.MOMENT_FORMATS.TIME);
                  return (
                    <Text key={`${day}-operation-hours`} fontSize="small">
                      {`${i18n.t(
                        `date.daysOfWeek.${day}`,
                      )}: ${openingTime} - ${closingTime}`}
                    </Text>
                  );
                }
                return undefined;
              })}
            </View>
            {card.social && (
              <View style={styles.section}>
                <Text
                  bold="bold"
                  style={[
                    styles.sectionTitle,
                    { marginBottom: applicationDimensions.smallPadding },
                  ]}
                >
                  {i18n.t('features.cardScreen.contact')}
                </Text>
                <View style={styles.row}>
                  {!!card.social.facebook && (
                    <TouchableComponent
                      onPress={() => onContactPress(card.social?.facebook!)}
                    >
                      <View style={styles.contactButton}>
                        <FacebookLogo width={40} height={40} />
                      </View>
                    </TouchableComponent>
                  )}
                  {!!card.social.instagram && (
                    <TouchableComponent
                      onPress={() => onContactPress(card.social?.instagram!)}
                    >
                      <View style={styles.contactButton}>
                        <InstaLogo width={40} height={40} />
                      </View>
                    </TouchableComponent>
                  )}
                  {!!card.merchant.email && (
                    <TouchableComponent
                      onPress={() => onEmailPress(card.merchant?.email!)}
                    >
                      <View style={styles.contactButton}>
                        <Email width={40} height={40} />
                      </View>
                    </TouchableComponent>
                  )}
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}
