import { atom } from "recoil";

interface LocationState {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  dong: string;
}

export const locationState = atom<LocationState>({
  key: "locationState",
  default: {
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    dong: "",
  },
});
export const selectLocationState = atom<LocationState>({
  key: "selectLocationState",
  default: {
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    dong: "",
  },
});
