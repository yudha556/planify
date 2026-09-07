import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import type { tokenBlacklist as TokenBlacklist } from "../src/utils/token-blacklist";

let tokenBlacklist: typeof TokenBlacklist;

beforeAll(async () => {
  // Paksa jalur in-memory: string kosong tetap kosong walau dotenv
  // me-load ulang REDIS_URL dari file .env lokal saat import
  process.env.REDIS_URL = "";
  ({ tokenBlacklist } = await import("../src/utils/token-blacklist"));
});

describe("tokenBlacklist (in-memory fallback)", () => {
  beforeEach(async () => {
    await tokenBlacklist.clear();
  });

  it("marks added token as blacklisted", async () => {
    await tokenBlacklist.add("token-abc");
    expect(await tokenBlacklist.isBlacklisted("token-abc")).toBe(true);
  });

  it("returns false for unknown token", async () => {
    expect(await tokenBlacklist.isBlacklisted("never-added")).toBe(false);
  });

  it("removes token from blacklist", async () => {
    await tokenBlacklist.add("token-xyz");
    await tokenBlacklist.remove("token-xyz");
    expect(await tokenBlacklist.isBlacklisted("token-xyz")).toBe(false);
  });

  it("clears all blacklisted tokens", async () => {
    await tokenBlacklist.add("token-1");
    await tokenBlacklist.add("token-2");
    await tokenBlacklist.clear();
    expect(await tokenBlacklist.isBlacklisted("token-1")).toBe(false);
    expect(await tokenBlacklist.isBlacklisted("token-2")).toBe(false);
  });
});
