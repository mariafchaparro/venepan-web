import { products } from "./products"

export const server = {
    products,
}
  
  
// Action para obtener productos por categoría (opcional)
//   getProductosByCategoria: defineAction({
//     input: z.object({
//       categoria: z.string()
//     }),
//     handler: async ({ categoria }) => {
//       try {
//         const { data: productos, error } = await supabase
//           .from('sgp_m_productos')
//           .select('*')
//           .eq('categoria', categoria);
        
//         if (error) {
//           throw new Error(`Error al obtener productos: ${error.message}`);
//         }
        
//         return {
//           success: true,
//           data: productos
//         };
//       } catch (error) {
//         console.error('Error en getProductosByCategoria:', error);
//         return {
//           success: false,
//           error: error instanceof Error ? error.message : 'Error desconocido',
//           data: null
//         };
//       }
//     }
//   })
