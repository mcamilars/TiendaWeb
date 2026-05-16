import { useCart } from '../context/CartContext'

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, getTotal } = useCart()
    const total = getTotal()

    if (cartItems.length === 0) {
        return (
            <div className="cart-container">
                <p className="cart-empty">Your cart is empty</p>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <ul className="cart-list">
                {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                        <img src={item.images[0]} alt={item.title} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3 className="cart-item-title">{item.title}</h3>
                            <p className="cart-item-price">${item.price}</p>
                            <p className="cart-item-subtotal">
                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                        <div className="quantity-controls">
                            <button
                                className="quantity-button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                -
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                                className="quantity-button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                +
                            </button>
                        </div>
                        <button
                            className="remove-button"
                            onClick={() => removeFromCart(item.id)}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
            <div className="cart-total-container">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total">${total.toFixed(2)}</span>
            </div>
        </div>
    )
}