export interface ImageType {
  uri: string;
  sgid: string;
}

export type FormStep =
  | 'stepOne'
  | 'stepOtp'
  | 'stepTwo'
  | 'stepThree'
  | 'stepFour';

export type ItemMenuType =
  | 'register'
  | 'management'
  | 'injection_update'
  | 'feedback';
