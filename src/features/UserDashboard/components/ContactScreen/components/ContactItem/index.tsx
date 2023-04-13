import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { applicationColors } from '../../../../../../../style.css';
import Text from '../../../../../../components/Text';
import Button from '../../../../../../components/Button';
import Icon from '../../../../../../components/Icon';
import styles from './style.css';

interface Props {
  description: string;
  phoneNumber: string;
  timeOpen: string;
  timeClose: string;
  daysOpen: string; // Format 'tttttff' with each char being a boolean corresponding to a date
  email?: string;
  onPressCall: (number: string) => void;
  onPressEmail: (email: string) => void;
}

// A singular listing in the ContactScreen
export default function ContactItem(props: Props) {
  const {
    description,
    phoneNumber,
    email,
    onPressCall,
    onPressEmail,
    timeOpen,
    timeClose,
    daysOpen,
  } = props;
  const { i18n } = useTranslation();

  const emitCall = () => onPressCall(phoneNumber);
  const emitEmail = () => onPressEmail(email!);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text fontSize="small" style={styles.smallBottomMargin}>
          {description}
        </Text>
        <View style={styles.row}>
          <View style={[styles.column, styles.smallMargin]}>
            <Text fontSize="small" style={styles.grey}>
              {i18n.t('features.contactScreen.openHours')}
            </Text>
            <Text fontSize="small" style={styles.grey}>
              {timeOpen} - {timeClose}
            </Text>
          </View>
          <View style={styles.column}>
            <Text fontSize="small" style={styles.grey}>
              Opening Days:
            </Text>
            <Text fontSize="small" style={styles.grey}>
              {renderOpeningDays(
                daysOpen,
                i18n.t('features.contactScreen.daysShort', {
                  returnObjects: true,
                }),
              )}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <Button
          type="clear"
          style={styles.button}
          icon={() => (
            <Icon
              size={20}
              name="phone"
              color={applicationColors.primary.shade900}
            />
          )}
          title={i18n.t('features.contactScreen.phone')}
          uppercase={false}
          onPress={emitCall}
          labelStyle={styles.phoneButtonLabel}
          containerStyle={styles.halfWidth}
        />
        {!!email && (
          <Button
            type="clear"
            style={styles.button}
            icon={() => (
              <Icon
                size={20}
                name="email"
                color={applicationColors.semantic.info.shade700}
              />
            )}
            title={i18n.t('features.contactScreen.email')}
            uppercase={false}
            onPress={emitEmail}
            labelStyle={styles.emailButtonLabel}
            containerStyle={styles.halfWidth}
          />
        )}
      </View>
    </View>
  );
}

// daysOpen comes in format 'tttttff' where each char is a boolean and corresponds to a day of the week
function renderOpeningDays(daysOpen: string, days: string[]) {
  const daysOpenArr = daysOpen.split('');

  // Split to ['t', 't', 'f', etc.]
  daysOpen.split('').forEach((char: string, idx: number) => {
    const isOpen: boolean = daysOpenArr[idx] === 't';
    if (!isOpen) {
      const index = days.indexOf(char);
      days.splice(index, 1);
    }
  });
  return days.join(' ');
}
