import React, { useState } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { v4 as uuid } from 'uuid';
import { LeafletMouseEvent } from 'leaflet';

const lat = 31.639, lng = 34.996, zoom = 8;

type Point = {
  latlng: {
    lat: number,
    lng: number,
  },
  id: string
}

function MapHandler() {
  const [sampleMode, setSampleMode] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);

  function handleMapClick(e: LeafletMouseEvent) {
    console.log('Map Click', Date.now());
    
    if (sampleMode) {
      const newPoint = { latlng: e.latlng, id: uuid() };
      setPoints([...points, newPoint]);
    }
  }

  function handleSampleToggle(e: any) {
    console.log('Button Click', Date.now());

    e.preventDefault();
    setSampleMode(!sampleMode);

    // The Map's onclick happens before the button's, 
    // so we'll remove the last added point which was added just behind the button
    if (sampleMode) {
      const newPoints = [...points];
      newPoints.pop();
      setPoints(newPoints)
    }
  }

  function handleClear() {
    setPoints([]);
  }

  const sampleModeString = sampleMode ? 'on' : 'off';

  const position: [number, number] = [lat, lng];
    return (
      <LeafletMap 
        onclick={handleMapClick}
        center={position} zoom={zoom} 
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
          <button onClick={handleSampleToggle}>
            Sample points {sampleModeString}
          </button>
          <button onClick={handleClear}>
            Clear
          </button>
        </div>
      </LeafletMap>
    );
}

export default MapHandler;