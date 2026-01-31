import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { storagePut } from "./storage";
import { saveFileUpload, getUserFileUploads, deleteFileUpload } from "./db";
import { getSongComments, addComment, getTopSongs, trackPageView, getTrafficBySource } from "./db.stats";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    upload: protectedProcedure
      .input(
        z.object({
          fileName: z.string(),
          fileData: z.string(),
          mimeType: z.string(),
          fileType: z.enum(["audio", "video", "image", "document", "other"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const buffer = Buffer.from(input.fileData, "base64");
        const fileSize = buffer.length;
        const fileKey = `${ctx.user.id}/uploads/${input.fileType}/${nanoid()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        await saveFileUpload({
          userId: ctx.user.id,
          fileName: input.fileName,
          fileKey,
          fileUrl: url,
          mimeType: input.mimeType,
          fileSize,
          fileType: input.fileType,
        });
        return { success: true, url, fileKey };
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      return await getUserFileUploads(ctx.user.id);
    }),
    delete: protectedProcedure
      .input(z.object({ fileId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteFileUpload(input.fileId, ctx.user.id);
        return { success: true };
      }),
  }),

  comments: router({
    list: publicProcedure
      .input(z.object({ songId: z.string() }))
      .query(async ({ input }) => {
        return await getSongComments(input.songId);
      }),
    add: publicProcedure
      .input(
        z.object({
          songId: z.string(),
          userName: z.string().min(1).max(255),
          content: z.string().min(1).max(1000),
          userId: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await addComment({
          songId: input.songId,
          userName: input.userName,
          content: input.content,
          userId: input.userId,
          approved: "pending",
        });
        return { success: true };
      }),
  }),

  stats: router({
    topSongs: publicProcedure.query(async () => {
      return await getTopSongs(5);
    }),
    trackView: publicProcedure
      .input(
        z.object({
          pageType: z.enum(["home", "song", "collection"]),
          pageId: z.string().optional(),
          source: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await trackPageView({
          pageType: input.pageType,
          pageId: input.pageId,
          source: input.source,
        });
        return { success: true };
      }),
    trafficBySource: publicProcedure.query(async () => {
      return await getTrafficBySource();
    }),
  }),
});

export type AppRouter = typeof appRouter;
