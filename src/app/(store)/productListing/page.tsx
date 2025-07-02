import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/features/products/components/productCard";

const dummyProducts = [
  { name: "Wireless Headphones", price: 199 },
  { name: "Smartphone", price: 899 },
  { name: "Laptop", price: 1299 },
  { name: "Coffee Maker", price: 89 },
  { name: "Gaming Chair", price: 349 },
  { name: "Bluetooth Speaker", price: 79 },
  { name: "Fitness Tracker", price: 129 },
  { name: "Tablet", price: 549 },
  { name: "Desk Lamp", price: 45 },
  { name: "Backpack", price: 65 },
  { name: "Water Bottle", price: 25 },
  { name: "Keyboard", price: 159 },
];

export default function ProductListing() {
  return (
    <div>
      <h1 className="text-center bg-black text-white text-3xl p-4">
        SPECIFIC CATEGORY
      </h1>

      <main className="p-6">
        <Select>
          <SelectTrigger className="w-[180px] border-black lg:ml-24 ml-0">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8 gap-4 max-w-fit">
            {dummyProducts.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
