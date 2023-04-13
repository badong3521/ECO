import { ApiResType, Multilanguage } from './api';

type NotificationRedirect =
  | 'app_none'
  | 'app_announcement'
  | 'app_card'
  | 'app_bill'
  | 'app_ecofeedback_ticket'
  | 'app_ecofeedback'
  | 'app_rating'
  | 'web_econnect'
  | 'vaccine_registration_list'
  | 'app_bus_card';

type NotificationStatus = 'read' | 'unread';

type NotificationOrigin = 'ecofeedback' | 'econnect' | 'active_admin' | 'ems';

export type Notification = {
  redirectTo: NotificationRedirect;
  origin: NotificationOrigin;
  status: NotificationStatus;
  title: Multilanguage;
  body: Multilanguage;
  createdAt: string;
  data: any;
  id: number;
  sender?: {
    id: number;
    logo: string;
    name: Multilanguage;
    color: string;
  };
};

export type FetchNotificationsType = ApiResType<Notification[]>;
export type FetchNotificationType = ApiResType<Notification>;
