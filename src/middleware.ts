import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabase'; 

export const onRequest = defineMiddleware(async (context, next) => {
    const { cookies, url, redirect, isPrerendered } = context;

    // Si la página está prerenderizada, no ejecutar lógica de autenticación
    // Esto evita el error de acceder a cookies/headers en páginas estáticas

    if (isPrerendered) {
        return next();
    }

    const isProtectedRoute = url.pathname.startsWith('/dashboard');

    // Obtener los tokens de las cookies:
    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;

    if (isProtectedRoute) {

        if (!accessToken || !refreshToken) {
            
            cookies.delete("sb-access-token", { path: "/" });
            cookies.delete("sb-refresh-token", { path: "/" });

            return redirect('/ingresar');
        }

        try {
            // Establece o refresca la sesión
            const { error, data } = await supabase.auth.setSession({
                refresh_token: refreshToken,
                access_token: accessToken,
            });

            if (error) {
                console.log("Error al establecer la sesión", error);

                cookies.delete("sb-access-token", { path: "/" });
                cookies.delete("sb-refresh-token", { path: "/" });

                return redirect('/ingresar'); 
            }

            // Actualizar cookies con las nuevas credenciales si han cambiado
            if (data.session) {
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
            }

            // Guardar el usuario en el contexto para uso posterior
            context.locals.user = data.user;
            return next();

        } catch (error) {
            console.log("Error al validar la sesión", error)
            
            cookies.delete("sb-access-token", { path: "/" });
            cookies.delete("sb-refresh-token", { path: "/" });

            return redirect('/ingresar'); 
        }
    }
    
    // Redirigir usuarios autenticados que intentan acceder a /ingresar
    if (url.pathname === '/ingresar' && accessToken && refreshToken) {
        return redirect('/dashboard'); 
    }
    
    return next();
});