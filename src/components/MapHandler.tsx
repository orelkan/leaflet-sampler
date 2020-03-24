import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { LeafletMouseEvent } from 'leaflet';
import { Button } from '@material-ui/core';
import { addPoint, clearFeatures, FeaturesState, toggleSampleMode, toggleTable } from '../store/features';
 
const zoom = 8;
const initialPosition = {
  lat: 31.639,
  lng: 34.996
}

function MapHandler() {
  const dispatch = useDispatch();
  const points = useSelector((store: FeaturesState) => store.points);
  const sampleMode = useSelector((store: FeaturesState) => store.sampleMode);
  const isTableDisplayed = useSelector((store: FeaturesState) => store.isTableDisplayed);

  function handleMapClick(e: LeafletMouseEvent) {
    if (sampleMode) {
      const { lat, lng } = e.latlng;
      dispatch(addPoint({ lat, lng }));
    }
  }

  function handleSampleToggle(e: any) {
    e.preventDefault();
    dispatch(toggleSampleMode());
  }

  function handleClear() {
    dispatch(clearFeatures());
  }

  function handleToggleTable() {
    dispatch(toggleTable());
  }

  const sampleModeString = sampleMode ? 'on' : 'off';

  return (
    <LeafletMap 
      onclick={handleMapClick}
      center={initialPosition} zoom={zoom} 
      >
      <TileLayer url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
      {points.map(point => (
          <Marker position={point.latlng} key={point.id}>
            <Popup>
              id: {point.id} <br/>
              lat, lng: [{point.latlng.lat}, {point.latlng.lng}]
            </Popup>
          </Marker>
      ))}
      <div className="leaflet-control-container sample-button leaflet-right leaflet-top">
        <Button color={sampleMode ? "primary" : 'secondary'} variant="contained" onClick={handleSampleToggle}>
          Sample points: {sampleModeString}
        </Button>
        <Button color="default" variant="contained" onClick={handleClear}>
          Clear
        </Button>
        <Button color="default" variant="contained" onClick={handleToggleTable}>
          {isTableDisplayed ? 'Hide' : 'Show'} Table
        </Button>
      </div>
    </LeafletMap>
  );
}

export default MapHandler;