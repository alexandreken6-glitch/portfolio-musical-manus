import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Testimonies API", () => {

  it("should add a testimony", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.testimonies.add({
      name: "Test User",
      message: "This is a test testimony about my faith journey.",
    });

    expect(result).toEqual({ success: true });
  });

  it("should list testimonies", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);
    const testimonies = await caller.testimonies.list({ limit: 10 });

    expect(Array.isArray(testimonies)).toBe(true);
  });

  it("should reject testimony with short message", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.testimonies.add({
        name: "Test User",
        message: "Short",
      })
    ).rejects.toThrow();
  });

  it("should reject testimony with empty name", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.testimonies.add({
        name: "",
        message: "This is a valid message that is long enough.",
      })
    ).rejects.toThrow();
  });
});
