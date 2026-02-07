import { List, showToast, Toast } from "@raycast/api";
import { useEffect } from "react";
import { AppListItem } from "./components/app-list-item";
import { useKintoneApps } from "./hooks/use-kintone-apps";
import { useSearchApps } from "./hooks/use-search-apps";

export default function SearchApps() {
  const { apps, isLoading, isEmpty } = useKintoneApps();
  const { handleSearchTextChange, filteredApps } = useSearchApps(apps ?? []);

  useEffect(() => {
    if (!isEmpty) return;

    showToast({
      style: Toast.Style.Failure,
      title: "アプリデータがありません",
      message: "先に「Fetch Apps」コマンドを実行してください",
    });
  }, [isEmpty]);

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={handleSearchTextChange}
      searchBarPlaceholder="アプリ名、説明、コード、アプリIDで検索..."
      throttle
    >
      {filteredApps.map((app) => (
        <AppListItem key={app.appId} app={app} />
      ))}
    </List>
  );
}
