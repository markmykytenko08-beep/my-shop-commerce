import type { Request, Response } from "express";
import { db } from "../prisma/db.js";

type RequestedOrderItem = {
  productId: number;
  quantity: number;
};

function isValidOrderItems(
  items: unknown,
): items is RequestedOrderItem[] {
  if (!Array.isArray(items) || items.length === 0) {
    return false;
  }

  return items.every(
    (item) =>
      item !== null &&
      typeof item === "object" &&
      Number.isInteger(item.productId) &&
      item.productId > 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0,
  );
}

export async function createOrder(
  req: Request,
  res: Response,
) {
  try {
    // 1. Check authentication.
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // 2. Read shipping details and requested items.
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      postalCode,
      country,
      items,
    } = req.body;

    const shippingFields = [
      firstName,
      lastName,
      email,
      street,
      city,
      postalCode,
      country,
    ];

    if (
      shippingFields.some(
        (field) =>
          typeof field !== "string" ||
          field.trim().length === 0,
      )
    ) {
      return res.status(400).json({
        message: "All shipping fields are required",
      });
    }

    // 3. Validate requested items.
    if (!isValidOrderItems(items)) {
      return res.status(400).json({
        message: "Invalid order items",
      });
    }

    // 4. Combine duplicate product IDs.
    const quantities = new Map<number, number>();

    for (const item of items) {
      const currentQuantity =
        quantities.get(item.productId) ?? 0;

      quantities.set(
        item.productId,
        currentQuantity + item.quantity,
      );
    }

    const requestedItems = Array.from(
      quantities,
      ([productId, quantity]) => ({
        productId,
        quantity,
      }),
    );

    // 5. Fetch products from the database.
    const products = await Promise.all(
      requestedItems.map((item) =>
        db.orm.public.Product.first({
          id: item.productId,
        }),
      ),
    );

    // 6. Make sure every product exists.
    if (products.some((product) => !product)) {
      return res.status(400).json({
        message: "One or more products do not exist",
      });
    }

    // 7. Check stock availability.
    for (let i = 0; i < requestedItems.length; i++) {
      const product = products[i]!;
      const requestedItem = requestedItems[i];

      if (product.stock < requestedItem.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product: ${product.name}`,
          available: product.stock,
          requested: requestedItem.quantity,
        });
      }
    }

    // 8. Calculate prices using database values.
    const orderItems = requestedItems.map(
      (requestedItem, index) => {
        const product = products[index]!;

        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: requestedItem.quantity,
          subtotal:
            product.price * requestedItem.quantity,
        };
      },
    );

    // 9. Calculate the total order price.
    const total = orderItems.reduce(
      (sum, item) => sum + item.subtotal,
      0,
    );

    // 10. Temporary response until database saving is implemented.
    return res.status(501).json({
      message: "Order validated successfully",
      order: {
        userId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        street: street.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        items: orderItems,
        total,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Failed to create order",
    });
  }
}