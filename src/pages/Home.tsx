import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MapContainer from "../components/MapContainer";

const Home = () => {
  const { stationId = "" } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!!stationId);

  const handleStationSelect = (id: number) => {
    navigate(`/station/${id}`);
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    if (stationId) {
      setIsSidebarOpen(true);
    }
  }, [stationId]);

  return (
    <div className="relative">
      {stationId && (
        <Sidebar
          stationId={parseInt(stationId)}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      )}
      <MapContainer
        setIsSidebarOpen={setIsSidebarOpen}
        onSelectStation={handleStationSelect}
        stationId={parseInt(stationId)}
      />
    </div>
  );
};

export default Home;
