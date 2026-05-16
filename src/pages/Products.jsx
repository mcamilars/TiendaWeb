import products from '../data/products'
import CardProduct from '../components/CardProduct'

export default function Products() {
    return (
        <div className="products-container">
            <ul className="products-list">
                {products.map((item) => (
                    <li key={item.id}>
                        <CardProduct item={item} />
                    </li>
                ))}
            </ul>
        </div>
    )
}