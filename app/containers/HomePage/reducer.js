
import { fromJS } from 'immutable';
import CelestialData from '../../components/SolarSystem/CelestialData';

import {
  GET_CELESTIAL_DATA,
} from './constants';

const initialState = fromJS({
  canvas: {},
  context: null
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CELESTIAL_DATA:
      return state
        .set('canvas', action.data.canvas)
        .set('context', action.data.context);
    default:
      return state;
  }
}

export default homeReducer;
