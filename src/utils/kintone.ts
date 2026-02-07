import { getPreferenceValues } from "@raycast/api";
import { DEFAULT_BASE_DOMAIN } from "./constants";
import type { Preferences } from "../types/preferences";

export function getConfig() {
  const preferences = getPreferenceValues<Preferences>();
  const baseUrl = `https://${preferences.subdomain}.${DEFAULT_BASE_DOMAIN}`;
  const authToken = Buffer.from(
    `${preferences.username}:${preferences.password}`,
  ).toString("base64");

  return { baseUrl, authToken };
}

export function getAppUrl(appId: string): string {
  const { baseUrl } = getConfig();
  return `${baseUrl}/k/${appId}/`;
}
