import { describe, it, expect, vi, beforeEach } from "vitest";
import { getConfig, getAppUrl } from "../kintone";

const mockGetPreferenceValues = vi.fn();

vi.mock("@raycast/api", () => ({
  getPreferenceValues: () => mockGetPreferenceValues(),
}));

describe("getConfig", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("設定値が取得できる場合", () => {
    it("baseUrlとauthTokenを返す", () => {
      mockGetPreferenceValues.mockReturnValue({
        subdomain: "example",
        username: "user",
        password: "pass",
      });

      const result = getConfig();

      expect(result.baseUrl).toBe("https://example.cybozu.com");
      expect(result.authToken).toBe(
        Buffer.from("user:pass").toString("base64"),
      );
    });
  });
});

describe("getAppUrl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetPreferenceValues.mockReturnValue({
      subdomain: "example",
      username: "user",
      password: "pass",
    });
  });

  describe("appIdが指定された場合", () => {
    it("アプリのURLを返す", () => {
      const result = getAppUrl("123");

      expect(result).toBe("https://example.cybozu.com/k/123/");
    });
  });
});
