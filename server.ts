import fastify from "fastify";

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

server.get("/health", async () => {
  return { status: "ok" };
});

server.listen({ port: 3000 }).then(() => {
  console.log("Server running on port 3000");
});
