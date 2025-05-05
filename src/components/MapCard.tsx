import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { useSearchContext } from "../context/IpSearchContext";
import { Spinner } from "./Spinner";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

export const MapCard = () => {
  const { ipState, uiState } = useSearchContext();
  const { theme } = useTheme();
  const { lng, lat } = ipState;

  const lightMapUrl =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const darkMapUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <section className="w-full flex items-center relative mt-[-7rem] z-10">
      {uiState.isLoading ? (
        <div className="absolute left-[50%] bottom-[-18rem]">
          <Spinner />
        </div>
      ) : (
        <MapContainer
          center={[lat || 0, lng || 0]}
          key={ipState.ip}
          zoom={17}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: "78dvh", width: "100%" }}
          className="shadow-md cursor-pointer transition-all duration-300 ease-in-out"
        >
          <TileLayer
            url={theme === "dark" ? darkMapUrl : lightMapUrl}
            attribution="&copy; OpenStreetMap contributors"
          />
          <ZoomControl position="bottomleft" />
          <Marker position={[lat || 0, lng || 0]}>
            <Popup>User Location</Popup>
          </Marker>
          <MapUpdater lat={lat || 0} lng={lng || 0} />
        </MapContainer>
      )}
    </section>
  );
};

const MapUpdater = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 17, { duration: 1.5 });
    }
  }, [lat, lng, map]);

  return null;
};
