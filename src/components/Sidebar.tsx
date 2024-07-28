import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useGetStationAirQuality } from "../api/useGetStationAirQuality";
import Loader from "./Loader";

interface SidebarProps {
  stationId: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ stationId, isOpen, setIsOpen }) => {
  const { data: station, isLoading } = useGetStationAirQuality(stationId);

  return (
    isOpen && (
      <div className="w-80 fixed h-full top-0 left-0 border-r-2 bg-[#f9fafb] z-50 border-[#c4c4c4] shadow-lg max-sm:w-full">
        {isLoading ? <Loader /> : 
          (station && (
            <>
              <div className="flex justify-end py-2 px-4">
                <IoIosCloseCircleOutline
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className="px-4">
                <h2 className="text-2xl font-semibold text-primary">
                  {station.city}
                </h2>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  {station.addressStreet}
                </h2>
                <h2 className="text-xl font-semibold text-primary mb-3">
                  {station.indexName}
                </h2>
                <div key={station.id} className="flex flex-col gap-2">
                  {station.sensors.map((sensor) => (
                    sensor.value !== -1 && <p key={sensor.sensorId} className="text-secondary font-semibold">
                      {`${sensor.pollutant}: ${sensor.value}`}
                      <React.Fragment>&nbsp;&micro;g/m&sup3;</React.Fragment>
                    </p>
                  ))}
                </div>
              </div>
            </>
          )
        )}
      </div>
    )
  );
};

export default Sidebar;
