// import { DeleteForever } from "@mui/icons-material";
import { useSearchContext } from "../context/IpSearchContext";
import { Spinner } from "./Spinner";
import { ErrorUI } from "./ErrorUI";
const LocationResults = () => {
  const { ipState, uiState } = useSearchContext();
  const data = {
    ip_address: ipState.ip ?? "N/A",
    location: `${ipState.region ?? "Unknown"}, ${ipState.country ?? "Unknown"}`,
    timezone: `UTC${ipState.timezone ?? ""}`,
    isp: ipState.isp ?? "Unknown",
  };
  // if (uiState.isLoading) {
  //   return <Spinner />;
  // }
  if (uiState.error) {
    return <ErrorUI />;
  }
  return (
    <div className="max-w-screen-lg w-full flex flex-col gap-2 mt-8 mb-[-8rem]">
      <div className="w-full flex flex-col items-center min-h-[10rem] md:flex-row justify-between gap-6 px-5 bg-[var(--neutral-50)] rounded-xl py-5 shadow-xl border border-[var(--neutral-100)] relative z-50">
        {uiState.isLoading ? (
          <div className="flex justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <>
            {Object.entries(data).map(([key, value], i) => (
              <p
                key={key}
                className={`flex flex-col gap-2 md:gap-3.5 items-center md:items-start h-100% relative ${
                  i != 0 &&
                  " before:hidden md:before:flex before:absolute before:left-[-2rem] before:top-[-.75rem] before:bg-[var(--neutral-100)] before:h-20 before:w-0.5"
                }`}
              >
                <span className="font-bold uppercase text-xs text-[var(--neutral-300)] tracking-[1.75px]">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="text-lg md:text-xl lg:2xl font-medium text-[var(--neutral-900)]">
                  {value}
                </span>
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LocationResults;
