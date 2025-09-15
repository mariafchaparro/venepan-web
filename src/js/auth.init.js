import { supabase } from '../lib/supabase';

// Escuchar cambios en el estado de autenticación
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    // Guardar tokens en cookies
    document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${session.expires_in}; SameSite=Lax; secure`;
    document.cookie = `sb-refresh-token=${session.refresh_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax; secure`; // 7 días
  } else {
    // Limpiar cookies al cerrar sesión
    document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
});

// Verificar sesión al cargar la página
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${session.expires_in}; SameSite=Lax; secure`;
    document.cookie = `sb-refresh-token=${session.refresh_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax; secure`;
  }
});