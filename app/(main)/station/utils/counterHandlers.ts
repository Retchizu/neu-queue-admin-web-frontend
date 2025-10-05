type SetOpen = (open: boolean) => void;

export const assignEmployee = (
  counterUid: string,
  employeeId: string,
  onAssignEmployee: (counterUid: string, employeeId: string | null) => void,
  setOpen: SetOpen
) => {
  onAssignEmployee(counterUid, employeeId);
  setOpen(false);
};

export const removeEmployee = (
  counterUid: string,
  onAssignEmployee: (counterUid: string, employeeId: string | null) => void,
  setOpen: SetOpen
) => {
  onAssignEmployee(counterUid, null);
  setOpen(false);
};

export const closeCounter = (
  counterUid: string,
  onCloseCounter: ((counterUid: string) => void) | undefined,
  setOpen: SetOpen
) => {
  if (typeof onCloseCounter === "function") onCloseCounter(counterUid);
  setOpen(false);
};

const CounterHandlers = { assignEmployee, removeEmployee, closeCounter };

export default CounterHandlers;
