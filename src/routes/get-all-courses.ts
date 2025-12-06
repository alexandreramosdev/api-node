import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema.ts";
import { db } from "../database/client.ts";
import z from "zod";
import { and, asc, ilike, SQL } from "drizzle-orm";

export const getAllCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/api/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Get all courses",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(["title"]).optional().default("title"),
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
                description: z.string().nullable(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page } = request.query;

      const conditions: SQL[] = [];

      if (search) {
        conditions.push(ilike(courses.title, `%${search}%`));
      }

      const [result, total] = await Promise.all([
        db
          .select()
          .from(courses)
          .orderBy(asc(courses[orderBy]))
          .offset((page - 1) * 4)
          .limit(4)
          .where(and(...conditions)),
        db.$count(courses, and(...conditions)),
      ]);

      return reply.status(200).send({ courses: result, total });
    }
  );
};
