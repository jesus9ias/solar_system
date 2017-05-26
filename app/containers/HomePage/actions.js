
import {
  GET_CELESTIAL_DATA,
} from './constants';

export function getCelestialData(canvas, context) {
  return {
    type: GET_CELESTIAL_DATA,
    data: { canvas, context },
  };
}
