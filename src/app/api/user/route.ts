import { addUser } from "@features/user/services/crud"

export async function POST(req: Request) {
  return addUser(req);
}