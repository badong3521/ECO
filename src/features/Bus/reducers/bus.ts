import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BusRouteType,
  BusCardPriceType,
  LocationType,
  Stop,
} from '../../../services/api/types/bus';
import { BusDrawerStateType, SearchbarType } from '../types';
import { BusRouteScheduleType } from '../../../services/api/types/route';
import { MapMarkerPropTypes } from '../../../components/Map/components/MapMarker/types';
import { PolylineType } from '../../../components/Map/components/Polyline';

export interface BusState {
  busRoutes?: BusRouteType[];
  selectedBusRoute?: BusRouteType;
  selectedBusStop?: Stop;
  destinationLocation?: LocationType;
  departureLocation?: LocationType;
  searchBarType: SearchbarType;
  busCardPrices?: BusCardPriceType[];
  busDrawerState: BusDrawerStateType;
  isOpenDrawer: boolean;
  busRouteSchedules?: BusRouteScheduleType;
  busRouteSelectedArriveTime?: string;
  busDrawerStatesStack: BusDrawerStateType[];
  isSelectingLocation?: boolean;
  markers?: MapMarkerPropTypes[];
  polylines?: PolylineType[][];
  editingShortcut?: string;
  defaultShortcuts: string[];
}

const initialState: BusState = {
  busRoutes: undefined,
  selectedBusRoute: undefined,
  selectedBusStop: undefined,
  destinationLocation: undefined,
  departureLocation: undefined,
  searchBarType: 'departure',
  busCardPrices: undefined,
  busDrawerState: 'standard_search',
  isOpenDrawer: false,
  busDrawerStatesStack: ['standard_search'],
  isSelectingLocation: false,
  editingShortcut: undefined,
  defaultShortcuts: ['home', 'work'],
};

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    setBusRoutes(state, action: PayloadAction<BusRouteType[]>) {
      state.busRoutes = action.payload;
    },
    setSelectedBusRoute(
      state,
      action: PayloadAction<BusRouteType | undefined>,
    ) {
      state.selectedBusRoute = action.payload;
    },
    setBusCardPrices(state, action: PayloadAction<BusCardPriceType[]>) {
      state.busCardPrices = action.payload;
    },
    setBusDrawerState(state, action: PayloadAction<BusDrawerStateType>) {
      state.busDrawerState = action.payload;
    },
    setSelectedBusStop(state, action: PayloadAction<Stop>) {
      state.selectedBusStop = action.payload;
    },
    setDestinationLocation(
      state,
      action: PayloadAction<LocationType | undefined>,
    ) {
      state.destinationLocation = action.payload;
    },
    setDepartureLocation(
      state,
      action: PayloadAction<LocationType | undefined>,
    ) {
      state.departureLocation = action.payload;
    },
    setSearchBarType(state, action: PayloadAction<SearchbarType>) {
      state.searchBarType = action.payload;
    },
    pushBusDrawerState(state, action: PayloadAction<BusDrawerStateType>) {
      state.busDrawerStatesStack.unshift(action.payload);
      // eslint-disable-next-line prefer-destructuring
      state.busDrawerState = state.busDrawerStatesStack[0];
    },
    replaceBusDrawerState(state, action: PayloadAction<BusDrawerStateType>) {
      state.busDrawerStatesStack.shift();
      state.busDrawerStatesStack.unshift(action.payload);
      // eslint-disable-next-line prefer-destructuring
      state.busDrawerState = state.busDrawerStatesStack[0];
    },
    replaceAllUtilBusDrawerState(
      state,
      action: PayloadAction<BusDrawerStateType>,
    ) {
      state.busDrawerStatesStack = [];
      state.busDrawerStatesStack.unshift(action.payload);
      // eslint-disable-next-line prefer-destructuring
      state.busDrawerState = state.busDrawerStatesStack[0];
    },
    popBusDrawerState(state) {
      state.busDrawerStatesStack.shift();
      // eslint-disable-next-line prefer-destructuring
      state.busDrawerState = state.busDrawerStatesStack[0];
    },
    setIsOpenDrawer(state, action: PayloadAction<boolean>) {
      state.isOpenDrawer = action.payload;
    },
    setIsSelectingLocation(state, action: PayloadAction<boolean>) {
      state.isSelectingLocation = action.payload;
    },
    setBusRouteSchedules(
      state,
      action: PayloadAction<BusRouteScheduleType | undefined>,
    ) {
      state.busRouteSchedules = action.payload;
    },
    setBusRouteSelectedArriveTime(state, action: PayloadAction<string>) {
      state.busRouteSelectedArriveTime = action.payload;
    },
    setEditingShortcut(state, action: PayloadAction<string | undefined>) {
      state.editingShortcut = action.payload;
    },
    // clear the data to go standard search
    clearToStandardState(state) {
      state.selectedBusStop = undefined;
      state.selectedBusRoute = undefined;
      state.destinationLocation = undefined;
      state.departureLocation = undefined;
      state.busRouteSchedules = undefined;
      state.busRouteSelectedArriveTime = undefined;
      state.markers = undefined;
      state.polylines = undefined;
    },
    setMarkers(state, action: PayloadAction<MapMarkerPropTypes[] | undefined>) {
      state.markers = action.payload;
    },
    setPolylines(state, action: PayloadAction<PolylineType[][] | undefined>) {
      state.polylines = action.payload;
    },
  },
});

