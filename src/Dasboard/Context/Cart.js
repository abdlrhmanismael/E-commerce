import React, { createContext, useState, useEffect } from "react";

// Create Context
export const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
    const [cartitems, setCart] = useState([]);

    return (
        <CartContext.Provider value={{ cartitems, setCart }}>
            {children}
        </CartContext.Provider>
    );
};
