import { Method } from 'axios';
import { EventIdType, EventParams } from '../../firebase';

export const START_PAGE = 1;

export type Multilanguage = {
  vn: string;
  en: string;
};

export type ApiSuccessType<D> = {
  status: 'success';
  result: ApiResultType<D>;
};

type ApiSuccessListType<D> = {
  status: 'success';
  result: ApiResultListType<D>;
};

export type ApiFailureType = {
  status: 'failed';
  errors: ErrorType[] | ErrorType;
  statusCode: number;
};

type StandardApiResult = {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalEntries: number;
};

type ApiResultType<D> = StandardApiResult & {
  data: D;
};

type ApiResultListType<D> = StandardApiResult & {
  data: D;
};

export type ErrorType = {
  code: string;
  message: string;
};

export type ApiReqType = {
  path: string;
  method: Method;
  params?: any;
  body?: any;
  headers?: any;
  eventId?: EventIdType;
  eventParams?: EventParams;
};

export type ApiShowResType<D> = ApiSuccessType<D> | ApiFailureType;
// TODO: Currently can't find a good way to have TS be able to work with both
// singular and list resources at the same time.
export type ApiListResType<D> = ApiSuccessListType<D> | ApiFailureType;
export type ApiResType<D> = ApiShowResType<D>; // | ApiListResType<D>;
