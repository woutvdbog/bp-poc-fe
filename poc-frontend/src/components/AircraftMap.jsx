import React from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Tooltip } from "react-leaflet/Tooltip";
import "leaflet/dist/leaflet.css";

const AircraftMap = ({ aircraftList }) => {
  const centerPosition = [50.8424057, 4.3586407];

  return (
    <MapContainer
      center={centerPosition}
      zoom={8}
      style={{ height: "100vh", width: "75%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {aircraftList.map((aircraft) => {
        const icon = L.divIcon({
          className: "custom-marker",
          html: `<div style="background-color: #46b800; width: 12px; height: 12px; border-radius: 50%; border: 1px solid #000;"></div>`,
          iconAnchor: [6, 6],
          iconSize: [20, 20],
        });

        return (
          <Marker
            key={aircraft.id}
            position={[aircraft.latitude, aircraft.longitude]}
            icon={icon}
          >
            <Tooltip>
              <div>
                <h3>{aircraft.callsign}</h3>
                <p>
                  {aircraft.altitude} ft
                  <br />
                  {aircraft.latitude}, {aircraft.longitude}
                </p>
                <sub>
                  Last updated:{" "}
                  {Math.floor((Date.now() - aircraft.lastUpdated) / 1000)}s ago
                </sub>
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default AircraftMap;
