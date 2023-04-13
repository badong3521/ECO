import analytics from '@react-native-firebase/analytics';
import { BusDrawerStateType } from '../features/Bus/types';

export type EventIdType =
  // Directory
  | 'view_card_from_home_screen'
  | 'view_card_event'
  | 'view_card_special_event'
  | 'view_card_merchant'
  | 'view_card_news'
  | 'view_card_coupon'
  | 'search_merchant_finished'
  | 'search_merchant_started'
  | 'view_merchants_in_category'
  | 'pay_bills_from_home'
  | 'go_ecoId_dashboard_from_home'
  | 'view_featured_card_in_home_screen'
  | 'view_featured_card_in_merchant_screen'
  | 'view_featured_card_in_promotion_screen'
  | 'filter_all_merchants'
  | 'filter_new_merchants'
  | 'filter_promotion_merchants'
  | 'filter_merchants_by_subcategory'
  | 'redeem_coupon_card_finished'
  | 'favorite_card'
  | 'un_favorite_card'
  | 'social_link_press'
  // Authentication
  | 'authentication_started'
  | 'google_authenticated_started'
  | 'facebook_authenticated_started'
  | 'apple_authenticated_started'
  | 'sign_up_google_phone_number_started'
  | 'sign_up_apple_phone_number_started'
  | 'sign_up_facebook_phone_number_started'
  | 'sign_up_google_finished'
  | 'sign_up_facebook_finished'
  | 'sign_up_apple_finished'
  | 'sign_in_started'
  | 'sign_in_finished'
  | 'sign_up_finished'
  | 'sign_out'
  | 'otp_started'
  | 'otp_finished'
  | 'update_profile_picture_finished'
  | 'update_profile_started'
  | 'update_profile_finished'
  | 'update_password_started'
  | 'update_password_finished'
  | 'request_forgot_password'
  | 'forgot_password_finished'
  // Ecobus
  | 'current_location'
  | 'change_locale'
  | 'bus_change_state'
  | 'bus_settings_change'
  | 'bus_add_ticket_started'
  | 'bus_add_ticket_finished'
  | 'bus_remove_ticket_started'
  | 'bus_remove_ticket_finished'
  | 'bus_add_favorite_location'
  | 'bus_delete_favorite_location'
  | 'bus_searching_address'
  | 'bus_view_search_address_result'
  | 'bus_on_initial_screen'
  | 'bus_home_shortcut_press'
  | 'bus_work_shortcut_press'
  | BusDrawerStateType // use states of Ecobus to track events
  // EcoID
  | 'view_ecoid_onboarding'
  | 'sync_ecoid_successful'
  | 'sync_ecoid_failed'
  | 'pay_bill_successful'
  | 'pay_bill_failed'
  | 'contact_us_from_ecoid_failed'
  | 'filter_payment_history'
  // Settings
  | 'resync_ecoid_from_settings'
  | 'disable_ecopark_notification'
  | 'disable_ecopm_notification'
  | 'disable_bills_notification'
  | 'enable_ecopark_notification'
  | 'enable_ecopm_notification'
  | 'enable_bills_notification'
  // Notifications
  | 'click_on_ecofeedback_ticket_notification'
  | 'click_on_econnect_notification'
  | 'click_on_announcement_notification'
  | 'click_on_card_notification'
  | 'click_on_new_bill_notification'
  | 'click_on_one_day_before_bill_due_date_notification'
  | 'click_on_three_day_before_bill_due_date_notification'
  // Ecofeedback
  | 'choose_a_topic'
  | 'submit_new_topic_successful'
  | 'submit_new_topic_failed'
  | 'submit_new_message_in_ticket'
  | 'resolve_the_ticket'
  | 'rate_the_ticket'
  | 'reopen_the_ticket'
  // Other
  | 'contact_call'
  | 'contact_email';

export interface EventParams {
  type?: string;
  value?: string | number | boolean;
}

export default class Firebase {
  // Set a different screen name for easier tracking of user flows
  static async setScreen(screen: string) {
    analytics().logScreenView({ screen_name: screen });
  }

  // Track a Firebase analytics event
  static async track(id: EventIdType, eventParams?: EventParams) {
    let params: any;
    if (eventParams) {
      // avoid set undefined value for params, because it doesn't accept undefined value
      params = {};
      if (eventParams.value) {
        params.value = eventParams.value;
      }
      if (eventParams.type) {
        params.type = eventParams.type;
      }
    }
    if (params) {
      await analytics().logEvent(id, params);
    } else {
      await analytics().logEvent(id);
    }
  }

  // Track current user when user is logged already
  static async setCurrentUser(userId?: number) {
    if (userId) {
      analytics().setUserId(String(userId));
    } else {
      analytics().setUserId(null);
    }
  }
}
