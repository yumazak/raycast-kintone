import { LocalStorage } from "@raycast/api";
import type { KintoneApp } from "../types/kintone";
import { APPS_STORAGE_KEY } from "./constants";

export async function saveApps(apps: KintoneApp[]): Promise<void> {
  await LocalStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
}
