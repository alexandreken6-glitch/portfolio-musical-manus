import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// File uploads table for tracking S3 files
export const fileUploads = mysqlTable("file_uploads", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull().unique(),
  fileUrl: text("fileUrl").notNull(),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  fileSize: int("fileSize").notNull(),
  fileType: mysqlEnum("fileType", ["audio", "video", "image", "document", "other"]).default("other").notNull(),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FileUpload = typeof fileUploads.$inferSelect;
export type InsertFileUpload = typeof fileUploads.$inferInsert;

// Music metadata table
export const musicMetadata = mysqlTable("music_metadata", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  collection: varchar("collection", { length: 100 }).notNull(),
  audioFileId: int("audioFileId"),
  videoFileId: int("videoFileId"),
  lyrics: text("lyrics"),
  audioPrompt: text("audioPrompt"),
  videoPrompt: text("videoPrompt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MusicMetadata = typeof musicMetadata.$inferSelect;
export type InsertMusicMetadata = typeof musicMetadata.$inferInsert;

// Song statistics table
export const songStats = mysqlTable("song_stats", {
  id: int("id").autoincrement().primaryKey(),
  songId: varchar("songId", { length: 100 }).notNull().unique(),
  songTitle: varchar("songTitle", { length: 255 }).notNull(),
  views: int("views").default(0).notNull(),
  likes: int("likes").default(0).notNull(),
  shares: int("shares").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SongStat = typeof songStats.$inferSelect;
export type InsertSongStat = typeof songStats.$inferInsert;

// Comments table
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  songId: varchar("songId", { length: 100 }).notNull(),
  userId: int("userId"),
  userName: varchar("userName", { length: 255 }).notNull(),
  content: text("content").notNull(),
  approved: mysqlEnum("approved", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

// Page views tracking
export const pageViews = mysqlTable("page_views", {
  id: int("id").autoincrement().primaryKey(),
  pageType: varchar("pageType", { length: 50 }).notNull(), // 'home', 'song', 'collection'
  pageId: varchar("pageId", { length: 100 }),
  source: varchar("source", { length: 50 }), // 'instagram', 'tiktok', 'direct', 'search'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = typeof pageViews.$inferInsert;

// Testimonies table for "De Jesus até Weyda" page
export const testimonies = mysqlTable("testimonies", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  message: text("message").notNull(),
  approved: mysqlEnum("approved", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimony = typeof testimonies.$inferSelect;
export type InsertTestimony = typeof testimonies.$inferInsert;