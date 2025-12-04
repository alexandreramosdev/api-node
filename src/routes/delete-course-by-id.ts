import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema.ts";
import { db } from "../database/client.ts";
import { eq } from "drizzle-orm";
import z from "zod";

export const deleteCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/api/courses/:id",
    {
      schema: {
        tags: ["Courses"],
        summary: "Delete a course by ID",
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const courseId = request.params.id;

      await db.delete(courses).where(eq(courses.id, courseId));

      return reply.status(200).send({ message: "Course deleted successfully" });
    }
  );
};
