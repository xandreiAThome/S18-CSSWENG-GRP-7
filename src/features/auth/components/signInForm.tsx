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
        <button type="submit" className="font-inter">
          Sign In
        </button>
      </form>
    </div>
  );
}
