import { addCartItem } from "@features/cart-item/services/crud";

/**
 * POST api/cart-item
 * 
 * Adds a cart-item with fields matching `req`'s payload
 * @param {Request} req Incoming request containing the following:
 * - `userId`: The ID of the user
 * - `productId`: The ID of the product to be added to the cart
 * - `quantity`: The number of items to be added
 * 
 * Response: 
 * - 200 OK: Successfully added
 * - 400 Bad Request: If input field/s are missing or invalid
 * - 500 Internal Server Error: If the cart-item cannot be created
 */
export async function POST(req: Request) {
  const { userId, productId, quantity } = await req.json();

  // Basic validation
  if (!userId || !productId || !quantity) {
    return Response.json(
      { message: "Invalid input: Payload field/s missing" },
      { status: 400 }
    );
  }

  const userIdNum = Number(userId);
  const productIdNum = Number(productId);
  const quantityNum = Number(quantity);

  if (!Number.isInteger(userIdNum)) {
    return Response.json(
      { message: "Invalid input: userId is invalid" },
      { status: 400 }
    );
  }

  if (!Number.isInteger(productIdNum)) {
    return Response.json(
      { message: "Invalid input: productId is invalid" },
      { status: 400 }
    );
  }

  if (!Number.isInteger(quantityNum) || quantityNum <= 0) {
    return Response.json(
      { message: "Invalid input: quantity must be a positive integer" },
      { status: 400 }
    );
  }

  return addCartItem(userIdNum, productIdNum, quantityNum);
}
