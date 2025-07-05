  import { addProduct} from "@features/product/services/crud";
  

  /**
   * POST api/product
   * 
   * Adds a product with fields matching `req`'s payload
   * @param {Request} req Incoming request containing the following:
   * - `id`: The id of the product
   * - `name`: The name of the product
   * - `sku`: The Stock Keeping Unit
   * - `category_id`: The category_id of the product's category
   * 
   * Response: 
   * - 200 OK: Successfully Added
   * - 400 Bad Request: If input fields is/are invalid
   * - 500 Not Found: If user cannot be created
   */
  export async function POST(req: Request) {
    const { id, name, sku, category_id } = await req.json();

    if (!id || !name || !sku || !category_id) {
      return Response.json(
        { message: "Invalid input: Payload field/s missing" },
        { status: 400 }
      );
    }
    const categoryNum = Number(category_id);
    if (!Number.isInteger(categoryNum)) {
      return Response.json(
        { message: "Invalid input: category_id is invalid" },
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
    if (typeof name !== "string" || typeof sku !== "string") {
      return Response.json(
        { message: "Invalid input: name and sku must be strings" },
        { status: 400 }
      );
    } else if (name.length > 100) {
      return Response.json(
        { message: "Invalid input: name is too long" },
        { status: 400 }
      );
    } else if (sku.length > 50) {
      return Response.json(
        { message: "Invalid input: sku is too long" },
        { status: 400 }
      );
    }
    return addProduct(idNum, name, sku, categoryNum);
  }