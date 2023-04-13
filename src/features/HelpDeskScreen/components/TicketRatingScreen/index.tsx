import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styles from './style.css';
import { Ticket, TicketRating, useHelpDeskState } from '../../reducers';
import Text from '../../../../components/Text';
import Firebase from '../../../../services/firebase';
import HelpDeskApi from '../../../../services/api/helpDesk';
import CryIcon from '../../../../assets/helpDesk/svg/cry.svg';
import NormalIcon from '../../../../assets/helpDesk/svg/normal.svg';
import SmileIcon from '../../../../assets/helpDesk/svg/smile.svg';
import Button from '../../../../components/Button';
import DialogManager from '../../../../components/Dialog/manager';
import TouchableComponent from '../../../../components/TouchableComponent';
import { applicationColors } from '../../../../../style.css';

const RATING_LOGO = require('../../../../assets/helpDesk/png/rating_logo.png');

interface TicketRatingScreenProps {
  navigation: any;
}

const api = new HelpDeskApi();
export default function TicketRatingScreen(props: TicketRatingScreenProps) {
  const { navigation } = props;
  const [, helpDeskActions] = useHelpDeskState();
  const ticket: Ticket = navigation.getParam('ticket');
  const i18n = useTranslation();

  function renderReactionItem(reaction: ReactionType) {
    return (
      <TouchableComponent
        key={reaction.key}
        onPress={() => rateTicket(reaction.key)}
      >
        <View style={styles.reaction} key={reaction.key}>
          {reaction.icon}
          <Text allowFontScaling={false} style={styles.reactionLabel}>
            {i18n.t(`features.helpDesk.ticketRating.reactions.${reaction.key}`)}
          </Text>
        </View>
      </TouchableComponent>
    );
  }

  async function rateTicket(rating: TicketRating) {
    if (ticket) {
      Firebase.track('rate_the_ticket', {
        value: rating,
      });
      DialogManager.showLoadingDialog({ dismissible: true });
      await api.updateTicket({ id: ticket.id, rating });
      DialogManager.dismissLoadingDialog();
      helpDeskActions.setShouldRefreshTickets(true);
      navigation.navigate('HelpDeskScreen');
    }
  }
  return (
    <View style={styles.root}>
      <FastImage
        source={RATING_LOGO}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text bold="bold" style={styles.title}>
        {i18n.t(`features.helpDesk.ticketRating.title`)}
      </Text>
      <Text style={styles.desc}>
        {i18n.t(`features.helpDesk.ticketRating.desc`)}
      </Text>
      <View style={styles.reactions}>
        {REACTIONS.map(reaction => renderReactionItem(reaction))}
      </View>
      <View style={styles.notNowContainer}>
        <Button
          type="text"
          title={i18n.t('features.helpDesk.ticketRating.notNow')}
          onPress={() => {
            navigation.goBack();
          }}
          uppercase={false}
          color={applicationColors.semantic.error.shade500}
          labelStyle={styles.notNowLabel}
        />
      </View>
    </View>
  );
}

interface ReactionType {
  key: TicketRating;
  icon: React.ReactNode;
}

const REACTIONS: ReactionType[] = [
  {
    key: 'bad',
    icon: <CryIcon />,
  },
  {
    key: 'ok',
    icon: <NormalIcon />,
  },
  {
    key: 'good',
    icon: <SmileIcon />,
  },
];
