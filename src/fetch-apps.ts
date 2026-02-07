import { showToast, Toast } from "@raycast/api";
import { getAllApps } from "./lib/kintone";
import { saveApps } from "./utils/storage";

export default async function FetchApps() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "アプリ一覧を取得中...",
  });

  try {
    const apps = await getAllApps();

    await saveApps(apps);

    toast.style = Toast.Style.Success;
    toast.title = "アプリ一覧を取得しました";
    toast.message = `${apps.length}個のアプリを保存しました`;
  } catch (error) {
    console.error("Failed to fetch apps:", error);

    toast.style = Toast.Style.Failure;
    toast.title = "アプリ一覧の取得に失敗しました";
    toast.message =
      error instanceof Error ? error.message : "不明なエラーが発生しました";
  }
}
