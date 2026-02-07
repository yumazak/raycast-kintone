import { useState } from "react";
import type { KintoneApp } from "../types/kintone";

export function useSearchApps(apps: KintoneApp[]) {
  const [searchText, setSearchText] = useState("");

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchText.toLowerCase()) ||
      app.description.toLowerCase().includes(searchText.toLowerCase()) ||
      app.code.toLowerCase().includes(searchText.toLowerCase()) ||
      app.appId.includes(searchText),
  );

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return {
    searchText,
    handleSearchTextChange,
    filteredApps,
  };
}
