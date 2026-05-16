import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './pages/Layout'
import Cart from './pages/Cart'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}

export default App