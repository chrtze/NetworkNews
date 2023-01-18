import { prisma } from "~/db.server";

// import type { Topic } from "@prisma/client";

export async function getTopics() {
  return prisma.topic.findMany();
}

export async function getTopic(slug: string) {
  return prisma.topic.findUnique({ where: { slug } });
}