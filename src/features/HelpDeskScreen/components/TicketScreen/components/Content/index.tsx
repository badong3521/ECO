import React, { useEffect } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { HelpdeskTicket } from '../../../../../../services/api/types/helpDesk';
import Loader from '../../../../../../components/Loader';
import { UserType } from '../../../../../User/types';
import CommentList from '../CommentList';
import styles from './style.css';
import useKeyboard from '../../../../../../utils/hooks/useKeyboard';
import ResolveTicketContainer from '../ResolveTicketContainer';

interface Props {
  user: UserType;
  ticket?: HelpdeskTicket;
  rateTicket: () => void;
  onResolveTicket: () => void;
}

export default function Content(props: Props) {
  const { ticket, user, onResolveTicket } = props;
  const keyboardVisible = useKeyboard();
  const scrollViewRef = React.createRef<ScrollView>();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      scrollViewRef.current?.scrollToEnd();
    } else {
      // Android has delayed after keyboard dismissed
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd();
      }, 300);
    }
  }, [keyboardVisible]);

  return (
    <View style={styles.container}>
      {ticket ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollView}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        >
          <View>
            <CommentList
              comments={ticket.comments}
              department={ticket.ecofeedbackDepartment}
              user={user}
            />
            {ticket.status !== 'closed' && (
              <ResolveTicketContainer onResolveTicket={onResolveTicket} />
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loader}>
          <Loader />
        </View>
      )}
    </View>
  );
}
