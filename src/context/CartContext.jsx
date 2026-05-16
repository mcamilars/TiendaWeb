import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadCart()
    }, [])

    useEffect(() => {
        if (!isLoading) {
            saveCart()
        }
    }, [cartItems, isLoading])

    const loadCart = () => {
        try {
            const stored = localStorage.getItem('cart')
            if (stored) {
                setCartItems(JSON.parse(stored))
            }
        } catch (error) {
            console.warn('localStorage not available, starting with empty cart')
        } finally {
            setIsLoading(false)
        }
    }

    const saveCart = () => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems))
        } catch (error) {
            console.warn('Could not save cart to storage')
        }
    }

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId))
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getTotal = () => {
        return cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )
    }

    const getItemCount = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0)
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotal,
                getItemCount,
            }}>
            {children}
        </CartContext.Provider>
    )
}