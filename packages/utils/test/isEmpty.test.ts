// test/isEmpty.test.ts
import { describe, it, expect } from "vitest";
import { isEmpty } from "../src/isEmpty";

describe("isEmpty()", () => {
  it("returns true for null", () => {
    expect(isEmpty(null)).toBe(true);
  });

  it("returns true for empty string", () => {
    expect(isEmpty("")).toBe(true);
  });

  it("returns false for non-empty array", () => {
    expect(isEmpty([1, 2])).toBe(false);
  });
});
