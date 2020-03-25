import React from 'react';
import { clearFeatures, FeaturesState, toggleSampleMode, toggleTable } from "../store/features";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

function ControlButtons() {
  const dispatch = useDispatch();
  const sampleMode = useSelector((store: FeaturesState) => store.sampleMode);
  const isTableDisplayed = useSelector((store: FeaturesState) => store.isTableDisplayed);

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

  // Deprecated for now, replaced with leaflet-draw
  const sampleModeString = sampleMode ? 'on' : 'off';
  const sampleModeButton = (
    <Button color={sampleMode ? "primary" : 'secondary'} variant="contained" onClick={handleSampleToggle}>
      Sample points: {sampleModeString}
    </Button>
  );

  return (
    <div className="leaflet-control-container sample-button leaflet-right leaflet-top">
      <Button color="default" variant="contained" onClick={handleClear}>
        Clear
      </Button>
      <Button color="primary" variant="contained" onClick={handleToggleTable}>
        {isTableDisplayed ? 'Hide' : 'Show'} Table
      </Button>
    </div>
  );
}

export default ControlButtons;