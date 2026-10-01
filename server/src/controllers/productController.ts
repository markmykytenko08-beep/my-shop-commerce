import type { Request, Response } from "express";
import { prisma } from "../prisma/db.js";

export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
}
