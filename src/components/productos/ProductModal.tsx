import { useEffect } from 'preact/hooks';
import type { Product } from '../../actions/products';

interface Beneficio {
  id_beneficio: string;
  beneficio: string;
  id_producto: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  // beneficios: Beneficio[];
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
        class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Botón cerrar - X en la esquina */}
        <button
        onClick={onClose}
        class="absolute top-5 right-4 z-10 cursor-pointer"
        aria-label="Cerrar modal"
        >
          <img src="/icons/x.svg" alt="Cerrar" loading={'eager'}/>
        </button>
       
        {/* Content */}
        <div class="p-8">
          <div class="flex flex-col md:flex-row gap-8 md:gap-12">
            
            {/* Columna Izquierda - Imagen */}
            <section class="md:w-1/2 flex flex-col items-center p-4 justify-center md:bg-light-gray-2/70">
              <img
                src={product.imagen_producto}
                alt={product.nombre_producto}
                class="h-60 w-auto object-contain md:h-80"
              />
            </section>

            {/* Columna Derecha - Información */}
            <section class="md:w-1/2 flex flex-col">
              <div class="mb-4">
                <h2 class="text-3xl md:section-title md:text-4xl font-bold text-gray-900 mb-1">
                  {product.nombre_producto}
                </h2>
                <p class="text-xl text-gray-600 font-medium">
                  {product.peso_producto}g
                </p>
              </div>

              <div class="mb-6">
                <p class="text-gray-700 leading-relaxed">
                  {product.descripcion_producto || 'Descripción del producto.'}
                </p>
              </div>

              {/* Beneficios */}
              {/* {beneficios.length > 0 && (
                <div class="space-y-3">
                  {beneficios.map((beneficio) => (
                    <div key={beneficio.id_beneficio} class="flex items-start gap-3">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 mt-0.5"></div>
                      <p class="text-gray-800 leading-relaxed flex-1">
                        {beneficio.beneficio}
                      </p>
                    </div>
                  ))}
                </div>
              )} */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}