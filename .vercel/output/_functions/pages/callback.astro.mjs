import { c as createComponent, a as createAstro } from '../chunks/astro/server_zyXMpcS0.mjs';
import 'kleur/colors';
import 'clsx';
import { createClient } from '@supabase/supabase-js';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Callback = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Callback;
  const { url, cookies, redirect } = Astro2;
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");
  if (error) {
    console.error("Error en OAuth callback:", errorDescription);
    return redirect("/login?error=" + encodeURIComponent(errorDescription || "Authentication failed"));
  }
  if (!code) {
    return redirect("/login");
  }
  const supabase = createClient(
    "https://pjqupfgiddtwnnddvzgc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcXVwZmdpZGR0d25uZGR2emdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMzI5NzgsImV4cCI6MjA3MjkwODk3OH0.SQuIXrKZA60nqb5Q55iclGrqIBdYCMVx6WTgncJgaq0"
  );
  try {
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      console.error("Error intercambiando código por sesión:", exchangeError);
      return redirect("/login?error=" + encodeURIComponent(exchangeError.message));
    }
    if (data.session) {
      cookies.set("sb-access-token", data.session.access_token, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7
        // 7 días
      });
      cookies.set("sb-refresh-token", data.session.refresh_token, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30
        // 30 días
      });
      return redirect("/dashboard");
    }
  } catch (err) {
    console.error("Error procesando callback:", err);
    return redirect("/login?error=callback_failed");
  }
  return redirect("/login");
}, "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/callback.astro", void 0);
const $$file = "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/callback.astro";
const $$url = "/callback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Callback,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
