import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import TicketCreateForm from '../TicketCreateForm';
import { Ticket, Topic, useHelpDeskState } from '../../reducers';
import styles from './style.css';
import Text from '../../../../components/Text';
import { applicationColors } from '../../../../../style.css';
import Heading from '../../../../components/Heading';
import { useUserState } from '../../../User/reducers';

interface Props {
  navigation: any;
}

export default function TicketCreateScreen(props: Props) {
  const { navigation } = props;
  const topic: Topic = navigation.getParam('topic');
  const [, helpDeskActions] = useHelpDeskState();
  const [userState] = useUserState();
  const i18n = useTranslation();

  // Form has been correctly filled out, validated, and created in API
  function onSubmitSuccess(ticket: Ticket) {
    helpDeskActions.setShouldRefreshTickets(true);
    // Replace the form in the stack so if the user clicks back they arrive at the help desk landing page
    navigation.replace({
      routeName: 'TicketCreateSuccessfulScreen',
      params: {
        ticket,
        topic,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: applicationColors.neutral.shade500,
        }}
        bold="bold"
      >
        {i18n.t('features.helpDesk.create.feedbackAbout')}
      </Text>
      <Heading size="h2" bold="bold">
        {topic.name[userState.userLanguage]}
      </Heading>
      <TicketCreateForm topic={topic} onSubmitSuccess={onSubmitSuccess} />
    </View>
  );
}
