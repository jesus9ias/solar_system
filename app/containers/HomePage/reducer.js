/*
 * HomeReducer
 */

import { fromJS } from 'immutable';
import CelestialData from '../../components/SolarSystem/CelestialData';

import {
  SET_CELESTIAL_DATA,
  UPDATE_PLANET_POSITION,
} from './constants';

const initialState = fromJS({
  canvas: null,
  context: null,
  celestialData: null,
  planetPositions: {
    scaleRate: 1,
    cycle: null,
    sun: null,
    mercury: null,
    mercuryOrbit: null,
    mercuryAngle: 0,
    venus: null,
    venusOrbit: null,
    venusAngle: 0,
    earth: null,
    earthOrbit: null,
    earthAngle: 0,
    mars: null,
    marsOrbit: null,
    marsAngle: 0,
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CELESTIAL_DATA: {
      const celestialData = new CelestialData(action.data.canvas);
      const positions = {
        sun: celestialData.sun(),
        mercury: celestialData.mercury(),
        mercuryAngle: 0,
        mercuryOrbit: celestialData.mercuryOrbit(),
        venus: celestialData.venus(),
        venusAngle: 0,
        venusOrbit: celestialData.venusOrbit(),
        earth: celestialData.earth(),
        earthAngle: 0,
        earthOrbit: celestialData.earthOrbit(),
        mars: celestialData.mars(),
        marsAngle: 0,
        marsOrbit: celestialData.marsOrbit(),
      };
      return state
        .set('canvas', action.data.canvas)
        .set('context', action.data.context)
        .set('celestialData', celestialData)
        .set('planetPositions', positions);
    }
    case UPDATE_PLANET_POSITION: {
      const planetPositions = state.get('planetPositions');
      const planet = action.data.planet;
      const angle = (planetPositions[`${planet}Angle`] >= 360) ? 0 : planetPositions[`${planet}Angle`] + planetPositions[planet].rotationRatio;
      const newPositions = {
        x: (planetPositions[`${planet}Orbit`].radius * Math.cos(angle * (Math.PI / 180))) + planetPositions[`${planet}Orbit`].x,
        y: (planetPositions[`${planet}Orbit`].radius * Math.sin(angle * (Math.PI / 180))) + planetPositions[`${planet}Orbit`].y,
      };
      planetPositions[`${planet}Angle`] = angle;
      planetPositions[planet] = Object.assign(planetPositions[planet], newPositions);
      return state
        .set('planetPositions', planetPositions);
    }
    default: {
      return state;
    }
  }
}

export default homeReducer;
