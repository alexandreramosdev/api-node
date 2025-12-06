import { fakerPT_BR as faker } from "@faker-js/faker";
import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";

async function seed() {
  const userInsert = await db
    .insert(users)
    .values([
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    ])
    .returning();

  const courseInsert = await db
    .insert(courses)
    .values([
      {
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(1),
      },
      {
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(1),
      },
    ])
    .returning();

  await db.insert(enrollments).values([
    {
      userId: userInsert[0].id,
      courseId: courseInsert[0].id,
    },
    {
      userId: userInsert[1].id,
      courseId: courseInsert[0].id,
    },
    {
      userId: userInsert[2].id,
      courseId: courseInsert[1].id,
    },
  ]);
}

seed();
