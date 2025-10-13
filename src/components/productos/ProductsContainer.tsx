import { useState, useEffect } from 'preact/hooks';
import ProductModal from './ProductModal';
import type { Product } from '../../actions/products';

interface ProductsContainerProps {
  products: Product[];
}

export default function ProductsContainer({ products }: ProductsContainerProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Escuchar clics en los botones "Ver detalle"
    const handleProductClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const button = target.closest('.secondary-btn');
      
      if (button) {
        const productId = button.getAttribute('data-product-id');
        const product = products.find(p => p.id_producto === productId);
        
        if (product) {
          setSelectedProduct(product);
          setIsModalOpen(true);
        }
      }
    };

    document.addEventListener('click', handleProductClick);

    return () => {
      document.removeEventListener('click', handleProductClick);
    };
  }, [products]);

  const closeModal = () => {
    setIsModalOpen(false);
    // Pequeño delay antes de limpiar el producto para la animación
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <ProductModal
      product={selectedProduct}
      isOpen={isModalOpen}
      onClose={closeModal}
    />
  );
}
