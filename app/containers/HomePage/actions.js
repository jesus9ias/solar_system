
import {
  SET_CELESTIAL_DATA,
  UPDATE_PLANET_POSITION,
} from './constants';

//  export function setCelestialData(canvas, context, celestialData) {
export function setCelestialData(canvas, context) {
  return {
    type: SET_CELESTIAL_DATA,
    data: { canvas, context },
  };
}

export function updatePlanetPosition(planet) {
  return {
    type: UPDATE_PLANET_POSITION,
    data: { planet },
  };
}
