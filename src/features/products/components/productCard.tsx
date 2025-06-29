interface ProductCardProps {
  name: string;
  price: number;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="flex flex-col w-fit">
      <div className="size-80 bg-gray-300"></div>
      <h4 className="text-lg font-bold text-center">{props.name}</h4>
      <h3 className="text-gray-500 text-center">₱{props.price}</h3>
    </div>
  );
}
