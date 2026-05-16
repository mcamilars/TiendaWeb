import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CardProduct({ item }) {
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const handleAddToCart = () => {
        addToCart(item)
        navigate('/')
    }

    return (
        <div className="product-card">
            <img src={item.images[0]} alt={item.title} className="product-card-image" />
            <p className="product-card-price">${item.price}</p>
            <h3 className="product-card-title">{item.title}</h3>
            <p className="product-card-description">{item.description}</p>
            <button className="add-button" onClick={handleAddToCart}>
                Agregar al carrito
            </button>
        </div>
    )
}