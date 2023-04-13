import moment from 'moment';
// Convert all given bus stop objects into a markers
import { LanguageType } from '../../User/reducers';
import {
  AddressInfoType,
  BusLocationType,
  BusRouteType,
  LocationType,
  Stop,
} from '../../../services/api/types/bus';
import { MapMarkerPropTypes } from '../../../components/Map/components/MapMarker/types';
import { ScheduleType } from '../../../services/api/types/direction';
import { BusCardV2Type } from '../../../services/api/types/busCardType';
import { applicationColors } from '../../../../style.css';

export function generateMarkersFromSelectedRoute(
  userLanguage: LanguageType,
  selectedBusRoute?: BusRouteType,
  selectedBusStop?: Stop,
): MapMarkerPropTypes[] {
  return selectedBusRoute && selectedBusRoute.stops
    ? selectedBusRoute.stops.map(
        (stop: Stop): MapMarkerPropTypes =>
          generateMarkerFromStop(
            stop,
            userLanguage,
            selectedBusStop,
            applicationColors.semantic.info.shade500,
            stop.id === selectedBusStop?.id ? 1 : 0.7,
          ),
      )
    : [];
}

// Get marker for the the searched address and stops
export function generateMarkersFromSchedules(
  schedules: ScheduleType[] | undefined,
  userLanguage: LanguageType,
  destinationInfo?: LocationType,
): MapMarkerPropTypes[] {
  const generatedMarkers: MapMarkerPropTypes[] = [];

  // parse marker from destination location
  if (destinationInfo) {
    generatedMarkers.push(generateMarkerFromLocationType(destinationInfo));
  }

  if (schedules) {
    schedules.forEach(schedule => {
      generatedMarkers.push(
        generateMarkerFromStop(
          schedule.path.stopDeparture,
          userLanguage,
          undefined,
          applicationColors.semantic.info.shade500,
        ),
      );
      generatedMarkers.push(
        generateMarkerFromStop(
          schedule.path.stopDestination,
          userLanguage,
          undefined,
          applicationColors.semantic.error.shade500,
        ),
      );
    });
  }
  return generatedMarkers;
}

// Get marker for the the searched address and stops around
export function generateMarkersFromAddressInfo(
  addressInfo: AddressInfoType | undefined,
  userLanguage: LanguageType,
): MapMarkerPropTypes[] {
  const generatedMarkers: MapMarkerPropTypes[] = [];
  if (addressInfo) {
    if (addressInfo.location) {
      // this marker is for searched location
      generatedMarkers.push(
        generateMarkerFromLocationType(addressInfo.location),
      );
    }
    if (addressInfo.stops) {
      addressInfo.stops.forEach((stop: Stop) => {
        generatedMarkers.push(
          generateMarkerFromStop(
            stop,
            userLanguage,
            undefined,
            applicationColors.neutral.shade500,
          ),
        );
      });
    }
  }
  return generatedMarkers;
}

// Get marker for the the searched address
export function generateMarkerFromLocationType(
  location: LocationType,
): MapMarkerPropTypes {
  return {
    id: 0,
    latitude: location.coordinates![0],
    longitude: location.coordinates![1],
    markerType: 'destination',
    callout: location.address,
  };
}

// Convert a bus stop object into a marker
export function generateMarkerFromStop(
  stop: Stop,
  userLanguage: LanguageType,
  selectedBusStop?: Stop,
  color?: string,
  opacity?: number,
): MapMarkerPropTypes {
  return {
    id: stop.id,
    latitude: stop.latitude,
    longitude: stop.longitude,
    markerType: 'stop',
    opacity: opacity || 1,
    color,
    callout: stop.name[userLanguage],
    stop,
  };
}

// Convert given bus locations to JSX elements
export function generateMarkerFromBusLocations(
  busLocations: BusLocationType[] | undefined,
  busRoute?: BusRouteType,
): MapMarkerPropTypes[] {
  return busLocations
    ? busLocations.map(
        (location): MapMarkerPropTypes => {
          return {
            id: location.bus.id,
            latitude: location.latitude,
            longitude: location.longitude,
            rotation: location.direction,
            markerType: 'bus',
            callout: `${location.bus.licensePlate} (${
              busRoute ? busRoute.routeCode : location.bus.routes.join(', ')
            })`,
          };
        },
      )
    : [];
}

export function checkLockedCard(busCard: BusCardV2Type) {
  return busCard.locked === 1;
}

export function checkFreeCard(busCard: BusCardV2Type) {
  return busCard.isFree === 1;
}

export function checkFreeCardRenewable(busCard: BusCardV2Type) {
  return (
    checkFreeCard(busCard) && busCard.isRenew === 1 && !checkLockedCard(busCard)
  );
}

export function checkOutOfRemainingTrip(busCard: BusCardV2Type) {
  return busCard.cardType === 'COMBO' && busCard.numberOfAccess <= 0;
}

export function checkInvalidStartDate(busCard: BusCardV2Type) {
  return moment(busCard.fromDate).isAfter(new Date());
}

export function checkExpiredByDate(busCard: BusCardV2Type) {
  return moment(busCard.toDate).isBefore(new Date());
}
