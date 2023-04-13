import BusReducer, { useBusState as busHook } from './bus';
import BusSettingsReducer, {
  useBusSettingsState as busSettingsHook,
} from './busSettings';
import BusCardReducer, { useBusCardState as busCardHook } from './busCard';

const reducers = {
  bus: BusReducer,
  busSettings: BusSettingsReducer,
  busCard: BusCardReducer,
};

export const useBusState = busHook;
export const useBusSettingsState = busSettingsHook;
export const useBusCardState = busCardHook;
export default reducers;
