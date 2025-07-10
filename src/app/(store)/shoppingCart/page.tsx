'use client'

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import CartEntry from '@/features/cart/components/cartEntry';
import ProductCard from '@/features/products/components/productCard';

const initialCart = [
    { id: 1, name: 'Wireless Headphones', price: 199, quantity: 1 },
    { id: 2, name: 'Smartphone', price: 899, quantity: 1 },
    { id: 3, name: 'Laptop', price: 1299, quantity: 2 },
    { id: 4, name: 'Coffee Maker', price: 89, quantity: 4 }
];

const suggestedItems = [
    { id: 5, name: 'Bluetooth Speaker', price: 149 },
    { id: 6, name: 'Smartwatch', price: 249 },
    { id: 7, name: 'Tablet', price: 499 },
    { id: 8, name: 'Camera', price: 799 }
];

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState(initialCart);
    const [selectedIds, setSelectedIds] = useState<number[]>(
        initialCart.map(item => item.id)
    );

    const allSelected = selectedIds.length === cartItems.length;

    const toggleSelect = (id: number) => {
        setSelectedIds(ids =>
            ids.includes(id)
            ? ids.filter(existingId => existingId !== id)
            : [...ids, id]
        );
    };

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(cartItems.map(item => item.id));
        }
    };

    const updateQuantity = (id: number, change: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
        setSelectedIds(ids => ids.filter(existingId => existingId !== id));
    };

    const selectedItems = useMemo(
        () => cartItems.filter(item => selectedIds.includes(item.id)),
        [cartItems, selectedIds]
    );

    const subtotal = useMemo(
        () =>
        selectedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ),
        [selectedItems]
    );

    const shippingFee = 0;
    const total = subtotal + shippingFee;

    return (
        <div className="p-8 space-y-10">
            <h1 className="text-4xl font-bold">My Cart</h1>

                <div className="flex flex-col lg:flex-row items-start gap-6">
                    {/* Cart Items */}
                    <div className="flex-1 bg-gray-100 rounded shadow p-4">
                        <div className="grid grid-cols-12 gap-4 font-semibold text-gray-600 pb-2 border-b items-center">
                        <div className="col-span-1 flex justify-center">
                            <Checkbox
                                checked={allSelected}
                                onCheckedChange={toggleSelectAll}
                            />
                        </div>
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                    </div>

                    <div className="divide-y">
                        {cartItems.map(item => (
                            <CartEntry
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                checked={selectedIds.includes(item.id)}
                                onCheckToggle={toggleSelect}
                                onQuantityChange={updateQuantity}
                                onRemove={removeItem}
                            />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3 max-h-[500px] overflow-y-auto bg-gray-100 rounded shadow p-4 space-y-4 sticky top-28 self-start">
                        <h2 className="text-xl font-bold">Order Summary</h2>

                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal ({selectedItems.length} items)</span>
                            <span>₱{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-gray-700">
                            <span>Shipping fee</span>
                            <span>₱{shippingFee.toLocaleString()}</span>
                        </div>

                        <hr />

                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₱{total.toLocaleString()}</span>
                        </div>

                        <textarea
                            placeholder="Order Instructions"
                            className="w-full h-20 p-2 rounded border resize-none"
                        />

                        <Button
                            className="w-full bg-gray-600 text-white hover:bg-gray-700"
                            disabled={selectedItems.length === 0}
                        >
                        Checkout
                        </Button>
                        </div>
                    </div>

                    {/* Suggested Items */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Suggested</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {suggestedItems.map(item => (
                                <ProductCard
                                    key={item.id}
                                    name={item.name}
                                    price={item.price}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
}
