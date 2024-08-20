import React from "react";

const AircraftTable = ({ aircraftList }) => {
  return (
    <div className="aircraft-table">
      <table>
        <thead>
          <tr>
            <th>Callsign</th>
            <th>Altitude</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {aircraftList.map((aircraft) => (
            <tr key={aircraft.id}>
              <td>{aircraft.callsign || "N/A"}</td>
              <td>{aircraft.altitude ? `${aircraft.altitude} ft` : "N/A"}</td>
              <td>{aircraft.latitude || "N/A"}</td>
              <td>{aircraft.longitude || "N/A"}</td>
              <td>
                {Math.floor((Date.now() - aircraft.lastUpdated) / 1000)}s ago
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AircraftTable;
