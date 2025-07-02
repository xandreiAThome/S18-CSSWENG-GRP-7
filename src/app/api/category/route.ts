import { addCategory } from "@features/category/services/crud";

export async function POST(req: Request) {
  let data: any;
  try {
    data = await req.json();
  } catch (err) {
    return Response.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const {id, name} = data;

  // Basic Validaton
  if (!id || !name) {
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