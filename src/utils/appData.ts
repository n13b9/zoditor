import LZString from "lz-string";
import { DEFAULT_APP_DATA, STORAGE_KEY } from "../constants";

export type AppData = {
  schema: string;
  values: string[];
} | null;

function parseAppData(appData: string): AppData {
  const parsed = JSON.parse(appData);

  return parsed;
}

export function getAppDataFromLocalStorage(): AppData {
  if (typeof window === "undefined") return null;
  const appData = localStorage.getItem(STORAGE_KEY);
  return appData ? parseAppData(appData) : null;
}

export function getAppDataFromSearchParams(): AppData {
  if (typeof window === "undefined") return null;
  const urlParams = new URLSearchParams(window.location.search);
  const compressedAppData = urlParams.get("appdata");

  if (compressedAppData) {
    const appData =
      LZString.decompressFromEncodedURIComponent(compressedAppData);
    return parseAppData(appData);
  }

  return null;
}

export function getURLwithAppData(appData: AppData): string {
  if (typeof window === "undefined") return "";
  const queryParams = new URLSearchParams();
  const compressedAppData = LZString.compressToEncodedURIComponent(
    JSON.stringify(appData)
  );

  queryParams.set("appdata", compressedAppData);

  return `${window.location.protocol}//${window.location.host}?${queryParams}`;
}
