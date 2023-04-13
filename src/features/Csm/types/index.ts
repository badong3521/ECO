export enum STATUS_HANDOVER {
  NOT_SCHEDULE = 'NOT_SCHEDULE',
  SCHEDULED = 'SCHEDULED',
  SCHEDULED_CONFIRMED = 'SCHEDULED_CONFIRMED',
  HANDOVER_SUCCESS = 'HANDOVER_SUCCESS',
  HANDOVER_READY = 'HANDOVER_READY',
  WAIT_CALENDAR_AGREE = 'WAIT_CALENDAR_AGREE',
  HANDOVER_FAILED = 'HANDOVER_FAILED',
  NOT_PAYMENT_COMPLETED = 'NOT_PAYMENT_COMPLETED',
}

export interface HandoverAppartmentType {
  id: string;
  locationCode: string;
  zoneName: string;
  areaName: string;
  customerName: string;
  handoverTime: string;
  estimatedHandoverDeadline: Date;
  employeeContact: {
    name?: string;
    phoneNumber?: string;
  };
  handoverStatus: HandoverStatusType;
}

export interface HandoverStatusType {
  code: STATUS_HANDOVER;
  color: string;
  name: string;
}

export interface TimeSlotsType {
  id?: number;
  fromTime: string;
  toTime: string;
}

export interface DetailHandoverAppartmentType extends HandoverAppartmentType {
  sendingNoticeDate: Date;
  dueDate: Date;
  handoverDeadline: Date;
  customer: {
    email: string;
    fullName: string;
    phoneNumber: string;
  };
  employee: {
    code: string;
    fullName: string;
    phone: string;
  };
  handoverTime: string;
  isEnableSurvey: boolean;
}
