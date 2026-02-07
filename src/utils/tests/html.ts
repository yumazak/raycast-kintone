import { describe, it, expect } from "vitest";
import { stripHtml } from "../html";

describe("stripHtml", () => {
  describe("HTMLタグが含まれる場合", () => {
    it("タグを除去してテキストのみ返す", () => {
      const result = stripHtml("<p>Hello</p>");
      expect(result).toBe("Hello");
    });
  });

  describe("複数のタグが含まれる場合", () => {
    it("全てのタグを除去する", () => {
      const result = stripHtml("<div><p>Hello</p><span>World</span></div>");
      expect(result).toBe("HelloWorld");
    });
  });

  describe("タグが含まれない場合", () => {
    it("元のテキストをそのまま返す", () => {
      const result = stripHtml("Hello World");
      expect(result).toBe("Hello World");
    });
  });

  describe("前後に空白がある場合", () => {
    it("trimされた結果を返す", () => {
      const result = stripHtml("  <p>Hello</p>  ");
      expect(result).toBe("Hello");
    });
  });

  describe("空文字の場合", () => {
    it("空文字を返す", () => {
      const result = stripHtml("");
      expect(result).toBe("");
    });
  });
});
