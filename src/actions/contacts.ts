import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase"; 

export type Contact = {
  id_contacto_cliente: string;
  nombre_cliente: string;
  telefono_cliente: string;
  correo_cliente: string;
  mensaje_cliente: string;
  fecha_contacto: string;
};

export const contacts = {
    getContacts: defineAction({
        handler: async () => {
            try {
                const { data, error } = await supabase
                    .from('sgp_t_contacto_clientes')
                    .select('*')
                    .order('fecha_contacto', { ascending: false }); // Ordenar por fecha

                if (error) {
                    throw new ActionError({
                        code: 'BAD_REQUEST',
                        message: `No se pudieron obtener los mensajes: ${error.message}`,
                    });
                }

                return (data || []) as Contact[];
                
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
    }),

    insertContact: defineAction({
        input: z.object({
            nombre_cliente: z.string()
                .trim() // Trim antes de validar
                .min(3, 'El nombre debe tener al menos 3 caracteres')
                .max(100, 'El nombre es demasiado largo')
                .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
            
            telefono_cliente: z.string()
                .trim()
                .min(7, 'El teléfono debe tener al menos 7 dígitos')
                .max(15, 'El teléfono es demasiado largo')
                .regex(/^[0-9+\-\s()]+$/, 'El teléfono solo puede contener números y símbolos válidos'),
            
            correo_cliente: z.string()
                .trim()
                .toLowerCase()
                .email('Correo electrónico inválido')
                .min(5, 'El correo es demasiado corto')
                .max(100, 'El correo es demasiado largo'),
            
            mensaje_cliente: z.string()
                .trim()
                .min(10, 'El mensaje debe tener al menos 10 caracteres')
                .max(500, 'El mensaje es demasiado largo (máximo 500 caracteres)'),
        }),
        
        handler: async (input) => {
            try {
                // Los datos ya vienen validados y transformados por Zod
                const contactData = {
                    ...input,
                    fecha_contacto: new Date().toISOString(),
                };

                const { data, error } = await supabase
                    .from('sgp_t_contacto_clientes')
                    .insert([contactData])
                    .select()
                    .single();

                if (error) {
                    // Manejo específico de errores de Supabase
                    console.error('Supabase error:', error);
                    
                    // Errores comunes de Supabase
                    if (error.code === '23505') { // Violación de unique constraint
                        throw new ActionError({
                            code: 'CONFLICT',
                            message: 'Este contacto ya fue registrado',
                        });
                    }

                    if (error.code === '42501') { // Violación de RLS
                        throw new ActionError({
                            code: 'CONFLICT',
                            message: 'Error de RLS',
                        });
                    }
                    
                    if (error.code === '23503') { // Foreign key violation
                        throw new ActionError({
                            code: 'BAD_REQUEST',
                            message: 'Error de referencia en la base de datos',
                        });
                    }

                    throw new ActionError({
                        code: 'BAD_REQUEST',
                        message: `Error al guardar el mensaje: ${error.message}`,
                    });
                }

                if (!data) {
                    throw new ActionError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: 'No se pudo confirmar el registro del mensaje',
                    });
                }

                return {
                    success: true,
                    message: '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.',
                    contact: data as Contact
                };
                
            } catch (error) {
                if (error instanceof ActionError) {
                    throw error;
                }

                // Log del error para debugging
                console.error('Error inesperado en insertContact:', error);

                throw new ActionError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error instanceof Error 
                        ? error.message 
                        : 'Ocurrió un error inesperado al guardar el mensaje',
                });
            }
        }
    }),

    deleteContact: defineAction({
        input: z.object({
            id: z.string().uuid('ID inválido'),
        }),
        handler: async ({ id }) => {
            try {
                const { error } = await supabase
                    .from('sgp_t_contacto_clientes')
                    .delete()
                    .eq('id_contacto_cliente', id);

                if (error) {
                    throw new ActionError({
                        code: 'BAD_REQUEST',
                        message: `Error al eliminar el mensaje: ${error.message}`,
                    });
                }

                return {
                    success: true,
                    message: 'Mensaje eliminado exitosamente',
                };
            } catch (error) {
                if (error instanceof ActionError) {
                    throw error;
                }

                throw new ActionError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Error al eliminar el mensaje',
                });
            }
        }
    }),
};