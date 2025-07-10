import SignInForm from "@/features/auth/components/signInForm";
import { auth } from "@/features/auth/services/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <SignInForm></SignInForm>
    </div>
  );
}
