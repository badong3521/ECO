import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styles from './style.css';
import Button from '../../../../components/Button';
import { applicationColors } from '../../../../../style.css';
import Text from '../../../../components/Text';
import { Ticket, Topic } from '../../reducers';

const SUCCESS_LOGO = require('../../../../assets/helpDesk/png/create_success_logo.png');

interface TicketCreateSuccessfulScreenProps {
  navigation: any;
}

export default function TicketCreateSuccessfulScreen(
  props: TicketCreateSuccessfulScreenProps,
) {
  const { navigation } = props;
  const ticket: Ticket = navigation.getParam('ticket');
  const topic: Topic = navigation.getParam('topic');
  const i18n = useTranslation();

  return (
    <View style={styles.root}>
      <FastImage
        source={SUCCESS_LOGO}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text bold="bold" style={styles.title}>
        {i18n.t('features.helpDesk.create.success.title')}
      </Text>
      <Text style={styles.title}>
        {i18n.t('features.helpDesk.create.success.desc', {
          name: topic?.department?.name || '',
        })}
      </Text>
      <Button
        type="primary"
        title={i18n.t('features.helpDesk.create.success.viewDetail')}
        onPress={() => {
          navigation.replace({
            routeName: 'HelpDeskTicketScreen',
            params: {
              ticket,
            },
          });
        }}
        uppercase={false}
        style={styles.button}
      />
      <Button
        type="secondary"
        title={i18n.t('features.helpDesk.create.success.goBack')}
        onPress={() => {
          navigation.goBack();
        }}
        uppercase={false}
        color={applicationColors.semantic.error.shade500}
        style={styles.button}
      />
    </View>
  );
}
