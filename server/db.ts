import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, fileUploads, InsertFileUpload, musicMetadata, InsertMusicMetadata, testimonies, InsertTestimony } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// File upload management
export async function saveFileUpload(data: InsertFileUpload) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(fileUploads).values(data);
  return result;
}

export async function getUserFileUploads(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(fileUploads).where(eq(fileUploads.userId, userId));
  return result;
}

export async function deleteFileUpload(fileId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.delete(fileUploads)
    .where(eq(fileUploads.id, fileId) && eq(fileUploads.userId, userId));
  return result;
}

// Music metadata management
export async function saveMusicMetadata(data: InsertMusicMetadata) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(musicMetadata).values(data);
  return result;
}

export async function getUserMusicMetadata(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(musicMetadata).where(eq(musicMetadata.userId, userId));
  return result;
}

// TODO: add more feature queries here as your schema grows.

// Testimony helpers
export async function createTestimony(testimony: InsertTestimony) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(testimonies).values(testimony);
  return result;
}

export async function getApprovedTestimonies(limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(testimonies)
    .where(eq(testimonies.approved, "approved"))
    .orderBy(testimonies.createdAt)
    .limit(limit)
    .offset(offset);
  
  return result;
}

export async function getAllTestimonies(limit: number = 100, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(testimonies)
    .orderBy(testimonies.createdAt)
    .limit(limit)
    .offset(offset);
  
  return result;
}
