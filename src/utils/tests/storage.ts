import { describe, it, expect, vi, beforeEach } from "vitest";
import { saveApps } from "../storage";
import type { KintoneApp } from "../../types/kintone";

const mockSetItem = vi.fn();

vi.mock("@raycast/api", () => ({
  LocalStorage: {
    setItem: (...args: unknown[]) => mockSetItem(...args),
  },
}));

vi.mock("../constants", () => ({
  APPS_STORAGE_KEY: "test-apps-key",
}));

function createMockApp(id: string): KintoneApp {
  return {
    appId: id,
    code: `app-${id}`,
    name: `App ${id}`,
    description: `Description for app ${id}`,
    spaceId: null,
    threadId: null,
    createdAt: "2024-01-01T00:00:00Z",
    creator: { code: "user1", name: "User 1" },
    modifiedAt: "2024-01-01T00:00:00Z",
    modifier: { code: "user1", name: "User 1" },
  };
}

describe("saveApps", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSetItem.mockResolvedValue(undefined);
  });

  describe("アプリ一覧が渡された場合", () => {
    it("JSON文字列としてLocalStorageに保存する", async () => {
      const apps = [createMockApp("1"), createMockApp("2")];

      await saveApps(apps);

      expect(mockSetItem).toHaveBeenCalledWith(
        "test-apps-key",
        JSON.stringify(apps),
      );
    });
  });

  describe("空の配列が渡された場合", () => {
    it("空配列のJSON文字列を保存する", async () => {
      await saveApps([]);

      expect(mockSetItem).toHaveBeenCalledWith("test-apps-key", "[]");
    });
  });
});
