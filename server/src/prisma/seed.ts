import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const products = [
  {
    name: "Wireless Headphones",
    price: 89.99,
    stock: 25,
    description: "High-quality wireless headphones with noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    name: "Mechanical Keyboard",
    price: 119.99,
    stock: 15,
    description: "RGB mechanical keyboard with tactile switches.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
  },
  {
    name: "Running Shoes",
    price: 79.99,
    stock: 30,
    description: "Comfortable running shoes for everyday training.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    name: "Travel Backpack",
    price: 64.99,
    stock: 20,
    description: "Durable backpack suitable for travel and everyday use.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  },
  {
    name: "Smart Watch",
    price: 149.99,
    stock: 12,
    description: "Smart watch with fitness tracking and notifications.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    name: "Bluetooth Speaker",
    price: 59.99,
    stock: 18,
    description: "Portable Bluetooth speaker with powerful sound.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
  },
  {
    name: "Sports Jacket",
    price: 99.99,
    stock: 10,
    description: "Lightweight sports jacket for outdoor activities.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
  },
  {
    name: "Gym Bag",
    price: 44.99,
    stock: 22,
    description: "Spacious gym bag with multiple compartments.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  },
];

async function main() {
  const electronics = await prisma.category.upsert({
    where: { name: "Electronics" },
    update: {},
    create: { name: "Electronics" },
  });

  const sports = await prisma.category.upsert({
    where: { name: "Sports" },
    update: {},
    create: { name: "Sports" },
  });

  const productCategories = [
    electronics.id,
    electronics.id,
    sports.id,
    sports.id,
    electronics.id,
    electronics.id,
    sports.id,
    sports.id,
  ];

  for (let i = 0; i < products.length; i++) {
    await prisma.product.create({
      data: {
        ...products[i],
        category: {
          connect: {
            id: productCategories[i],
          },
        },
      },
    });
  }

  console.log(`Created ${products.length} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });