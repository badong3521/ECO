import React from 'react';
import { useTranslation } from 'react-i18next';
import { TicketStatus as TTicketStatus } from '../../reducers';
import Badge from '../../../../components/Badge';
import styles from './style.css';
import { applicationColors } from '../../../../../style.css';

interface Props {
  status: TTicketStatus;
}

export default function TicketResponseStatus(props: Props) {
  const { status } = props;
  const { i18n } = useTranslation();

  const statusMap = {
    response: {
      text: i18n.t('features.helpDesk.badges.response'),
      color: applicationColors.ecofeedback.new,
      backgroundColor: applicationColors.ecofeedback.newLighter,
    },
    open: {
      text: i18n.t('features.helpDesk.badges.open'),
      color: applicationColors.ecofeedback.pending,
      backgroundColor: applicationColors.ecofeedback.pendingLighter,
    },
    closed: {
      text: i18n.t('features.helpDesk.badges.closed'),
      color: applicationColors.ecofeedback.resolve,
      backgroundColor: applicationColors.ecofeedback.resolveLighter,
    },
  };
  const map = statusMap[status];

  return (
    <Badge
      type="fill"
      color={map.backgroundColor}
      textColor={map.color}
      text={map.text}
      style={styles.badge}
      bold="bold"
    />
  );
}
