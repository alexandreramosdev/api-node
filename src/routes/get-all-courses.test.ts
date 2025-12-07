import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { randomUUID } from "node:crypto";

test("get all courses", async () => {
  await server.ready();

  const titleId = randomUUID();

  const course = await makeCourse(titleId);

  const response = await request(server.server).get(
    `/api/courses?search=${titleId}`
  );
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    courses: [
      {
        id: course.id,
        title: course.title,
        description: course.description,
        enrollments: 0,
      },
    ],
    total: 1,
  });
});
