import { d as defineMiddleware, s as sequence } from './chunks/index_DG-FZ1gV.mjs';
import { createClient } from '@supabase/supabase-js';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_iHdP20nS.mjs';
import 'kleur/colors';
import './chunks/astro/server_zyXMpcS0.mjs';
import 'clsx';
import 'cookie';

const supabase = createClient("https://pjqupfgiddtwnnddvzgc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcXVwZmdpZGR0d25uZGR2emdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMzI5NzgsImV4cCI6MjA3MjkwODk3OH0.SQuIXrKZA60nqb5Q55iclGrqIBdYCMVx6WTgncJgaq0");
const onRequest$1 = defineMiddleware(async (context, next) => {
  const {
    url,
    cookies,
    redirect,
    isPrerendered
  } = context;
  if (isPrerendered) {
    return next();
  }
  if (url.pathname === "/callback") {
    return next();
  }
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) => url.pathname.startsWith(route));
  const authRoutes = ["/login", "/recover-password"];
  const isAuthRoute = authRoutes.some((route) => url.pathname.startsWith(route));
  let user = null;
  if (accessToken && refreshToken) {
    try {
      const {
        data: {
          user: authUser
        },
        error
      } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
      if (!error && authUser) {
        user = authUser;
      }
    } catch (error) {
      console.error("Error verificando sesión:", error);
    }
  }
  if (isProtectedRoute && !user) {
    return redirect("/login");
  }
  if (isAuthRoute && user) {
    return redirect("/dashboard");
  }
  context.locals.user = user;
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
