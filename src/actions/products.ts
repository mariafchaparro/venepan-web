import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase"; 

export type Benefit = {
  id_beneficios: string;
  descripcion_beneficio: string;
};

export type Category = {
  id_categorias: string;
  nombre_categoria: string;
};

export type Product = {
  id_producto: string;
  nombre_producto: string;
  peso_producto: number;
  descripcion_producto: string
  imagen_producto: string;
  id_categoria: string;
  sgp_m_beneficios: Benefit[];
  sgp_m_categorias: Category;
};

// Schema de validación para crear/editar producto
const productInputSchema = z.object({
  nombre_producto: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  peso_producto: z.number().positive("El peso debe ser mayor a 0"),
  descripcion_producto: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  beneficios: z.string().min(5, "Ingresa al menos un beneficio"),
  id_categoria: z.string().uuid("Selecciona una categoría válida"),
  imagen_producto: z.string().url("URL de imagen inválida")
});

// Función auxiliar para subir imagen a Supabase Storage
async function uploadImageToStorage(base64Data: string, fileName: string): Promise<string> {
  // Extraer el tipo MIME y los datos base64
  const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Formato de imagen inválido');
  }

  const mimeType = matches[1];
  const base64 = matches[2];
  
  // Convertir base64 a Uint8Array
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Determinar extensión
  const extension = mimeType.split('/')[1] || 'png';
  const uniqueFileName = `${fileName}-${Date.now()}.${extension}`;

  // Subir a Supabase Storage
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(uniqueFileName, bytes, {
      contentType: mimeType,
      upsert: false
    });

  if (error) {
    throw new Error(`Error al subir imagen: ${error.message}`);
  }

  // Obtener URL pública
  const { data: publicUrlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

// Función auxiliar para borrar imagen de Supabase Storage
async function deleteImageFromStorage(imageUrl: string) {
  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    // Asumiendo que la URL es tipo: .../storage/v1/object/public/bucket-name/folder/filename
    // El path real dentro del bucket es lo que está después del nombre del bucket
    // Ejemplo: /storage/v1/object/public/product-images/nombre-imagen.png
    const fileName = pathParts[pathParts.length - 1]; // Tomamos solo el nombre del archivo

    if (!fileName) return;

    const { error } = await supabase.storage
      .from('product-images')
      .remove([fileName]);

    if (error) {
      console.error('Error borrando imagen antigua:', error);
    }
  } catch (error) {
    console.error('Error parseando URL de imagen para borrar:', error);
  }
}

