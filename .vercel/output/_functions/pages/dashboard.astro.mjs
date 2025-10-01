import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_zyXMpcS0.mjs';
import 'kleur/colors';
import { useState } from 'preact/hooks';
import { s as signOut } from '../chunks/auth_CHXtb9N8.mjs';
import { jsx } from 'preact/jsx-runtime';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_B6lVrRwX.mjs';
export { renderers } from '../renderers.mjs';

function LogoutButton({
  className = "btn",
  children = "Cerrar sesión"
}) {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const {
      error
    } = await signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
      setLoading(false);
    } else {
      window.location.href = "/login";
    }
  };
  return jsx("button", {
    onClick: handleLogout,
    disabled: loading,
    className,
    children: loading ? "Cerrando sesión..." : children
  });
}

const prerender = false;
const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl font-bold mb-4">¡Bienvenido a tu Dashboard!</h1> <p class="mb-6">Has iniciado sesión correctamente.</p> ${renderComponent($$result2, "LogoutButton", LogoutButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/mafer/Documents/Projects/venepan-web/src/components/auth/LogOutButton.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "AuthLayout", $$AuthLayout, {})}` })}`;
}, "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
