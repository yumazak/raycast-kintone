import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getAllApps } from "../kintone";
import type { KintoneApp } from "../../types/kintone";

vi.mock("../../utils/kintone", () => ({
  getConfig: vi.fn(() => ({
    baseUrl: "https://test.cybozu.com",
    authToken: "test-token",
  })),
}));

vi.mock("../../utils/constants", () => ({
  APPS_PAGE_LIMIT: 3,
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

describe("getAllApps", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  describe("アプリが1ページに収まる場合", () => {
    it("1回のfetchで全アプリを返す", async () => {
      const mockApps = [createMockApp("1"), createMockApp("2")];

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ apps: mockApps }),
      } as Response);

      const result = await getAllApps();

      expect(result).toEqual(mockApps);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("アプリが複数ページにまたがる場合", () => {
    it("全ページを取得して結合したアプリを返す", async () => {
      const page1Apps = [
        createMockApp("1"),
        createMockApp("2"),
        createMockApp("3"),
      ];
      const page2Apps = [
        createMockApp("4"),
        createMockApp("5"),
        createMockApp("6"),
      ];
      const page3Apps = [createMockApp("7")];

      vi.mocked(global.fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ apps: page1Apps }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ apps: page2Apps }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ apps: page3Apps }),
        } as Response);

      const result = await getAllApps();

      expect(result).toHaveLength(7);
      expect(result).toEqual([...page1Apps, ...page2Apps, ...page3Apps]);
      expect(global.fetch).toHaveBeenCalledTimes(3);

      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        "https://test.cybozu.com/k/v1/apps.json?limit=3&offset=0",
        expect.any(Object),
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        "https://test.cybozu.com/k/v1/apps.json?limit=3&offset=3",
        expect.any(Object),
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        3,
        "https://test.cybozu.com/k/v1/apps.json?limit=3&offset=6",
        expect.any(Object),
      );
    });
  });

  describe("アプリが存在しない場合", () => {
    it("空の配列を返す", async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ apps: [] }),
      } as Response);

      const result = await getAllApps();

      expect(result).toEqual([]);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
