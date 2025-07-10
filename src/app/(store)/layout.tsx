import { Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { auth, signOut } from "@/features/auth/services/auth";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <div>
      <nav className="flex justify-between p-4 items-center bg-black text-white">
        <div className="flex gap-4 flex-1">
          <Sheet>
            <SheetTrigger>
              <Menu className="size-8" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-2xl">Menu</SheetTitle>
                <div className="ml-4 mt-4">
                  <Link href={"/productListing"} className="text-lg">
                    Products
                  </Link>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <button>
            <Search className="size-8" />
          </button>
        </div>
        <h1 className="text-3xl flex-1 text-center">LOGO</h1>
        <div className="flex gap-8 flex-1 justify-end items-center">
          {session?.user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserRound className="size-8" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/profile"}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/ordersOverview"}>Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form
                      action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/signIn" });
                      }}
                    >
                      <button type="submit" className="w-full text-left">
                        Log Out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href={"/shoppingCart"}>
                <ShoppingCart className="size-8" />
              </Link>
            </>
          ) : (
            <Link href={"/signIn"}>Sign In</Link>
          )}
          <button>
            <Heart className="size-8" />
          </button>
        </div>
      </nav>
      {children}
    </div>
  );
}
