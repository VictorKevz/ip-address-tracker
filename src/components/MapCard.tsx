import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { useSearchContext } from "../context/IpSearchContext";
import { Spinner } from "./Spinner";
import { useTheme } from "../context/ThemeContext";

export const MapCard = () => {
  const { ipState } = useSearchContext();
  const { theme } = useTheme();
  const { lng, lat, isLoading } = ipState;

  const lightMapUrl =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const darkMapUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  return (
    <section className="w-full flex items-center relative mt-[-7rem] z-10">
      {isLoading ? (
        <div className="absolute left-[50%] bottom-[-18rem]">
          <Spinner />
        </div>
      ) : (
        <MapContainer
          center={[lat || 0, lng || 0]}
          zoom={10}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: "70dvh", width: "100%" }}
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
        </MapContainer>
      )}
    </section>
  );
};
