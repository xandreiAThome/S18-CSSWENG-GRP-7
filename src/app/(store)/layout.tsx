import { Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <nav className="flex justify-between p-4 items-center bg-black text-white">
        <div className="flex gap-4 flex-1">
          <button>
            <Menu className="size-8" />
          </button>
          <button>
            <Search className="size-8" />
          </button>
        </div>
        <h1 className="text-3xl flex-1 text-center">LOGO</h1>
        <div className="flex gap-8 flex-1 justify-end">
          <button>
            <UserRound className="size-8" />
          </button>

          <button>
            <ShoppingCart className="size-8" />
          </button>
          <button>
            <Heart className="size-8" />
          </button>
        </div>
      </nav>
      {children}
    </div>
  );
}