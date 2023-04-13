import Api from './api';
import {
  FetchNotificationsType,
  Notification,
  FetchNotificationType,
} from './types/notification';

export default class NotificationApi extends Api {
  path: string;

  constructor() {
    super();
    const state = this.store.getState();
    const { user } = state;
    this.path = `/users/${user?.user?.id}/notifications`;
  }

  async fetchNotifications(page?: number): Promise<FetchNotificationsType> {
    const res = await this.request<Notification[]>({
      path: this.path,
      method: 'GET',
      params: {
        page,
      },
    });
    return res;
  }

  async fetchNotification(id: number): Promise<FetchNotificationType> {
    const res = await this.request<Notification>({
      path: `${this.path}/${id}`,
      method: 'GET',
    });
    return res;
  }
}
