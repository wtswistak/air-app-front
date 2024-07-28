import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer as MapLayout, TileLayer, Marker, useMap } from "react-leaflet";
import { useGetAirIndexes } from "../api/useGetAirIndexes";
import Loader from "./Loader";
import { useCallback, useEffect, useState } from "react";

interface MapContainerProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  onSelectStation: (stationId: number) => void;
  stationId?: number;
}

const MapContainer: React.FC<MapContainerProps> = ({
  onSelectStation,
  setIsSidebarOpen,
  stationId
}) => {
  const { data, isLoading } = useGetAirIndexes();
  const [coordinates, setCoordinates] = useState<[number, number]>([52.237049, 21.017532]);

  const customIcon = useCallback((color: string) => {
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #f0f0f0;"></div>`,
      className: "custom-icon",
    });
  }, []);

  useEffect(() => {
    if (stationId && data) {
      const station = data.find((station) => station.id === stationId);

      if (station) {
        setCoordinates([parseFloat(station.latitude), parseFloat(station.longitude)]);
      }
    }
  }, [stationId, data]);

  function SetViewOnClick({ coordinates }: { coordinates: [number, number] }) {
    const map = useMap();
    map.setView(coordinates, 8);
  
    return null;
  }

  return (
    <MapLayout
      center={coordinates}
      zoom={7}
      style={{ height: "100vh", width: "100%" }}
      className="z-0"
    >
      {isLoading && <Loader />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data &&
        data.map((station) => {
          const icon = customIcon(station.indexColor);

          return (
            <Marker
              key={station.id}
              position={[
                parseFloat(station.latitude),
                parseFloat(station.longitude),
              ]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  setIsSidebarOpen(true);
                  onSelectStation(station.id);
                },
              }}
            />
          );
        })}
      <SetViewOnClick coordinates={coordinates} />
    </MapLayout>
  );
};

export default MapContainer;
