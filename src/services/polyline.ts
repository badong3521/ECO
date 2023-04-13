import GooglePolyline from 'google-polyline';
import { PolylineType } from '../components/Map/components/Polyline';

export default class Polyline {
  // Decode a polyline array and return decoded array
  static decode(polylineArray: string[]): PolylineType[][] {
    return polylineArray.map(line => {
      const parsedLine = GooglePolyline.decode(line);
      const array: PolylineType[] = [];
      parsedLine.forEach((parsedCoords: number[]) => {
        array.push({
          latitude: parsedCoords[0],
          longitude: parsedCoords[1],
        });
      });
      return array;
    });
  }
}
