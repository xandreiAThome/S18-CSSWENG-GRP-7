'use client'

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CartEntryProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
  onCheckToggle: (id: number) => void;
  onQuantityChange: (id: number, change: number) => void;
  onRemove: (id: number) => void;
}

export default function CartEntry({
  id,
  name,
  price,
  quantity,
  checked,
  onCheckToggle,
  onQuantityChange,
  onRemove
}: CartEntryProps) {
  return (
    <div className="grid grid-cols-12 items-center py-4 border-b last:border-none">
      <div className="col-span-1 flex justify-center">
        <Checkbox checked={checked} onCheckedChange={() => onCheckToggle(id)} />
      </div>

      <div className="col-span-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-300 rounded" />
        <div>
          <h4 className="text-base font-bold">{name}</h4>
          <h5 className="text-sm text-gray-500">₱{price.toLocaleString()}</h5>
        </div>
      </div>

      <div className="col-span-2 flex justify-center items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => onQuantityChange(id, -1)}>
          -
        </Button>
        <span>{quantity}</span>
        <Button variant="outline" size="sm" onClick={() => onQuantityChange(id, 1)}>
          +
        </Button>
      </div>

      <div className="col-span-3 flex justify-end items-center space-x-3 pr-2">
        <span className="font-semibold">₱{(price * quantity).toLocaleString()}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}