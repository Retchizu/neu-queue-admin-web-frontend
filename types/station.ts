import CashierType from "./CashierType";

type Station = {
  id: string;
  name: string;
  description: string;
  type: CashierType;
  activated: boolean;
};

export default Station;

export type PartialStation = Omit<Station, "id">;
