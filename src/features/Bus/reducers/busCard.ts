import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BusCardStats } from '../../../services/api/types/busCardType';

export interface BusCardState {
  busCardStats?: BusCardStats;
  lastReload?: number;
}

const initialState: BusCardState = {};

const busCardSlice = createSlice({
  name: 'busCard',
  initialState,
  reducers: {
    setBusCardStats(state, action: PayloadAction<BusCardStats>) {
      state.busCardStats = action.payload;
    },
    setLastReload(state, action: PayloadAction<number>) {
      state.lastReload = action.payload;
    },
  },
});

export function useBusCardState() {
  const busCardState = useSelector(
    (state: any) => state.busCard,
  ) as BusCardState;
  const dispatch = useDispatch();
  const actions = {
    setBusCardStats: (payload: BusCardStats) =>
      dispatch(busCardSlice.actions.setBusCardStats(payload)),
    setLastReload: (payload: number) =>
      dispatch(busCardSlice.actions.setLastReload(payload)),
  };
  return [busCardState, actions] as [typeof busCardState, typeof actions];
}

export default busCardSlice;
