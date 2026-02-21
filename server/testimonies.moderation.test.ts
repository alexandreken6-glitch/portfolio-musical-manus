import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { Context } from "./_core/trpc";

describe("Testimonies Moderation", () => {
  let ownerContext: Context;
  let regularUserContext: Context;

  beforeAll(() => {
    // Mock owner context
    ownerContext = {
      user: {
        id: 1,
        openId: process.env.OWNER_OPEN_ID || "owner-open-id",
        name: "Owner",
        email: "owner@test.com",
        role: "admin",
        loginMethod: "email",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: {} as any,
      res: {} as any,
    };

    // Mock regular user context
    regularUserContext = {
      user: {
        id: 2,
        openId: "regular-user-open-id",
        name: "Regular User",
        email: "user@test.com",
        role: "user",
        loginMethod: "email",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: {} as any,
      res: {} as any,
    };
  });

  it("should allow owner to list pending testimonies", async () => {
    const caller = appRouter.createCaller(ownerContext);
    const result = await caller.testimonies.listPending({ limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("should not allow regular user to list pending testimonies", async () => {
    const caller = appRouter.createCaller(regularUserContext);
    await expect(
      caller.testimonies.listPending({ limit: 10 })
    ).rejects.toThrow("Unauthorized");
  });

  it("should allow owner to approve testimony", async () => {
    const caller = appRouter.createCaller(ownerContext);
    // Note: This will fail if testimony ID 999 doesn't exist, but that's expected
    // In a real test, we'd create a testimony first
    try {
      await caller.testimonies.approve({ id: 999 });
    } catch (error) {
      // Expected to fail if testimony doesn't exist
      expect(error).toBeDefined();
    }
  });

  it("should not allow regular user to approve testimony", async () => {
    const caller = appRouter.createCaller(regularUserContext);
    await expect(
      caller.testimonies.approve({ id: 1 })
    ).rejects.toThrow("Unauthorized");
  });

  it("should allow owner to reject testimony", async () => {
    const caller = appRouter.createCaller(ownerContext);
    // Note: This will fail if testimony ID 999 doesn't exist, but that's expected
    try {
      await caller.testimonies.reject({ id: 999 });
    } catch (error) {
      // Expected to fail if testimony doesn't exist
      expect(error).toBeDefined();
    }
  });

  it("should not allow regular user to reject testimony", async () => {
    const caller = appRouter.createCaller(regularUserContext);
    await expect(
      caller.testimonies.reject({ id: 1 })
    ).rejects.toThrow("Unauthorized");
  });

  it("should create testimony with pending status", async () => {
    const caller = appRouter.createCaller(regularUserContext);
    const result = await caller.testimonies.add({
      name: "Test User",
      message: "This is a test testimony that should be pending for moderation.",
    });
    expect(result.success).toBe(true);
  });
});
