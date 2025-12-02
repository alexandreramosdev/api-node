import fastify from "fastify";

import { courses } from "./src/database/schema.ts";
import { db } from "./src/database/client.ts";

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

server.get("/courses", async (request, reply) => {
  const result = await db
    .select({ id: courses.id, name: courses.name })
    .from(courses);

  return reply.status(200).send({ courses: result });
});

server.get("/health", async () => {
  return { status: "ok" };
});

server.listen({ port: 3000 }).then(() => {
  console.log("Server running on port 3000");
});
