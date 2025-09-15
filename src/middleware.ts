import { defineMiddleware } from 'astro:middleware';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  if (url.pathname === '/callback') {
    return next();
  }
  
  // Obtener el token de la cookie
  const accessToken = cookies.get('sb-access-token')?.value;
  const refreshToken = cookies.get('sb-refresh-token')?.value;

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => 
    url.pathname.startsWith(route)
  );

  // Rutas de autenticación (login, registro, etc.)
  const authRoutes = ['/login', '/recover-password'];
  const isAuthRoute = authRoutes.some(route => 
    url.pathname.startsWith(route)
  );

  let user = null;

  // Verificar si hay tokens válidos
  if (accessToken && refreshToken) {
    try {
      const { data: { user: authUser }, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (!error && authUser) {
        user = authUser;
      }
    } catch (error) {
      console.error('Error verificando sesión:', error);
    }
  }

  // Si está en una ruta protegida y no está autenticado
  if (isProtectedRoute && !user) {
    return redirect('/login');
  }

  // Si está en una ruta de autenticación y ya está autenticado
  if (isAuthRoute && user) {
    return redirect('/dashboard');
  }

  // Agregar información del usuario al contexto
  context.locals.user = user;

  return next();
});