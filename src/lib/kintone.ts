import type { KintoneApp, KintoneAppsResponse } from "../types/kintone";
import { APPS_PAGE_LIMIT } from "../utils/constants";
import { getConfig } from "../utils/kintone";

async function getApps(limit: number, offset: number): Promise<KintoneApp[]> {
  const { baseUrl, authToken } = getConfig();
  const url = `${baseUrl}/k/v1/apps.json?limit=${limit}&offset=${offset}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Cybozu-Authorization": authToken,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch apps: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }

  const data = (await response.json()) as KintoneAppsResponse;

  return data.apps;
}

export async function getAllApps(): Promise<KintoneApp[]> {
  const allApps: KintoneApp[] = [];
  const limit = APPS_PAGE_LIMIT;
  let offset = 0;

  while (true) {
    const apps = await getApps(limit, offset);
    allApps.push(...apps);

    if (apps.length < limit) {
      break;
    }

    offset += limit;
  }

  return allApps;
}
