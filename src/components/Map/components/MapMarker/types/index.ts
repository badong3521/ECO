import { Stop } from '../../../../../services/api/types/bus';

export type MarkerType = 'stop' | 'stopWithRoutes' | 'bus' | 'destination';

export interface MapMarkerPropTypes {
  id: number;
  latitude: number;
  longitude: number;
  markerType: MarkerType;
  rotation?: number;
  color?: string;
  opacity?: number;
  callout?: string;
  stop?: Stop;
}
