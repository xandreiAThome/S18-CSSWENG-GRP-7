import { addCategory } from "@features/category/services/crud";

export async function POST(req: Request) {
  const { id, name } = await req.json();

  // Basic Validaton
  if (!id || !name) {
    return Response.json(
      { message: "Invalid input: Payload field/s missing" },
      { status: 400 }
    );
  }
  if (typeof name !== "string") {
    return Response.json(
      { message: "Invalid input: name and sku must be strings" },
      { status: 400 }
    );
  } else if (name.length > 100) {
    return Response.json(
      { message: "Invalid input: name is too long" },
      { status: 400 }
    );
  }
  return addCategory(id, name);
}