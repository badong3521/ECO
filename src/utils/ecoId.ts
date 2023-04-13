import moment from 'moment';
import { BillType, ResidenceType } from '../services/api/types/ecoid';
import DialogManager from '../components/Dialog/manager';
import EcoIdApi from '../services/api/ecoId';
import NavigationService from '../services/navigationService';

export interface ResidenceScreenPropTypes {
  residence: ResidenceType;
  totalBill: number;
  nextBill?: Date;
}

export interface BillsOfMonthType {
  [key: string]: BillType[];
}

const ecoIdApi = new EcoIdApi();

async function fetchResidenceInfo(residenceId: number): Promise<ResidenceType> {
  const res = await ecoIdApi.fetchResidenceInfo(residenceId);
  if (res.status === 'success') {
    return res.result.data;
  }
  return Promise.reject();
}

export async function fetchTotalAmount(residenceId: number) {
  const res = await ecoIdApi.fetchHouseholdBills(residenceId);
  if (res.status === 'success') {
    const bills = res.result.data;
    return getBillSummary(bills);
  }
  // since at the time of writing, the Api class does not return a response code,
  // we have to use this condition to check for 404
  // in case we want to handle it other than a plain error
  if (res.statusCode && res.statusCode === 404) {
    return getBillSummary([]);
  }
  return Promise.reject();
}

// use this to get the sum of a household's bills and the earliest due date
function getBillSummary(
  bills: BillType[] | undefined,
): [number, Date | undefined] {
  if (bills && bills.length > 0) {
    const [total, next] = bills.reduce(
      (acc, bill) => [
        acc[0] + bill.debtAmount,
        Math.min(
          acc[1],
          moment(bill.expiryDate, 'DD-MM-yyyy')
            .toDate()
            .getTime(),
        ),
      ],
      [0, Number.MAX_SAFE_INTEGER],
    );
    return [total, new Date(next)];
  }
  return [0, undefined];
}

export function onEcoIdError(navigation: any) {
  DialogManager.dismissLoadingDialog();
  navigation.navigate('EcoIdFailedScreen', {
    title: 'features.ecoId.ecoIdFailedScreen.title',
    message: 'features.ecoId.ecoIdFailedScreen.message',
    button: 'features.ecoId.ecoIdFailedScreen.contactUs',
  });
}

// use this function before going in to ResidenceScreen
// in order to avoid loading on the screen itself but rather on the screen that you're navigating from
// eslint-disable-next-line import/prefer-default-export
export async function fetchResidenceScreenProps(
  residenceId: number,
  navigation: any,
): Promise<ResidenceScreenPropTypes | void> {
  DialogManager.showLoadingDialog({
    dismissible: true,
  });
  const fetchResidenceInfoRes = fetchResidenceInfo(residenceId);
  const fetchTotalAmountRes = fetchTotalAmount(residenceId);
  return Promise.all([fetchResidenceInfoRes, fetchTotalAmountRes])
    .then(values => {
      DialogManager.dismissLoadingDialog();
      return {
        residence: values[0],
        totalBill: values[1][0],
        nextBill: values[1][1],
      };
    })
    .catch(() => onEcoIdError(navigation));
}

// convert list of bills into list bills of a month
export function groupBillsByMonth(
  bills: BillType[],
  currentBillOfMonth?: BillsOfMonthType,
): BillsOfMonthType {
  if (!bills) return {};
  const billOfMonth: BillsOfMonthType = currentBillOfMonth || {};
  bills.forEach(data => {
    if (!billOfMonth[data.billOfMonth]) {
      billOfMonth[data.billOfMonth] = [];
    }
    billOfMonth[data.billOfMonth] = billOfMonth[data.billOfMonth].concat(data);
  });
  return billOfMonth;
}

// fetch current residences and
// go to EcoIdPreparePaymentScreen if only has 1 residence, otherwise go to ResidenceSelectionScreen
export async function goToPaymentScreen(residentIds: number[]) {
  DialogManager.showLoadingDialog({ dismissible: true });
  if (residentIds?.length === 1) {
    const infoRes = await ecoIdApi.fetchResidenceInfo(residentIds[0]);
    if (infoRes.status === 'success') {
      const residence = infoRes.result.data;
      DialogManager.dismissLoadingDialog();
      NavigationService.navigate('EcoIdPreparePaymentScreen', { residence });
    } else {
      onEcoIdError(NavigationService);
    }
  } else {
    const res = await ecoIdApi.fetchResidences();
    DialogManager.dismissLoadingDialog();
    if (res.status === 'success') {
      NavigationService.navigate('ResidenceSelectionScreen', {
        residences: res.result.data,
      });
    } else {
      onEcoIdError(NavigationService);
    }
  }
}
