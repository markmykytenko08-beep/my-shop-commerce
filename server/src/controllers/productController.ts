import type { Request, Response } from "express";
import { db } from "../prisma/db.js";

export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await db.orm.public.Product
      .include("category")
      .all();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await db.orm.public.Product
      .include("category")
      .first({ id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
}
