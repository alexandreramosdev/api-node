import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";

test("create a new course", async () => {
  await server.ready();

  const response = await request(server.server)
    .post("/api/courses")
    .set("Content-Type", "application/json")
    .send({
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(1),
    });

  expect(response.status).toBe(201);
  expect(response.body).toEqual({ courseId: expect.any(String) });
});
