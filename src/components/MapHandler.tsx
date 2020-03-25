import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup, FeatureGroup, Polygon, Polyline } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { LeafletMouseEvent } from 'leaflet';
// @ts-ignore
import { EditControl } from 'react-leaflet-draw';
import { v4 as uuid } from 'uuid';
import { addPoint, addPolyline, addPolygon, FeaturesState} from '../store/features';
import ControlButtons from "./ControlButtons";

const zoom = 8;
const initialPosition = {
  lat: 31.639,
  lng: 34.996
};

function MapHandler() {
  const dispatch = useDispatch();
  const points = useSelector((store: FeaturesState) => store.points);
  const polylines = useSelector((store: FeaturesState) => store.polylines);
  const polygons = useSelector((store: FeaturesState) => store.polygons);
  const sampleMode = useSelector((store: FeaturesState) => store.sampleMode);

  // Deprecated
  function handleMapClick(e: LeafletMouseEvent) {
    if (sampleMode) {
      const { lat, lng } = e.latlng;
      dispatch(addPoint({ lat, lng }));
    }
  }

  function handleCreated(e: any) {
    switch (e.layerType) {
      case 'marker':
        const { lat, lng } = e.layer._latlng;
        dispatch(addPoint({ lat, lng }));
        break;
      case 'polyline':
        dispatch(addPolyline([...e.layer._latlngs]));
        break;
      case 'polygon':
        dispatch(addPolygon([...e.layer._latlngs]));
        break;
    }
  }

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
      {polylines.map(polyline => (
        <Polyline positions={polyline.latlngs} key={polyline.id}>
          <Popup>id: {polyline.id}</Popup>
        </Polyline>
      ))}
      {polygons.map(polygon => (
        <Polygon positions={polygon.latlngs} key={polygon.id}>
          <Popup>id: {polygon.id}</Popup>
        </Polygon>
      ))}
      <FeatureGroup key={uuid()}>
        <EditControl
          position='topright'
          onCreated={handleCreated}
          draw={{
            circle: false,
            circlemarker: false,
            rectangle: false,
          }}
          edit={{
            edit: false,
            remove: false
          }}
        />
      </FeatureGroup>
      <ControlButtons/>
    </LeafletMap>
  );
}

export default MapHandler;