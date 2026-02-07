import { useLocalStorage } from "@raycast/utils";
import type { KintoneApp } from "../types/kintone";
import { APPS_STORAGE_KEY } from "../utils/constants";

export function useKintoneApps() {
  const { value: apps, isLoading } = useLocalStorage<KintoneApp[]>(
    APPS_STORAGE_KEY,
    [],
  );
  const isEmpty = !isLoading && !apps?.length;

  return { apps, isLoading, isEmpty };
}
