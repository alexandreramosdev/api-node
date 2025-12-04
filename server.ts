import fastify from "fastify";

import { courses } from "./src/database/schema.ts";
import { db } from "./src/database/client.ts";
import { eq } from "drizzle-orm";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

server.post("/api/courses", async (request, reply) => {
  type Body = {
    name: string;
    description?: string;
  };

  const { name, description } = request.body as Body;

  if (!name) {
    return reply.status(400).send({ message: "Name is required" });
  }

  const result = await db
    .insert(courses)
    .values({ name, description })
    .returning();

  return reply.status(201).send({ courseId: result[0].id });
});

server.get("/api/courses", async (request, reply) => {
  const result = await db.select().from(courses);

  return reply.status(200).send({ courses: result });
});

server.get("/api/courses/:id", async (request, reply) => {
  type Params = {
    id: string;
  };

  const params = request.params as Params;
  const courseId = params.id;

  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId));

  if (result.length === 0) {
    return reply.status(404).send({ message: "Course not found" });
  }

  return reply.status(200).send({ course: result[0] });
});

server.delete("/api/courses/:id", async (request, reply) => {
  type Params = {
    id: string;
  };

  const params = request.params as Params;
  const courseId = params.id;

  await db.delete(courses).where(eq(courses.id, courseId));

  return reply.status(200).send({ message: "Course deleted successfully" });
});

server.listen({ port: 3000 }).then(() => {
  console.log("Server running on port 3000");
});
