import type Station from "@/types/station";

type SetOpen = (open: boolean) => void;

export const saveStation = (
  station: Station,
  onSave: ((s: Station) => void) | undefined,
  setOpen: SetOpen,
  resetStation: (s: Station) => void,
  defaultStation: Station
) => {
  if (typeof onSave === "function") onSave(station);
  else console.log("Saving station", station);
  setOpen(false);
  resetStation(defaultStation);
};

const StationHandlers = { saveStation };

export default StationHandlers;