export function useBusState() {
  const busState = useSelector((state: any) => state.bus) as BusState;
  const dispatch = useDispatch();
  const actions = {
    setBusRoutes: (payload: BusRouteType[]) =>
      dispatch(busSlice.actions.setBusRoutes(payload)),
    setSelectedBusRoute: (payload: BusRouteType | undefined) =>
      dispatch(busSlice.actions.setSelectedBusRoute(payload)),
    setBusCardPrices: (payload: BusCardPriceType[]) =>
      dispatch(busSlice.actions.setBusCardPrices(payload)),
    setBusDrawerState: (payload: BusDrawerStateType) =>
      dispatch(busSlice.actions.setBusDrawerState(payload)),
    setSelectedBusStop: (payload: Stop) =>
      dispatch(busSlice.actions.setSelectedBusStop(payload)),
    setDestinationLocation: (payload: LocationType | undefined) =>
      dispatch(busSlice.actions.setDestinationLocation(payload)),
    setDepartureLocation: (payload: LocationType | undefined) =>
      dispatch(busSlice.actions.setDepartureLocation(payload)),
    setSearchBarType: (payload: SearchbarType) =>
      dispatch(busSlice.actions.setSearchBarType(payload)),
    pushBusDrawerState: (payload: BusDrawerStateType) =>
      dispatch(busSlice.actions.pushBusDrawerState(payload)),
    replaceBusDrawerState: (payload: BusDrawerStateType) =>
      dispatch(busSlice.actions.replaceBusDrawerState(payload)),
    replaceAllUtilBusDrawerState: (payload: BusDrawerStateType) =>
      dispatch(busSlice.actions.replaceAllUtilBusDrawerState(payload)),
    popBusDrawerState: () => dispatch(busSlice.actions.popBusDrawerState()),
    setIsOpenDrawer: (payload: boolean) =>
      dispatch(busSlice.actions.setIsOpenDrawer(payload)),
    setIsSelectingLocation: (payload: boolean) =>
      dispatch(busSlice.actions.setIsSelectingLocation(payload)),
    setBusRouteSchedules: (payload: BusRouteScheduleType | undefined) =>
      dispatch(busSlice.actions.setBusRouteSchedules(payload)),
    setBusRouteSelectedArriveTime: (payload: string) =>
      dispatch(busSlice.actions.setBusRouteSelectedArriveTime(payload)),
    setEditingShortcut: (payload: string | undefined) =>
      dispatch(busSlice.actions.setEditingShortcut(payload)),
    clearToStandardState: () =>
      dispatch(busSlice.actions.clearToStandardState()),
    setMarkers: (payload?: MapMarkerPropTypes[]) =>
      dispatch(busSlice.actions.setMarkers(payload)),
    setPolylines: (payload?: PolylineType[][]) =>
      dispatch(busSlice.actions.setPolylines(payload)),
  };
  return [busState, actions] as [typeof busState, typeof actions];
}

export default busSlice;
