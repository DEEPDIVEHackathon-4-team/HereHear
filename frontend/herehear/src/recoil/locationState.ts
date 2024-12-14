import { atom } from "recoil";

export interface LocationState {
  name: string;
  address: string;
  x: number;
  y: number;
  dong: string;
}

export const locationState = atom<LocationState>({
  key: "locationState",
  default: {
    name: "",
    address: "",
    x: 0,
    y: 0,
    dong: "",
  },
});
export const selectLocationState = atom({
  key: "selectLocationState",
  default: {
    name: "",
    address: "",
    x: 0,
    y: 0,
    dong: "",
  },
});
