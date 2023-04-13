import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RESULTS } from 'react-native-permissions';
import { PermissionStatus } from '../../../utils/permission';

export interface MapState {
  latitude: number;
  longitude: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
  acceptedGeolocation: boolean;
  locationPermission: PermissionStatus;
}

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

const initialState: MapState = {
  latitude: 20.959438, // Default Ecopark latitude
  longitude: 105.932593, // Default Ecopark longitude
  altitude: undefined,
  altitudeAccuracy: undefined,
  heading: undefined,
  speed: undefined,
  acceptedGeolocation: false,
  locationPermission: RESULTS.DENIED,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setGeolocationData(state, action: PayloadAction<MapCoordinates>) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setAcceptedGeolocation(state, action: PayloadAction<boolean>) {
      state.acceptedGeolocation = action.payload;
    },
    setLocationPermission(state, action: PayloadAction<PermissionStatus>) {
      state.locationPermission = action.payload;
    },
  },
});

export function useMapState() {
  const mapState = useSelector((state: any) => state.map) as MapState;
  const dispatch = useDispatch();
  const actions = {
    setGeolocationData: (payload: MapCoordinates) =>
      dispatch(mapSlice.actions.setGeolocationData(payload)),
    setAcceptedGeolocation: (payload: boolean) =>
      dispatch(mapSlice.actions.setAcceptedGeolocation(payload)),
    setLocationPermission: (payload: PermissionStatus) =>
      dispatch(mapSlice.actions.setLocationPermission(payload)),
  };
  return [mapState, actions] as [typeof mapState, typeof actions];
}

export default mapSlice;
