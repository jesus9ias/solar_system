
import { fromJS } from 'immutable';
// import CelestialData from '../../components/SolarSystem/CelestialData';

import {
  SET_CELESTIAL_DATA,
} from './constants';

const initialState = fromJS({
  canvas: null,
  context: null,
  celestialData: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CELESTIAL_DATA:
      return state
        .set('canvas', action.data.canvas)
        .set('context', action.data.context)
        .set('celestialData', action.data.celestialData);
    default:
      return state;
  }
}

export default homeReducer;
