import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema.ts";
import { db } from "../database/client.ts";
import z from "zod";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/api/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Create a new course",
        body: z.object({
          name: z.string(),
          description: z.string().optional(),
        }),
        response: {
          201: z.object({
            courseId: z.uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const course = request.body;

      const result = await db.insert(courses).values(course).returning();

      return reply.status(201).send({ courseId: result[0].id });
    }
  );
};
