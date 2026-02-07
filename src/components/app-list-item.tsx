import { Action, ActionPanel, List, open } from "@raycast/api";
import type { KintoneApp } from "../types/kintone";
import { stripHtml } from "../utils/html";
import { getAppUrl } from "../utils/kintone";

export function AppListItem({ app }: { app: KintoneApp }) {
  const appUrl = getAppUrl(app.appId);
  const subtitle = stripHtml(app.description);
  const accessories = [{ text: app.code }, { text: `ID: ${app.appId}` }];
  const handleAction = () => open(appUrl);

  return (
    <List.Item
      title={app.name}
      subtitle={subtitle}
      accessories={accessories}
      actions={
        <ActionPanel>
          <Action title="アプリを開く" onAction={handleAction} />
          <Action.CopyToClipboard title="URLをコピー" content={appUrl} />
          <Action.CopyToClipboard
            title="アプリIDをコピー"
            content={app.appId}
          />
        </ActionPanel>
      }
    />
  );
}
