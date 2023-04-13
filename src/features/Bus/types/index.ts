import { applicationColors } from '../../../../style.css';

// The below states are also used for Firebase tracking, so name of each state should be more meaning
export type BusDrawerStateType =
  | 'standard_search'
  | 'view_route_details'
  | 'view_stop_actions'
  | 'view_trip_details'
  | 'view_stop_schedule'
  | 'select_a_location'
  | 'view_stops_with_routes_actions'
  | 'search_from_departure_to_destination'
  | 'set_home_location'
  | 'set_work_location';

export type SearchbarType = 'departure' | 'destination';

export const StopStyleType = new Map<String, any>([
  [
    'enter',
    {
      icon: 'arrow-upward',
      color: applicationColors.primary.shade900,
      name: 'features.busScheduleScreen.pickupPoint',
    },
  ],
  [
    'exit',
    {
      icon: 'arrow-downward',
      color: applicationColors.bus.exit,
      name: 'features.busScheduleScreen.dropOffPoint',
    },
  ],
  [
    'enter_exit',
    {
      icon: 'swap-vert',
      color: applicationColors.bus.enter_exit,
      name: 'features.busScheduleScreen.pickupAndDropOffPoint',
    },
  ],
]);