export const products = {

  uploadProductImage: defineAction({
    input: z.object({
      imageData: z.string().min(1, "Datos de imagen requeridos"),
      productName: z.string().min(1, "Nombre del producto requerido")
    }),

    handler: async (input) => {
      try {
        const sanitizedName = input.productName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .substring(0, 50);

        const publicUrl = await uploadImageToStorage(input.imageData, sanitizedName);

        return { success: true, url: publicUrl };

      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al subir la imagen',
        });
      }
    }
  }),


  getProducts: defineAction({
    input: z.object({
      category: z.string().optional()
    }).optional(),

    handler: async (input) => {
      try {
        let query = supabase
          .from('sgp_m_productos')
          .select('*, sgp_m_beneficios(*), sgp_m_categorias(id_categorias, nombre_categoria)')
          .order('nombre_producto', { ascending: true }); // Ordenar alfabéticamente
        
        if (input?.category) {
          query = query.eq('id_categoria', input.category);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudieron obtener los productos: ${error.message}`,
          });
        }
        
        return data as Product[] || [];
        
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }
        
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error 
            ? error.message 
            : 'Ocurrió un error inesperado al obtener los productos',
        });
      }
    }
  }),

  getProductById: defineAction({
    input: z.object({
      id: z.string().uuid("ID de producto inválido")
    }),

    handler: async (input) => {
      try {
        const { data, error } = await supabase
          .from('sgp_m_productos')
          .select('*, sgp_m_beneficios(*), sgp_m_categorias(id_categorias, nombre_categoria)')
          .eq('id_producto', input.id)
          .single();

        if (error) {
          throw new ActionError({
            code: 'NOT_FOUND',
            message: `Producto no encontrado: ${error.message}`,
          });
        }

        return data as Product;

      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al obtener el producto',
        });
      }
    }
  }),

  createProduct: defineAction({
    input: productInputSchema,

    handler: async (input) => {
      try {
        // 1. Insertar el producto
        const { data: productData, error: productError } = await supabase
          .from('sgp_m_productos')
          .insert({
            nombre_producto: input.nombre_producto,
            peso_producto: input.peso_producto,
            descripcion_producto: input.descripcion_producto,
            imagen_producto: input.imagen_producto,
            id_categoria: input.id_categoria,
          })
          .select('id_producto')
          .single();

        if (productError) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudo crear el producto: ${productError.message}`,
          });
        }

        // 2. Procesar y crear los beneficios
        const beneficiosArray = input.beneficios.split(',').map(b => b.trim()).filter(b => b.length > 0);
        
        if (beneficiosArray.length > 0) {
          const beneficiosToInsert = beneficiosArray.map(beneficio => ({
            id_producto: productData.id_producto,
            descripcion_beneficio: beneficio,
          }));

          const { error: beneficiosError } = await supabase
            .from('sgp_m_beneficios')
            .insert(beneficiosToInsert);

          if (beneficiosError) {
            await supabase.from('sgp_m_productos').delete().eq('id_producto', productData.id_producto);
            throw new ActionError({
              code: 'BAD_REQUEST',
              message: `No se pudieron crear los beneficios: ${beneficiosError.message}`,
            });
          }
        }

        return { success: true, id: productData.id_producto };

      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al crear el producto',
        });
      }
    }
  }),

  updateProduct: defineAction({
    input: productInputSchema.extend({
      id_producto: z.string().uuid("ID de producto inválido")
    }),

    handler: async (input) => {
      try {
        // 1. Obtener imagen actual para comparar y borrar si es necesario
        const { data: currentProduct } = await supabase
          .from('sgp_m_productos')
          .select('imagen_producto')
          .eq('id_producto', input.id_producto)
          .single();

        // Si la imagen cambió y no es un placeholder, intentar borrar la anterior
        if (currentProduct && 
            currentProduct.imagen_producto !== input.imagen_producto && 
            !currentProduct.imagen_producto.includes('placehold.co')) {
          await deleteImageFromStorage(currentProduct.imagen_producto);
        }

        // 2. Actualizar el producto
        const { error: productError } = await supabase
          .from('sgp_m_productos')
          .update({
            nombre_producto: input.nombre_producto,
            peso_producto: input.peso_producto,
            descripcion_producto: input.descripcion_producto,
            imagen_producto: input.imagen_producto,
            id_categoria: input.id_categoria,
          })
          .eq('id_producto', input.id_producto);

        if (productError) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudo actualizar el producto: ${productError.message}`,
          });
        }

        // 3. Actualizar beneficios: La estrategia más segura es borrar TODOS y re-insertar
        // Primero borramos
        const { error: deleteError } = await supabase
          .from('sgp_m_beneficios')
          .delete()
          .eq('id_producto', input.id_producto);

        if (deleteError) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `Error al limpiar beneficios anteriores: ${deleteError.message}`,
          });
        }

        // Luego insertamos los nuevos
        const beneficiosArray = input.beneficios.split(',').map(b => b.trim()).filter(b => b.length > 0);
        
        if (beneficiosArray.length > 0) {
          const beneficiosToInsert = beneficiosArray.map(beneficio => ({
            id_producto: input.id_producto,
            descripcion_beneficio: beneficio,
          }));

          const { error: beneficiosError } = await supabase
            .from('sgp_m_beneficios')
            .insert(beneficiosToInsert);

          if (beneficiosError) {
            throw new ActionError({
              code: 'BAD_REQUEST',
              message: `No se pudieron actualizar los beneficios: ${beneficiosError.message}`,
            });
          }
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
            : 'Ocurrió un error inesperado al actualizar el producto',
        });
      }
    }
  }),

  deleteProduct: defineAction({
    input: z.object({
      id: z.string().uuid("ID de producto inválido")
    }),

    handler: async (input) => {
      try {
        // 1. Obtener datos del producto para borrar la imagen
        const { data: productData, error: fetchError } = await supabase
          .from('sgp_m_productos')
          .select('imagen_producto')
          .eq('id_producto', input.id)
          .single();

        if (fetchError) {
             console.error('Error fetching product to delete:', fetchError);
             // Continuamos aunque falle el fetch, el borrado de imagen es secundario
        } else if (productData && productData.imagen_producto && !productData.imagen_producto.includes('placehold.co')) {
             await deleteImageFromStorage(productData.imagen_producto);
        }

        // 2. Eliminar los beneficios asociados
        const { error: beneficiosError } = await supabase
          .from('sgp_m_beneficios')
          .delete()
          .eq('id_producto', input.id);

        if (beneficiosError) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudieron eliminar los beneficios: ${beneficiosError.message}`,
          });
        }

        // 3. Luego eliminar el producto
        const { error: productError } = await supabase
          .from('sgp_m_productos')
          .delete()
          .eq('id_producto', input.id);

        if (productError) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: `No se pudo eliminar el producto: ${productError.message}`,
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
            : 'Ocurrió un error inesperado al eliminar el producto',
        });
      }
    }
  }),
  
};
