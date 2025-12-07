import { db } from "../../database/client.ts";
import { courses } from "../../database/schema.ts";
import { faker } from "@faker-js/faker";

export async function makeCourse(title?: string) {
  const response = await db
    .insert(courses)
    .values({
      title: title ?? faker.lorem.words(),
      description: faker.lorem.paragraph(1),
    })
    .returning();

  return response[0];
}
