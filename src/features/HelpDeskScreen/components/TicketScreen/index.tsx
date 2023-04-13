import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Ticket, useHelpDeskState } from '../../reducers';
import { AttachmentType } from '../../../../components/AttachmentList/components/Attachment';
import HelpDeskApi from '../../../../services/api/helpDesk';
import { useUserState } from '../../../User/reducers';
import {
  CreateCommentParams,
  HelpdeskTicket,
} from '../../../../services/api/types/helpDesk';
import useAttachments from '../../../../utils/hooks/useAttachments';
import Content from './components/Content';
import Firebase from '../../../../services/firebase';
import NavigationHeader from '../../../../components/NavigationHeader';
import TicketResponseStatus from '../TicketResponseStatus';
import styles from './style.css';
import SendCommentInput from './components/SendCommentInput';
import DialogManager from '../../../../components/Dialog/manager';

interface Props {
  navigation: any;
}

const api = new HelpDeskApi();
const uploadLimit = 4;

// Requires a Ticket sent when navigating
export default function TicketScreen(props: Props) {
  const { navigation } = props;
  // Fetch ticket from navigation params so we can fetch the real ticket from API
  const paramTicket: Ticket = navigation.getParam('ticket');
  const [ticket, setTicket] = useState<HelpdeskTicket>();
  const [loading, setLoading] = useState<boolean>(false);
  const [userState] = useUserState();
  const inputRef = React.useRef<any>();
  const [, helpDeskActions] = useHelpDeskState();

  // Set the ticket with data from the API
  async function setTicketApi(id: number) {
    const fetchedTicket = await fetchTicket(id);
    if (fetchedTicket) {
      setTicket(fetchedTicket);
      navigation.setParams({
        ticket: fetchedTicket,
      });
    }
  }

  async function onSubmit(
    description?: string,
    attachments?: AttachmentType[],
  ) {
    if (description) {
      setLoading(true);
      const params: CreateCommentParams = {
        description,
      };
      // Append attachment SGIDs
      if (attachments) {
        params.attachments = attachments.map((att: any) => att.sgid);
      }
      const response = await api.createComment(ticket!.id, params);

      if (response.status === 'success') {
        Firebase.track('submit_new_message_in_ticket');
        // Push new comment to ticket for instant refresh
        const { data } = response.result;
        ticket!.comments.push(data);
        // Force refresh by creating a new object
        // @ts-ignore
        setTicket({ ...ticket });
        inputRef.current?.clearText();
        clearAttachments();
      }
      helpDeskActions.setShouldRefreshTickets(true);
      setLoading(false);
    }
  }

  async function resolveTicket() {
    if (ticket) {
      DialogManager.showLoadingDialog({ dismissible: true });
      Firebase.track('resolve_the_ticket');
      await api.updateTicket({ id: ticket.id, status: 'closed' });
      await setTicketApi(ticket.id);
      DialogManager.dismissLoadingDialog();
      helpDeskActions.setShouldRefreshTickets(true);
      rateTicket();
    }
  }

  async function reopenTicket() {
    if (ticket) {
      Firebase.track('reopen_the_ticket');
      await api.updateTicket({ id: ticket.id, status: 'open' });
      await setTicketApi(ticket.id);
      helpDeskActions.setShouldRefreshTickets(true);
    }
  }

  function rateTicket() {
    navigation.navigate('TicketRatingScreen', { ticket });
  }

  useEffect(() => {
    setTicketApi(paramTicket.id);
  }, []);

  useEffect(() => {
    const navigationListener = navigation.addListener('willBlur', () => {
      helpDeskActions.setShouldRefreshTickets(true);
    });
    return () => navigationListener.remove();
  }, [navigation]);

  const {
    removeAttachment,
    onUploadFile,
    onUploadImage,
    attachments,
    clearAttachments,
    uploadingImage,
    uploading,
  } = useAttachments({
    uploadLimit,
    mixFileAndImage: true,
  });

  return (
    <KeyboardAvoidingView style={styles.root} behavior="height">
      <NavigationHeader
        hasBackButton
        subtitle={ticket?.ecofeedbackTopic?.name[userState.userLanguage]}
        title={ticket?.subject}
        rightHeader={
          ticket ? <TicketResponseStatus status={ticket?.status} /> : undefined
        }
      />
      <Content
        onResolveTicket={resolveTicket}
        rateTicket={rateTicket}
        ticket={ticket}
        user={userState.user!}
      />

      {ticket && (
        <SendCommentInput
          onRateTicket={rateTicket}
          inputRef={inputRef}
          status={ticket?.status}
          loading={loading}
          onUploadFile={onUploadFile}
          onUploadImage={onUploadImage}
          uploadingFile={uploading}
          uploadingImage={uploadingImage}
          onRemoveAttachment={removeAttachment}
          onReopenTicket={reopenTicket}
          attachments={attachments}
          onSendMessage={onSubmit}
        />
      )}
    </KeyboardAvoidingView>
  );
}

async function fetchTicket(id: number): Promise<HelpdeskTicket | null> {
  const res = await api.fetchTicket(id);
  if (res.status === 'success') {
    return res.result.data;
  }
  return null;
}
