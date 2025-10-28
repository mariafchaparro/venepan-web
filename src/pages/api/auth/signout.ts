import type { APIRoute } from "astro";

export const POST: APIRoute = async (context) => {
    const { cookies } = context

    cookies.delete("sb-access-token", { path: "/" });
    cookies.delete("sb-refresh-token", { path: "/" });
    
    return new Response(JSON.stringify({
        message: "Sesión cerrada con éxito",
        redirectUrl: "/ingresar"
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};