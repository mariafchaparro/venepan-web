import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase";

export type Message = {
  id_contacto_cliente: string;
  nombre_cliente: string;
  telefono_cliente: string;
  correo_cliente: string;
  mensaje_cliente: string;
  fecha_contacto: string;
};

export const messages = {
    getMessages: defineAction({
      handler: async () => {
        try {
          const { data, error } = await supabase
            .from('sgp_t_contacto_clientes')
            .select('*')
            .order('id_contacto_cliente', { ascending: false });

          if (error) {
            throw new ActionError({
              code: 'BAD_REQUEST',
              message: `No se pudieron obtener los mensajes: ${error.message}`,
            });
          }

          return data as Message[];

        } catch (error) {
          if (error instanceof ActionError) {
            throw error;
          }

          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error instanceof Error 
              ? error.message 
              : 'Ocurrió un error inesperado al obtener los mensajes',
          });
        }
      }
    })
}
