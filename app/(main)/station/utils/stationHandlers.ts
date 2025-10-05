import { PartialStation } from "@/types/station";

type SetOpen = (open: boolean) => void;

export const saveStation = (
  station: PartialStation,
  onSave: ((s: PartialStation) => void) | undefined,
  setOpen: SetOpen,
  resetStation: (s: PartialStation) => void,
  defaultStation: PartialStation
) => {
  if (typeof onSave === "function") onSave(station);
  else console.log("Saving station", station);
  setOpen(false);
  resetStation(defaultStation);
};

const StationHandlers = { saveStation };

export default StationHandlers;
