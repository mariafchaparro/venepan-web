import { defineAction, ActionError } from "astro:actions";
import { supabase } from "../lib/supabase";
import { z } from "astro:content";

export type Category = {
  id_categorias: string;
  nombre_categoria: string;
  descripcion_categoria: string;
};

// Schema de validación para crear/editar categoria
const categoryInputSchema = z.object({
  nombre_categoria: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion_categoria: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
});

export const categories = {

  getCategories: defineAction({
    handler: async () => {
      try {
        const { data, error } = await supabase
          .from('sgp_m_categorias')
          .select('id_categorias, nombre_categoria, descripcion_categoria')
          .order('nombre_categoria');

        if (error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudieron obtener las categorías: ${error.message}`,
          });
        }

        if (!data || data.length === 0) {
          throw new ActionError({
            code: 'NOT_FOUND',
            message: 'No se encontraron categorías',
          });
        }

        return data as Category[];

      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al obtener las categorías',
        });
      }
    }
  }),

  getCategoryById: defineAction({
    input: z.object({
      id: z.string().uuid("ID de categoría inválido")
    }),

    handler: async (input) => {
      try {
        const { data, error } = await supabase
          .from('sgp_m_categorias')
          .select('id_categorias, nombre_categoria, descripcion_categoria')
          .eq('id_categorias', input.id)
          .single();

        if (error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudo obtener la categoría: ${error.message}`,
          });
        }

        if (!data) {
          throw new ActionError({
            code: 'NOT_FOUND',
            message: 'No se encontró la categoría',
          });
        }

        return data as Category;

      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al obtener la categoría',
        });
      }
    }
  }),

  createCategory: defineAction({
    input: categoryInputSchema,

    handler: async (input) => {
      try {
        const { data, error } = await supabase
          .from('sgp_m_categorias')
          .insert([input])
          .select()
          .single();

        if (error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudo crear la categoría: ${error.message}`,
          });
        }

        return data as Category;

      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al crear la categoría',
        });
      }
    }
  }),

  updateCategory: defineAction({
    input: categoryInputSchema.extend({
      id_categorias: z.string().uuid("ID de categoría inválido")
    }),

    handler: async (input) => {
      try {
        const { data, error } = await supabase
          .from('sgp_m_categorias')
          .update(input)
          .eq('id_categorias', input.id_categorias)
          .select()
          .single();

        if (error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudo actualizar la categoría: ${error.message}`,
          });
        }

        return data as Category;

      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al actualizar la categoría',
        });
      }
    }
  }),

  deleteCategory: defineAction({
    input: z.object({
      id_categorias: z.string().uuid("ID de categoría inválido")
    }),

    handler: async (input) => {
      try {
        const { error } = await supabase
          .from('sgp_m_categorias')
          .delete()
          .eq('id_categorias', input.id_categorias);

        if (error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudo eliminar la categoría: ${error.message}`,
          });
        }

        return { success: true };

      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al eliminar la categoría',
        });
      }
    }
  }),
};
