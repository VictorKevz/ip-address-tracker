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
import { ErrorUI } from "./ErrorUI";
import { AnimatePresence, motion } from "framer-motion";
import { viewVariants } from "../variants";

export const MapCard = () => {
  const { ipState, uiState } = useSearchContext();
  const { theme } = useTheme();
  const { lng, lat } = ipState;

  const lightMapUrl =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const darkMapUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  if (uiState.error) return <ErrorUI />;

  if (uiState.isLoading)
    return (
      <section className="w-full flex items-center relative mt-[-7rem] z-10">
        <div className="absolute left-[50%] bottom-[-18rem]">
          <Spinner />
        </div>
      </section>
    );
  return (
    <section className="w-full flex items-center relative mt-[-7rem] z-10">
      <AnimatePresence>
        <motion.div
          className="shadow-md cursor-pointer w-full"
          variants={viewVariants(20)}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <MapContainer
            center={[lat, lng]}
            key={ipState.ip}
            zoom={17}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ height: "78dvh", width: "100%" }}
            className=""
          >
            <TileLayer
              url={theme === "dark" ? darkMapUrl : lightMapUrl}
              attribution="&copy; OpenStreetMap contributors"
            />
            <ZoomControl position="bottomleft" />
            <Marker position={[lat, lng]}>
              <Popup>User Location</Popup>
            </Marker>
            <MapUpdater lat={lat} lng={lng} />
          </MapContainer>
        </motion.div>
      </AnimatePresence>
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
