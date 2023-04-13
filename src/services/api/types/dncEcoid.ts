import { ApiResType } from './api';

export const PaymentUrlCallback = 'ecoone://dncPayment';

export type PaymentCardType = 'INTERNATIONAL' | 'DOMESTIC'

interface PaymentFee {
  paymentMethodCode: PaymentCardType;
  feePayment: number;
}

interface BillFee {
  international: PaymentFee;
  domestic: PaymentFee;
}

export interface BillType {
  customerCode: string;
  customerName: string;
  customerAddress: string;
  billId?: string;
  debtPay?: number;
  month?: string;
  year?: string;
  fees?: BillFee;
}

export interface TransactionDetailType {
  billId: number;
  billDate: string;
  billAmount: string;
}

export interface TransactionHistoryType {
  transactionId: number;
  customerCode: string;
  customerName: string;
  customerAddress: string;
  transactionDate: string;
  transactionDetail?: TransactionDetailType[];
}

export interface EcoidBills {
  [key: string]: BillType[];
}

export interface EcoidBillsData {
  customers: EcoidBills[];
}

export interface PreBillPaymentDetailsType {
  billInfo: BillType,
}

export interface BillPaymentUrlType {
  url: string;
}

export interface PaymentHistoryType {
  transactionHistories?: TransactionHistoryType[];
}

export type GetBillsByEcoidRes = ApiResType<EcoidBillsData>;
export type GetPrePaymentDetailsRes = ApiResType<PreBillPaymentDetailsType>;
export type GetBillPaymentUrlRes = ApiResType<BillPaymentUrlType>;
export type GetPaymentHistoryRes = ApiResType<PaymentHistoryType>;
