import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";

test("deletea course by ID", async () => {
  await server.ready();

  const course = await makeCourse();

  const response = await request(server.server).delete(
    `/api/courses/${course.id}`
  );

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    message: "Course deleted successfully",
  });
});
