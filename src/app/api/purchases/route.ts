  import { addPurchaseProducts } from "@/features/purchase-products/services/crud";
  

  /**
   * POST api/product
   * 
   * Adds a product with fields matching `req`'s payload
   * @param {Request} req Incoming request containing the following:
   * - `id`: The id of the purchase-product
   * - `cart_id`: The id of the cart
   * - `product_id`: The id of the purchase-product
   * - `quantity`: The quantity of the purchased-products
   * 
   * Response: 
   * - 200 OK: Successfully Added
   * - 400 Bad Request: If input fields is/are invalid
   * - 500 Not Found: If user cannot be created
   */
  export async function POST(req: Request) {
    const { id, cartId, productId, quantity } = await req.json();

    if (!id || !cartId || !productId || !quantity) {
      return Response.json(
        { message: "Invalid input: Payload field/s missing" },
        { status: 400 }
      );
    }
    const idNum = Number(id);
    if (!Number.isInteger(idNum)) {
      return Response.json(
        { message: "Invalid input: id is invalid" },
        { status: 400 }
      );
    }
    const cartIdNum = Number(cartId);
    if (!Number.isInteger(cartIdNum)) {
      return Response.json(
        { message: "Invalid input: cart id is invalid" },
        { status: 400 }
      );
    }
    const productIdNum = Number(productId);
    if (!Number.isInteger(productIdNum)) {
      return Response.json(
        { message: "Invalid input: product id is invalid" },
        { status: 400 }
      );
    }
    const quantityNum = Number(quantity);
    if (!Number.isInteger(quantityNum)) {
      return Response.json(
        { message: "Invalid input: id is invalid" },
        { status: 400 }
      );
    }
    
    return addPurchaseProducts(idNum, cartIdNum, productIdNum, quantityNum);
  }