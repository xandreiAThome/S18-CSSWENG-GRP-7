import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "@/features/auth/components/signInForm";
import { auth } from "@/features/auth/services/auth";
import { redirect } from "next/navigation";

export default async function SignInCard() {
  const session = await auth();

  if (session?.user) {
    redirect("/productListing");
  }
  return (
    <div className="flex items-center justify-center content-center h-screen mt-[-110]">
      <Card className="w-1/5 bg-gray-200">
        <CardHeader className="flex flex-col items-center relative">
          <CardAction>
            <button className="absolute right-4" type="button">
              <img src="/close.svg" className="w-4 h-4" alt="Close Button" />
            </button>
          </CardAction>
          <br />
          <CardTitle className="text-2xl">Log In</CardTitle>
          <CardDescription className="text-md">
            Start shopping and collecting points
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <SignInForm></SignInForm>
        </CardContent>
      </Card>
    </div>
  );
}
