import "dotenv/config";
import { db } from "./prisma/db.ts";

await db.orm.public.Product.deleteMany({});
await db.orm.public.Category.deleteMany({});

const electronics = await db.orm.public.Category.create({
  name: "Electronics",
});

const sports = await db.orm.public.Category.create({
  name: "Sports",
});

await db.orm.public.Product.createAll([
  {
    name: "Wireless Headphones",
    description:
      "Comfortable wireless headphones with clear sound, long battery life, and a lightweight design.",
    price: 79.99,
    stock: 24,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    categoryId: electronics.id,
  },
  {
    name: "Mechanical Keyboard",
    description:
      "A responsive mechanical keyboard with tactile switches and a durable design for work and gaming.",
    price: 119.99,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    categoryId: electronics.id,
  },
  {
    name: "Running Shoes",
    description:
      "Lightweight running shoes designed for everyday training, comfort, and reliable support.",
    price: 89.99,
    stock: 32,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    categoryId: sports.id,
  },
  {
    name: "Travel Backpack",
    description:
      "Spacious and practical backpack with multiple compartments for travel, work, and everyday use.",
    price: 49.99,
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    categoryId: sports.id,
  },
  {
    name: "Smart Watch",
    description:
      "Modern smartwatch with fitness tracking, notifications, and a bright high-resolution display.",
    price: 149.99,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    categoryId: electronics.id,
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with powerful sound, compact design, and reliable battery life.",
    price: 59.99,
    stock: 27,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    categoryId: electronics.id,
  },
  {
    name: "Sports Jacket",
    description:
      "Versatile sports jacket made for outdoor activities with a comfortable and practical fit.",
    price: 99.99,
    stock: 9,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    categoryId: sports.id,
  },
  {
    name: "Gym Bag",
    description:
      "Durable gym bag with enough space for clothing, shoes, and everyday training essentials.",
    price: 39.99,
    stock: 21,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    categoryId: sports.id,
  },
]);

console.log("Seed completed successfully.");

await db.close();