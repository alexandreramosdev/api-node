import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createCourseRoute } from "./src/routes/create-course.ts";
import { getAllCoursesRoute } from "./src/routes/get-all-courses.ts";
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts";
import { deleteCourseByIdRoute } from "./src/routes/delete-course-by-id.ts";

import scalarApiReference from "@scalar/fastify-api-reference";

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
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "API Node",
        description: "API REST em Node.js + TypeScript + Fastify",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(scalarApiReference, {
    routePrefix: "/api/docs",
  });
}

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(createCourseRoute);
server.register(getAllCoursesRoute);
server.register(getCourseByIdRoute);
server.register(deleteCourseByIdRoute);

server.listen({ port: 3000 }).then(() => {
  console.log("Server running on port 3000");
});
