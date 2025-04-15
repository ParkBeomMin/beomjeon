// test/isCellularConnection.test.ts
import { describe, it, expect } from "vitest";
import { isCellularConnection } from "../src/isCellularConnection";

describe("isCellularConnection()", () => {
  it("returns true for cellular connection", () => {
    expect(isCellularConnection()).toBe(true);
  });
});

describe("isCellularConnection()", () => {
  it("returns false for non-cellular connection", () => {
    expect(isCellularConnection()).toBe(false);
  });
});


