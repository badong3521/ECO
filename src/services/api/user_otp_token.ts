import Api from './api';
import { ApiResType } from './types/api';

export default class UseOtpTokenApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = '/user_otp_tokens';
  }

  async send(phoneNumber: string): Promise<ApiResType<any>> {
    const res = await this.request<any>({
      path: `${this.path}`,
      method: 'POST',
      body: {
        phoneNumber,
      },
    });
    return res;
  }

  async verify(phoneNumber: string, otpCode: string): Promise<ApiResType<any>> {
    const res = await this.request<any>({
      path: `${this.path}/verify`,
      method: 'POST',
      body: {
        phoneNumber,
        otpCode,
      },
    });
    return res;
  }
}
