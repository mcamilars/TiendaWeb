import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

function TabBarIcon({ icon, badge }) {
    return (
        <span className="tab-icon-wrapper">
            <span className="tab-icon-text">{icon}</span>
            {badge > 0 && (
                <span className="tab-badge">{badge}</span>
            )}
        </span>
    )
}

function TabsLayout({ children }) {
    const { getItemCount } = useCart()
    const itemCount = getItemCount()

    return (
        <div className="app-container">
            <nav className="tab-bar">
                <Link to="/products" className="tab-link">
                    <span className="tab-content">
                        <TabBarIcon icon="📦" badge={0} />
                        <span className="tab-label">Products</span>
                    </span>
                </Link>
                <Link to="/" className="tab-link">
                    <span className="tab-content">
                        <TabBarIcon icon="🛒" badge={itemCount} />
                        <span className="tab-label">Cart</span>
                    </span>
                </Link>
            </nav>
            <main className="content">{children}</main>
        </div>
    )
}

export default function Layout({ children }) {
    return <TabsLayout>{children}</TabsLayout>
}