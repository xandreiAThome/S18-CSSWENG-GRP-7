import { signIn } from "@/features/auth/services/auth";

export default function SignInForm() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
