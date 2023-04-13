import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BillType } from '../../../services/api/types/dncEcoid';

export interface ElectricBillState {
  bills?: BillType[];
  searchedBills?: BillType[];
  lastLoadBills?: number;
}

const initialState: ElectricBillState = {
  searchedBills: undefined,
};

const electricBillSlice = createSlice({
  name: 'electricBill',
  initialState,
  reducers: {
    setSearchedBills(state, action: PayloadAction<BillType[]>) {
      state.searchedBills = action.payload;
    },
    setBills(state, action: PayloadAction<BillType[] | undefined>) {
      state.bills = action.payload;
    },
    removeSearchedBills(state, action: PayloadAction<string>) {
      if (state.searchedBills?.find(b => b.billId === action.payload))
        state.searchedBills = undefined;
    },
    removeSearchedCode(state, action: PayloadAction<string>) {
      if (state.searchedBills?.find(b => b.customerCode === action.payload))
        state.searchedBills = undefined;
    },
    removeSavedCode(state, action: PayloadAction<string>) {
      state.bills = state.bills?.filter(b => b.customerCode !== action.payload);
    },
    setLastLoadBills(state, action: PayloadAction<number>) {
      state.lastLoadBills = action.payload;
    },
  },
});

export function useElectricBillState() {
  const electricBillState = useSelector(
    (state: any) => state.electricBill,
  ) as ElectricBillState;

  const dispatch = useDispatch();
  const actions = {
    setSearchedBills: (payload: BillType[]) =>
      dispatch(electricBillSlice.actions.setSearchedBills(payload)),
    removeSearchedBills: (payload: string) =>
      dispatch(electricBillSlice.actions.removeSearchedBills(payload)),
    removeSearchedCode: (payload: string) =>
      dispatch(electricBillSlice.actions.removeSearchedCode(payload)),
    removeSavedCode: (payload: string) =>
      dispatch(electricBillSlice.actions.removeSavedCode(payload)),
    setLastLoadBills: (payload: number) =>
      dispatch(electricBillSlice.actions.setLastLoadBills(payload)),
  };
  return [electricBillState, actions] as [
    typeof electricBillState,
    typeof actions,
  ];
}

export default electricBillSlice;
