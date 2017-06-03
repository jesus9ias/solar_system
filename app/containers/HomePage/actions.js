
import {
  SET_CELESTIAL_DATA,
} from './constants';

//  export function setCelestialData(canvas, context, celestialData) {
export function setCelestialData(canvas, context) {
  return {
    type: SET_CELESTIAL_DATA,
    data: { canvas, context },
  };
}
