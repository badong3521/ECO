import Api from './api';
import { Contact, ContactsReturnType } from './types/contact';

export const EcoPM = '02462664545';

export default class BusApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'contacts';
  }

  async getContacts(): Promise<ContactsReturnType> {
    const response = await this.request<Contact[]>({
      path: this.path,
      method: 'GET',
    });
    return response;
  }
}
