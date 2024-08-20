import { useState, useEffect } from "react";
import React from "react";
import { useADSBWebsocket } from "../api/websocket";
import AircraftMap from "./AircraftMap";
import AircraftTable from "./AircraftTable";

const AircraftTracker = () => {
  const aircraftList = useADSBWebsocket();
  useEffect(() => {}, [aircraftList]);

  return (
    <div className="aircraft-tracker">
      <AircraftTable aircraftList={aircraftList} />
      <AircraftMap aircraftList={aircraftList} />
    </div>
  );
};

export default AircraftTracker;
