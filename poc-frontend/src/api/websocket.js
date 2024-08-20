import { useEffect, useState } from "react";

export const useADSBWebsocket = () => {
  const [aircraftList, setAircraftList] = useState([]);
  const websocketUrl = "ws://localhost:8080/adsb";

  useEffect(() => {
    const websocket = new WebSocket(websocketUrl);

    websocket.onmessage = (event) => {
      const message = event.data.split(",");

      const id = message[4];
      const latitude = message[14];
      const longitude = message[15];
      const altitude = message[11];
      const callsign = message[10];
      const lastUpdated = Date.now();

      setAircraftList((aircraftList) => {
        const aircraft = aircraftList.find((aircraft) => aircraft.id === id);

        if (aircraft) {
          aircraft.lastUpdated = lastUpdated;

          if (longitude && latitude) {
            aircraft.latitude = latitude;
            aircraft.longitude = longitude;
          }
          if (callsign) {
            aircraft.callsign = callsign;
          }
          if (altitude) {
            aircraft.altitude = altitude;
          }
        } else {
          aircraftList.push({
            id,
            latitude,
            longitude,
            altitude,
            callsign,
            lastUpdated,
          });
        }

        return [...aircraftList];
      });
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAircraftList((aircraftList) => {
        return aircraftList.filter(
          (aircraft) => Date.now() - aircraft.lastUpdated < 10000
        );
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return aircraftList;
};
