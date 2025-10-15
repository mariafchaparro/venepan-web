import { useEffect } from 'preact/hooks';
import type { Product, Benefit } from '../../actions/products';
import { inferRemoteSize } from 'astro:assets';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 bg-opacity-50"
      onClick={onClose}
    >
      <div
        class="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full md:h-[500px] max-h-[90vh] overflow-y-auto relative"
        
      >
        
        <button
        onClick={onClose}
        class="absolute top-5 right-4 z-10 cursor-pointer"
        aria-label="Cerrar modal"
        >
          <img src="/icons/x.svg" alt="Cerrar" loading={'eager'}/>
        </button>
      
        {/*  */}
        <div class="flex flex-col h-full md:flex-row gap-8 md:gap-12">   
          {/* Columna Izquierda - Imagen */}
          <section class="flex flex-col items-center p-2 justify-center md:bg-light-gray-2/70 md:w-1/2 md:h-auto">
            <img
              src={product.imagen_producto}
              alt={product.nombre_producto}
              class="h-64 w-auto object-contain md:h-80"
            />
          </section>

          {/* Columna Derecha - Información */}
          <section class="md:w-1/2 flex flex-col">
            <div class="mb-4">
              <h2 class="text-3xl md:section-title font-bold text-gray-800 mb-1">
                {product.nombre_producto}
              </h2>
              <p class="text-lg text-gray-600 font-medium">
                {product.peso_producto}g
              </p>
            </div>

            <div class="mb-6">
              <p class="text-gray-800 leading-relaxed">
                {product.descripcion_producto || 'Descripción del producto.'}
              </p>
            </div>


            {/* Beneficios asociados al producto */}
            {product.sgp_m_beneficios && product.sgp_m_beneficios.length > 0 && (
              <div class="mb-2">
                <ul class="space-y-2">
                  {product.sgp_m_beneficios.map((benefit: Benefit) => (
                    <li key={benefit.id_beneficios} class={"text-gray-800 flex items-center gap-2"}>
                      <div class={"min-w-2.5 min-h-2.5 rounded-full bg-green-600"}></div>
                      {benefit.descripcion_beneficio}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}