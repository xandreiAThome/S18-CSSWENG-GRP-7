import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/features/auth/services/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signIn");
  }

  return (
    <div className="flex justify-center mt-15">
      <div className="mx-7 mt-3">
        <div className="font-bold">
          Hello, {session && session.user?.name ? session.user.name : "Guest"}!
        </div>
        <div className="my-5">
          <button type="button" className="font-semibold">
            {" "}
            Manage Account
          </button>
          <ul className="ml-3 mt-2 font-light text-xs text-gray-500">
            <li>
              <button type="button">Profile</button>
            </li>
            <li>
              <button type="button">Address Book</button>
            </li>
            <li>
              <button type="button">Payment Options</button>
            </li>
            <li>
              <button type="button">Rewards</button>
            </li>
          </ul>
        </div>
        <div>
          <button type="button" className="font-semibold">
            {" "}
            My Orders{" "}
          </button>
          <ul className="ml-3 mt-2 font-light text-xs text-gray-500">
            <li>
              <button type="button">Returns</button>
            </li>
            <li>
              <button type="button">Cancellations</button>
            </li>
            <li>
              <button type="button">Reviews</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-col m-2.5">
        <div className="flex gap-5">
          <div>
            <Card className="flex h-full w-75">
              <CardHeader className="flex items-baseline mt-2">
                <CardTitle className="whitespace-nowrap">
                  Personal Details
                </CardTitle>
                <button
                  type="button"
                  className="text-xs text-gray-400 hover:text-blue-700"
                >
                  EDIT
                </button>
              </CardHeader>
              <CardContent className="mt-3">
                Name
                <br />
                Contact Number
                <br />
                Email
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
          <div className="flex">
            <Card className="h-full w-150">
              <CardHeader className="flex items-baseline mt-2">
                <CardTitle>Address Book</CardTitle>
                <button
                  type="button"
                  className="text-xs text-gray-400 hover:text-blue-700"
                >
                  EDIT
                </button>
              </CardHeader>
              <div className="flex space-x-8 mt-4">
                <div className="flex-1">
                  <CardDescription className="font-medium mt-[-13] mb-3 ml-6">
                    DEFAULT SHIPPING ADDRESS
                  </CardDescription>
                  <CardContent>
                    <div className="my-1 font-bold text-lg">Name</div>
                    Address 1 <br />
                    Province, City, Barangay <br />
                    Contact Number
                  </CardContent>
                </div>
                <div className="w-[2px] rounded-sm bg-gray-200"></div>
                <div className="flex-1">
                  <CardDescription className="font-medium mt-[-13] mb-3 ml-6">
                    DEFAULT BILLING ADDRESS
                  </CardDescription>
                  <CardContent>
                    <div className="my-1 font-bold text-lg">Name</div>
                    Address 1 <br />
                    Province, City, Barangay <br />
                    Contact Number
                  </CardContent>
                </div>
              </div>
              <CardFooter className="mt-[-5]"></CardFooter>
            </Card>
          </div>
        </div>
        <div className="mt-5">
          <Card className="flex ">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardDescription className="flex justify-start mt-[-10] text-md font-semibold">
              <div className="ml-6.5">Order No.</div>
              <div className="mx-25">Placed On</div>
              <div className="mx-35">Item/s</div>
              <div className="ml-15">Total</div>
            </CardDescription>
            <div className="h-[4px] w-220 ml-5.5 -mt-5 rounded-xs bg-gray-200"></div>
            <CardContent className="grid-rows-3 grid-cols-5"></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
