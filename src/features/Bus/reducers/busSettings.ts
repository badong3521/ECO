import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Firebase from '../../../services/firebase';

export type BusSettingsOptionsType = 'showBusLocation' | 'busCards';

export interface BusSettingsOption {
  title: string;
  enable?: boolean;
  navigateTo?: string;
}

export interface BusSettingsState {
  showBusLocation: BusSettingsOption;
  busCards: BusSettingsOption;
}

const initialState: BusSettingsState = {
  showBusLocation: {
    title: 'features.busScreen.busSettings.showBusLocation',
    enable: true,
  },
  busCards: {
    title: 'features.busScreen.busCardScreen.busCard',
    navigateTo: 'BusCardScreen',
  },
};

const busSettingsSlice = createSlice({
  name: 'busSettings',
  initialState,
  reducers: {
    toggleSetting(state, action: PayloadAction<BusSettingsOptionsType>) {
      Firebase.track('bus_settings_change', {
        type: action.type,
        value: String(state[action.payload].enable),
      });
      state[action.payload].enable = !state[action.payload].enable;
    },
  },
});

export function useBusSettingsState() {
  const busSettingsState = useSelector(
    (state: any) => state.busSettings,
  ) as BusSettingsState;
  const dispatch = useDispatch();
  const actions = {
    toggleSetting: (payload: BusSettingsOptionsType) =>
      dispatch(busSettingsSlice.actions.toggleSetting(payload)),
  };
  return [busSettingsState, actions] as [
    typeof busSettingsState,
    typeof actions,
  ];
}

export default busSettingsSlice;
