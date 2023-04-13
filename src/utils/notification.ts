// navigate to a specific screen, base on the data that is sent in a notification
import { Linking } from 'react-native';
import Config from 'react-native-config';
import CamelCaseConverter from '../services/camelCaseConverter';
import NavigationService from '../services/navigationService';
import DialogManager from '../components/Dialog/manager';
import { fetchResidenceScreenProps, onEcoIdError } from './ecoId';
import EcoIdApi from '../services/api/ecoId';
import Firebase from '../services/firebase';
import NotificationApi from '../services/api/notification';
import { Notification } from '../services/api/types/notification';
import UserApi from '../services/api/user';

const ecoIdApi = new EcoIdApi();
const userApi = new UserApi();

export async function handleNotification(data: any) {
  const notificationApi = new NotificationApi();
  const camelCasedData = CamelCaseConverter.convertKeys('camel', data);
  const res = await notificationApi.fetchNotification(camelCasedData.id);
  let notification: Notification | undefined;
  if (res.status === 'success') {
    notification = res.result.data;
  }
  switch (camelCasedData.redirectTo) {
    case 'app_ecofeedback_ticket':
      Firebase.track('click_on_ecofeedback_ticket_notification');
      NavigationService.navigate('HelpDeskTicketScreen', {
        ticket: {
          id: camelCasedData.ecofeedbackTicketId,
        },
      });
      break;
    case 'web_econnect':
      Firebase.track('click_on_econnect_notification');
      Linking.openURL(Config.ECONNECT_URL);
      break;
    case 'app_announcement':
      Firebase.track('click_on_announcement_notification');
      NavigationService.navigate('AnnouncementScreen', {
        notification,
      });
      break;
    case 'app_card':
      Firebase.track('click_on_card_notification');
      NavigationService.navigate('CardScreen', {
        card: {
          id: camelCasedData.cardId,
          type: camelCasedData.cardType,
        },
      });
      break;
    case 'app_bill':
      Firebase.track('click_on_new_bill_notification');
      handleBillNotification(camelCasedData);
      break;
    case 'app_rating':
      handleAppRatingNotification();
      break;
    case 'app_ecofeedback':
      NavigationService.navigate('HelpDeskScreen');
      break;
    case 'vaccine_registration_list':
      NavigationService.navigate('VaccineRegistrationList');
      break;
    case 'app_bus_card':
      NavigationService.navigate('BusCardScreen');
      break;
    default:
      NavigationService.navigate('NotificationScreen');
      break;
  }
}

async function handleAppRatingNotification() {
  DialogManager.showLoadingDialog({ dismissible: true });
  const res = await userApi.fetchMyInfo();
  DialogManager.dismissLoadingDialog();
  if (res.status === 'success') {
    if (res.result.data.lastVersionRating) {
      NavigationService.navigate('UserProfile', {
        appRated: true,
      });
    } else {
      NavigationService.navigate('RateAppScreen');
    }
  }
}

// this is used mostly for matching an ID received in a notification with one of the user's resident ids
// and fetch the necessary info to be able to go straight to pay bill screen
async function handleBillNotification(data: any) {
  DialogManager.showLoadingDialog({ dismissible: true });
  const res = await ecoIdApi.fetchResidences();
  const residentIds = data.residentIds.trim().split(',');
  if (res.status === 'success') {
    const residences = res.result.data;
    let residentId = -1;
    for (let i = 0; i < residences.length; i += 1) {
      for (let j = 0; j < residentIds.length; j += 1) {
        if (residences[i].residentId === parseInt(residentIds[j], 10)) {
          residentId = parseInt(residentIds[j], 10);
        }
      }
    }
    if (residentId < 0) {
      onEcoIdError(NavigationService);
      return;
    }
    const residenceScreenProps = await fetchResidenceScreenProps(
      residentId,
      NavigationService,
    );
    DialogManager.dismissLoadingDialog();
    if (residenceScreenProps && residenceScreenProps.residence) {
      if (residenceScreenProps.totalBill > 0) {
        NavigationService.navigate('EcoIdPreparePaymentScreen', {
          residence: residenceScreenProps.residence,
        });
      } else {
        NavigationService.navigate('ResidenceScreen', residenceScreenProps);
      }
    } else {
      onEcoIdError(NavigationService);
    }
  } else {
    onEcoIdError(NavigationService);
  }
}

export default {
  handleNotification,
};
