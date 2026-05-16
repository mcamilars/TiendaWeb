import { useParams } from 'react-router-dom'
import products from '../data/products'

export default function ProductDetail() {
    const { id } = useParams()
    const product = products.find((p) => String(p.id) === String(id)) || {}

    return (
        <div className="product-detail-container">
            <div className="product-detail-card">
                <img src={product.images?.[0]} alt={product.title} className="product-detail-image" />
                <div className="product-detail-content">
                    <p className="product-detail-price">${product.price}</p>
                    <h1 className="product-detail-title">{product.title}</h1>
                    <p className="product-detail-description">{product.description}</p>
                </div>
            </div>
            <div className="product-reviews">
                {product.reviews?.map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="review-header">
                            <span className="review-name">{review.reviewerName}</span>
                            <span className="review-rating">{review.rating}</span>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}