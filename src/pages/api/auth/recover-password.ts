import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

function showSupabaseError(errorCode: string): string {
    switch (errorCode) {
        case '400':
        case 'AuthApiError':
        case 'invalid_credentials':
            return "Credenciales inválidas. Por favor, verifica tu email e inténtalo de nuevo.";
        case 'email_address_invalid':
            return "El formato del email es inválido. Por favor, corrígelo e inténtalo de nuevo.";
        case 'email_address_not_authorized':
            return "El email no está autorizado para restablecer la contraseña. Contacta soporte si crees que es un error.";
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
    const email = formData.get("email")?.toString();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.trim() === "" || !emailRegex.test(email)) {
        return new Response(JSON.stringify({
            error: "Ingresa un email válido"
        }),
        {
            status: 400,
            headers: { 'Content-Type': 'application/json' } 
        });
    }
    
    // Recuperar contraseña con Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(email);

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
        message: "¡Enlace enviado! Revisa tu correo electrónico para restablecer tu contraseña."
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};