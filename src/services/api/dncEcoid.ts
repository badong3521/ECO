import Config from 'react-native-config';
import Api from './api';
import {
  EcoidBillsData,
  GetBillsByEcoidRes,
  BillType,
  GetBillPaymentUrlRes,
  BillPaymentUrlType,
  PaymentUrlCallback,
  GetPaymentHistoryRes,
  PaymentHistoryType,
  PaymentCardType,
  PreBillPaymentDetailsType,
  GetPrePaymentDetailsRes,
} from './types/dncEcoid';

export default class DncEcoidApi extends Api {
  constructor() {
    super(Config.ECOID_URL);
  }

  async getBillsByCustomerCode(
    ecoid: number,
    customerCode: string,
  ): Promise<GetBillsByEcoidRes> {
    const res = await this.request<EcoidBillsData>({
      path: '/dnc/get_bill_by_customer_code',
      params: { ecoid, customerCode },
      method: 'GET',
    });

    if (res.status === 'success') {
      this.store.dispatch({
        type: 'electricBill/setSearchedBills',
        payload: this.billsFromResponse(res.result.data),
      });
    } else {
      this.store.dispatch({
        type: 'electricBill/removeSearchedCode',
        payload: customerCode,
      });
    }

    return res;
  }

  async getBillByEcoid(ecoid: number): Promise<GetBillsByEcoidRes> {
    const res = await this.request<EcoidBillsData>({
      path: '/dnc/customer',
      params: { ecoid },
      method: 'GET',
    });

    this.store.dispatch({
      type: 'electricBill/setBills',
      payload:
        res.status === 'success'
          ? this.billsFromResponse(res.result.data)
          : undefined,
    });

    return res;
  }

  async getPrePaymentDetails(
    ecoid: number,
    bill: BillType,
  ) : Promise<GetPrePaymentDetailsRes> {
    const res = await this.request<PreBillPaymentDetailsType>({
      path: '/dnc/pre_payment',
      method: 'POST',
      body: {
        ecoid,
        customerCode: bill.customerCode,
        billId: bill.billId!,
      },
    });

    return res;
  }

  async getBillPaymentUrl(
    ecoid: number,
    bill: BillType,
    paymentMethodCode: PaymentCardType,
  ): Promise<GetBillPaymentUrlRes> {
    const res = await this.request<BillPaymentUrlType>({
      path: '/dnc/payment',
      method: 'POST',
      body: {
        ecoid,
        customerCode: bill.customerCode,
        billId: bill.billId!,
        paymentMethodCode: paymentMethodCode,
        returnUrl: PaymentUrlCallback,
      },
    });

    return res;
  }

  async deleteCustomerCode(ecoid: number, customerCode: string): Promise<any> {
    const res = await this.request<any>({
      path: '/dnc/delete_customer',
      method: 'DELETE',
      params: {
        ecoid,
        customerCode,
      },
    });

    return res;
  }

  async getPaymentHistory(ecoid: number): Promise<GetPaymentHistoryRes> {
    const res = await this.request<PaymentHistoryType>({
      path: '/dnc/payment_history',
      method: 'GET',
      params: {
        ecoid,
        page: 1,
        itemPerPage: 50,
      },
    });

    return res;
  }

  billsFromResponse = (response: EcoidBillsData): BillType[] => {
    return response.customers.reduce((bills: BillType[], item) => {
      const key = Object.keys(item)[0];
      if (key && item[key]) return bills.concat(item[key]);
      return bills;
    }, []);
  };
}
