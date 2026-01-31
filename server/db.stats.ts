import { eq, desc } from "drizzle-orm";
import { getDb } from "./db";
import { songStats, comments, pageViews, InsertComment, InsertPageView } from "../drizzle/schema";

export async function getSongStats(songId: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(songStats)
    .where(eq(songStats.songId, songId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getTopSongs(limit: number = 5) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(songStats)
    .orderBy(desc(songStats.views))
    .limit(limit);
}

export async function incrementSongViews(songId: string, songTitle: string) {
  const db = await getDb();
  if (!db) return;

  const existing = await getSongStats(songId);

  if (existing) {
    await db
      .update(songStats)
      .set({ views: existing.views + 1, updatedAt: new Date() })
      .where(eq(songStats.songId, songId));
  } else {
    await db.insert(songStats).values({
      songId,
      songTitle,
      views: 1,
      likes: 0,
      shares: 0,
    });
  }
}

export async function likeSong(songId: string) {
  const db = await getDb();
  if (!db) return;

  const existing = await getSongStats(songId);
  if (existing) {
    await db
      .update(songStats)
      .set({ likes: existing.likes + 1, updatedAt: new Date() })
      .where(eq(songStats.songId, songId));
  }
}

export async function shareSong(songId: string) {
  const db = await getDb();
  if (!db) return;

  const existing = await getSongStats(songId);
  if (existing) {
    await db
      .update(songStats)
      .set({ shares: existing.shares + 1, updatedAt: new Date() })
      .where(eq(songStats.songId, songId));
  }
}

export async function getSongComments(songId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(comments)
    .where(eq(comments.songId, songId))
    .orderBy(desc(comments.createdAt));
}

export async function addComment(comment: InsertComment) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(comments).values(comment);
  return result;
}

export async function approveComment(commentId: number) {
  const db = await getDb();
  if (!db) return;

  await db
    .update(comments)
    .set({ approved: "approved", updatedAt: new Date() })
    .where(eq(comments.id, commentId));
}

export async function rejectComment(commentId: number) {
  const db = await getDb();
  if (!db) return;

  await db
    .update(comments)
    .set({ approved: "rejected", updatedAt: new Date() })
    .where(eq(comments.id, commentId));
}

export async function trackPageView(view: InsertPageView) {
  const db = await getDb();
  if (!db) return;

  await db.insert(pageViews).values(view);
}

export async function getPageViewStats(pageType?: string) {
  const db = await getDb();
  if (!db) return [];

  if (pageType) {
    return await db
      .select()
      .from(pageViews)
      .where(eq(pageViews.pageType, pageType));
  }

  return await db.select().from(pageViews);
}

export async function getTrafficBySource() {
  const db = await getDb();
  if (!db) return {};

  const views = await db.select().from(pageViews);

  const bySource: Record<string, number> = {};
  views.forEach((view) => {
    const source = view.source || "direct";
    bySource[source] = (bySource[source] || 0) + 1;
  });

  return bySource;
}
