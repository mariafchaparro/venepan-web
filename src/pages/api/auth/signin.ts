import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

function showSupabaseError(errorCode: string): string {
    switch (errorCode) {
        case '400':
        case 'AuthApiError':
        case 'invalid_credentials':
            return "Credenciales de inicio de sesión inválidas. Por favor, verifica tu email y contraseña e inténtalo de nuevo.";
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

    const { request, cookies} = context
    
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password || password.trim() === "") {
        return new Response(JSON.stringify({
            error: "Email y contraseña son obligatorios"
        }),
        {
            status: 400,
            headers: { 'Content-Type': 'application/json' } 
        });
    }
    
    if (!emailRegex.test(email) || email.trim() === "") {
        return new Response(JSON.stringify({
            error: "Ingresa un email válido"
        }),
        {
            status: 400,
            headers: { 'Content-Type': 'application/json' } 
        });
    }

    if (password.length < 6) { 
        return new Response(JSON.stringify({
            error: "La contraseña debe tener al menos 6 carcateres"
        }),
        {
            status: 400,
            headers: { 'Content-Type': 'application/json' } 
        });
    }

    // Iniciar sesión con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

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

    // Guardar los tokens en cookies seguras
    const { access_token, refresh_token } = data.session;
        cookies.set("sb-access-token", access_token, {
        sameSite: "strict",
        path: "/",
        secure: true,
    });
        cookies.set("sb-refresh-token", refresh_token, {
        sameSite: "strict",
        path: "/",
        secure: true,
    }); 

    return new Response(JSON.stringify({
        message: "Inicio de sesión exitoso",
        redirectUrl: "/dashboard"
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};