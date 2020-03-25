import { createSlice } from '@reduxjs/toolkit';
import { LatLngLiteral, LatLngBoundsLiteral } from 'leaflet';
import { v4 as uuid } from 'uuid';

export interface Point {
  latlng: LatLngLiteral,
  id: string
}

export interface Polyline {
  latlngs: LatLngBoundsLiteral,
  id: string
}

export interface Polygon {
  latlngs: LatLngBoundsLiteral,
  id: string
}

export interface FeaturesState {
  points: Point[],
  polylines: Polyline[],
  polygons: Polygon[],
  sampleMode: boolean,
  isTableDisplayed: boolean
}

const initialState: FeaturesState = {
  points: [],
  polylines: [],
  polygons: [],
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
    addPolyline(state, action: { payload: LatLngBoundsLiteral }) {
      state.polylines.push({ latlngs: action.payload, id: uuid() });
    },
    addPolygon(state, action: { payload: LatLngBoundsLiteral }) {
      state.polygons.push({ latlngs: action.payload, id: uuid() });
    },
    clearFeatures(state) {
      state.points = [];
      state.polylines = [];
      state.polygons = [];
    },
    // Deprecated for now, replaced with leaflet-draw
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
});

export const { addPoint, clearFeatures, toggleSampleMode, toggleTable, addPolygon, addPolyline } = featuresSlice.actions;

export default featuresSlice.reducer