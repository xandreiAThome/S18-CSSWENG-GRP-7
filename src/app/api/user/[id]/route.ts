import { deleteUser, getUser } from "@features/user/services/crud";

export async function GET(req: Request, params: { params: { id: string } }) {
  return getUser(req, params);
}

export async function DELETE(req: Request, params: { params: { id: string } }) {
  return deleteUser(req, params);
}
