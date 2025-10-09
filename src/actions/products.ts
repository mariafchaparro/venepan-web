import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase"; 

export type Product = {
  id_producto: string;
  nombre_producto: string;
  peso_producto: number;
  descripcion_producto: string
  imagen_producto: string;
  id_categoria: string;
};

export const products = {

    getProducts: defineAction({
      input: z.object({
        category: z.string().optional()
      }).optional(),
  
      handler: async (input) => {
        try {
          // Construir query base
          let query = supabase
            .from('sgp_m_productos')
            .select('*');
          
          // Aplicar filtro de categoría si se proporciona
          if (input?.category) {
            query = query.eq('id_categoria', input.category);
          }
          
          // Ejecutar la consulta
          const { data, error } = await query;
          
          // Manejo de errores de Supabase
          if (error) {
            // Lanzar ActionError para errores del cliente
            throw new ActionError({
              code: 'BAD_REQUEST',
              message: `No se pudieron obtener los productos: ${error.message}`,
            });
          }
          
          // Validar que hay datos
          if (!data) {
            throw new ActionError({
              code: 'NOT_FOUND',
              message: 'No se encontraron productos',
            });
          }
          
          // Retornar los datos exitosamente
          return data as Product[];
          
        } catch (error) {
          // Si ya es un ActionError, relanzarlo
          if (error instanceof ActionError) {
            throw error;
          }
          
          // Para otros errores, crear un ActionError genérico
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error instanceof Error 
              ? error.message 
              : 'Ocurrió un error inesperado al obtener los productos',
          });
        }
      }
    }),
    
    getProductoByName: defineAction({
      input: z.object({
        name: z.string()
      }),
      
      handler: async ({ name }) => {
        try {
          const { data, error } = await supabase
            .from('sgp_m_productos')
            .select('*')
            .eq('nombre_producto', name)
            .single();
          
          if (error) {
            if (error.code === 'PGRST116') {
              throw new ActionError({
                code: 'NOT_FOUND',
                message: `Producto con nombre ${name} no encontrado`,
              });
            }
            
            throw new ActionError({
              code: 'BAD_REQUEST',
              message: error.message,
            });
          }
          
          return data as Product;
          
        } catch (error) {
          if (error instanceof ActionError) {
            throw error;
          }
          
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Error al obtener el producto',
          });
        }
      }
    }),
    
};
