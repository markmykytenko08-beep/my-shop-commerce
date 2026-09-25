import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 79.99,
      category: "Electronics",
      stock: 24,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 119.99,
      category: "Electronics",
      stock: 15,
    },
  ]);
});

export default router;