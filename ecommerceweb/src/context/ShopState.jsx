import React, { createContext, useContext, useState } from "react";
import { useProduct } from "./ProductState";

export const shopContext = createContext(null);

function ShopState({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const { product } = useProduct()

    const addtoCart = (currProduct) => {
        setCartItems((prevProduct) => {
            const existProduct = prevProduct.find((item) => item._id === currProduct._id);
            if (existProduct) {
                return prevProduct.map((item) =>
                    item._id === currProduct._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevProduct, { ...currProduct, quantity: 1 }]
        })
    }

    const increaseQty = (productId) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }
    const decreaseQty = (productId) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    }
    const removeItem = (productId) => {
        setCartItems((prev) =>
            prev.filter((item) => !(item._id === productId))
        );
    }

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    ).toFixed(2);

    return (
        <shopContext.Provider
            value={{
                cartItems, setCartItems, addtoCart, increaseQty, decreaseQty, removeItem, subtotal,
            }}
        >
            {children}
        </shopContext.Provider>
    );
}

export default ShopState;

export const useShopState = () => useContext(shopContext);
