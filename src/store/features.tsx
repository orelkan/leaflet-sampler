import { createSlice } from '@reduxjs/toolkit';
import { LatLngLiteral } from 'leaflet';
import { v4 as uuid } from 'uuid';

interface Point {
  latlng: LatLngLiteral,
  id: string
}

export interface FeaturesState {
  points: Point[],
  sampleMode: boolean,
  isTableDisplayed: boolean
}

const initialState: FeaturesState = {
  points: [], 
  sampleMode: false,
  isTableDisplayed: false
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    addPoint(state, action: { payload: LatLngLiteral }) {
      state.points.push({ latlng: action.payload, id: uuid() });
    },
    clearFeatures(state) {
      state.points = [];
    },
    toggleSampleMode(state) {
      // The Map's onclick happens before the button's, 
      // so we'll remove the last added point which was added just behind the button
      if (state.sampleMode) {
        state.points.pop();
      }
      state.sampleMode = !state.sampleMode;
    },
    toggleTable(state) {
      state.isTableDisplayed = !state.isTableDisplayed;
    }
  }
})

export const { addPoint, clearFeatures, toggleSampleMode, toggleTable } = featuresSlice.actions

export default featuresSlice.reducer