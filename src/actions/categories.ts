import { defineAction, ActionError } from "astro:actions";
import { supabase } from "../lib/supabase";

export type Category = {
  id_categorias: string;
  nombre_categoria: string;
};

export const categories = {

  getCategories: defineAction({
    handler: async () => {
      try {
        const { data, error } = await supabase
          .from('sgp_m_categorias')
          .select('id_categorias, nombre_categoria')
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

};
