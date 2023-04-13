import { LayoutAnimation, Platform } from 'react-native';
import Api from './api';
import { FetchRemindersType, ReminderType } from './types/reminder';

export default class ReminderApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'reminders';
  }

  async fetchReminders(): Promise<FetchRemindersType> {
    const res = await this.request<ReminderType[]>({
      path: this.path,
      method: 'GET',
    });
    if (Platform.OS === 'ios' && res.status === 'success') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    this.store.dispatch({
      type: 'homePage/setReminders',
      payload: res.status === 'success' ? res.result.data : undefined,
    });
    return res;
  }
}
