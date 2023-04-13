import moment, { MomentInput } from 'moment';

// convert Date to DD/MM/YYYY format
export const getDateDDMMYYYY = (date?: Date): string | undefined => {
  return date ? moment(date).format('DD/MM/yyyy') : undefined;
};

// convert Date to DD-MM
export const getDateDDMM = (date?: Date): string | undefined => {
  return date ? moment(date).format('DD-MM') : undefined;
};

// convert Date to DD-MM-yyyy
export const getDateDDMMyyyyWithDash = (date?: Date): string | undefined => {
  return date ? moment(date).format('DD-MM-yyyy') : undefined;
};

// convert Date to MM/yyyy
export const getDateMMYYYY = (date?: Date | string): string | undefined => {
  return date ? moment(date).format('MM/yyyy') : undefined;
};

export const getDateTimeHHmmDDMMYYYY = (date?: Date | string): string => {
  return date ? moment(date).format('HH:mm DD/MM/yyyy') : '';
};

// get expired time from end time what has the format `HH:mm - dd/MM/yyyy`
export function getExpiredTime(endTime: string): string | null {
  try {
    const expiry = new Date(endTime);
    return moment(expiry).format('DD/MM/yyyy');
  } catch (err) {
    return null;
  }
}

enum MOMENT_FORMATS {
  DATE_TIME = 'HH:mm - DD/MM/YYYY',
  DATE = 'DD/MM',
  FULL_DATE = 'DD/MM/YYYY',
  YEAR = 'YYYY',
  MONTH = 'MMM',
  MONTH_FULL = 'MMMM',
  YEAR_MONTH = 'YYYY-MM',
  DAY_MONTH = 'DD MMM',
  HOUR_MINUTE_SECONDS = 'HH:mm:ss',
  TIME = 'HH:mm',
}

function getDateString(
  date: MomentInput,
  format: MOMENT_FORMATS,
  currentFormat?: MOMENT_FORMATS,
) {
  if (!date) {
    return '';
  }
  return moment(date, currentFormat).format(format);
}

const DAYS_OF_WEEK = ['all', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export default {
  getDateString,
  MOMENT_FORMATS,
  DAYS_OF_WEEK,
};
