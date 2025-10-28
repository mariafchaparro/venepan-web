import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

function showSupabaseError(errorCode: string): string {
    switch (errorCode) {
        case '400':
        case 'AuthApiError':
        case 'invalid_credentials':
            return "Credenciales inválidas. Por favor, verifica tu email e inténtalo de nuevo.";
        case 'same_password':
            return "La nueva contraseña no puede ser igual a la anterior. Por favor, elige una contraseña diferente.";
        case '429':
            return "Demasiados intentos recientes. Por favor, espera un minuto e inténtalo de nuevo.";
        case '500':
            return "Error interno del servidor de autenticación. Intenta de nuevo más tarde o contacta soporte.";
        default:
            console.error("Código de error de Supabase no mapeado:", errorCode);
            return "Ocurrió un error desconocido. Inténtalo de nuevo más tarde.";
    }
}

export const POST: APIRoute = async (context) => {

    const { request } = context
    
    const formData = await request.formData();
    const newPassword = formData.get("new-password")?.toString();
    const confirmedPassword = formData.get("confirmed-password")?.toString();


    if (!newPassword || newPassword.trim() === "" || newPassword.length < 6) {
        return new Response(JSON.stringify({
            error: "La contraseña debe contener al menos 6 caracteres válidos"
        }),
        {
            status: 400,
            headers: { 'Content-Type': 'application/json' } 
        });
    }

    if (newPassword !== confirmedPassword) {
        return new Response(JSON.stringify({
            error: "Las contraseñas no coinciden"
        }), 
        {
            status: 400,
            headers: { 'Content-Type': 'application/json' } 
        });
    }
    
    // Actualizar contraseña con Supabase
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    // Manejo de errores de Supabase
    if (error) {
        const errorCode = error.code || String(error.status); 
        const errorMessage = showSupabaseError(errorCode);

        return new Response(JSON.stringify({
            error: errorMessage
        }), {
            status: error.status || 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return new Response(JSON.stringify({
        message: "¡Contraseña acutalizada con éxito! Ingresa sesión con tu nueva contraseña."
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    }) ;
};