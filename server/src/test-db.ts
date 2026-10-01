import { prisma } from "./prisma/db.ts";

const products = await prisma.product.findMany();

console.log(products);

await prisma.$disconnect();