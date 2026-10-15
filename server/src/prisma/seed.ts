import "dotenv/config";
import { Temporal } from "@js-temporal/polyfill";

(globalThis as typeof globalThis & { Temporal: typeof Temporal }).Temporal = Temporal;

import { db } from "./db.js";

async function main() {
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
        "High-quality wireless headphones with clear sound and comfortable design.",
      price: 79.99,
      stock: 15,
      image: "https://placehold.co/600x400?text=Wireless+Headphones",
      categoryId: electronics.id,
    },
    {
      name: "Mechanical Keyboard",
      description:
        "Mechanical keyboard with responsive switches and a durable design.",
      price: 119.99,
      stock: 8,
      image: "https://placehold.co/600x400?text=Mechanical+Keyboard",
      categoryId: electronics.id,
    },
    {
      name: "Running Shoes",
      description:
        "Comfortable running shoes designed for everyday training and long runs.",
      price: 89.99,
      stock: 12,
      image: "https://placehold.co/600x400?text=Running+Shoes",
      categoryId: sports.id,
    },
    {
      name: "Travel Backpack",
      description:
        "Spacious and durable backpack suitable for travel, work, and everyday use.",
      price: 49.99,
      stock: 20,
      image: "https://placehold.co/600x400?text=Travel+Backpack",
      categoryId: sports.id,
    },
    {
      name: "Smart Watch",
      description:
        "Modern smartwatch with fitness tracking and everyday smart features.",
      price: 149.99,
      stock: 10,
      image: "https://placehold.co/600x400?text=Smart+Watch",
      categoryId: electronics.id,
    },
    {
      name: "Bluetooth Speaker",
      description:
        "Portable Bluetooth speaker with powerful sound and compact design.",
      price: 59.99,
      stock: 18,
      image: "https://placehold.co/600x400?text=Bluetooth+Speaker",
      categoryId: electronics.id,
    },
    {
      name: "Sports Jacket",
      description:
        "Lightweight sports jacket suitable for outdoor activities and training.",
      price: 99.99,
      stock: 7,
      image: "https://placehold.co/600x400?text=Sports+Jacket",
      categoryId: sports.id,
    },
    {
      name: "Gym Bag",
      description:
        "Practical gym bag with enough space for clothing, shoes, and accessories.",
      price: 39.99,
      stock: 14,
      image: "https://placehold.co/600x400?text=Gym+Bag",
      categoryId: sports.id,
    },
  ]);

  console.log("Seed completed: 8 products created.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
