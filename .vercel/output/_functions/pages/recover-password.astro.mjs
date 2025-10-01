import { c as createComponent, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_zyXMpcS0.mjs';
import 'kleur/colors';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_B6lVrRwX.mjs';
import { useState } from 'preact/hooks';
import { r as resetPassword } from '../chunks/auth_CHXtb9N8.mjs';
import { jsxs, jsx } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

function RecoverForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    if (!email) {
      setError("Por favor ingresa tu email");
      setLoading(false);
      return;
    }
    const {
      error: resetError
    } = await resetPassword(email);
    if (resetError) {
      setError("Error al enviar el email. Verifica que sea correcto.");
    } else {
      setMessage("Se ha enviado un enlace de recuperación a tu email.");
    }
    setLoading(false);
  };
  return jsxs("section", {
    className: "relative flex justify-center items-center h-dvh w-dvw bg-white",
    children: [jsxs("div", {
      className: "absolute top-5 left-3 flex items-center",
      children: [jsx("img", {
        src: "/icons/chevron-left.svg",
        alt: "Flecha atrás",
        className: "w-4"
      }), jsx("a", {
        href: "/",
        className: "text-gray-600 text-sm hover:underline",
        children: "Volver al inicio"
      })]
    }), jsxs("div", {
      className: "flex flex-col items-center justify-center bg-white p-8 gap-10",
      children: [jsx("img", {
        src: "/icons/logo.svg",
        alt: "Venepan Logo",
        className: "w-20"
      }), jsxs("div", {
        className: "flex flex-col justify-center items-center gap-2",
        children: [jsx("h1", {
          className: "text-gray-800 font-semibold text-3xl text-center",
          children: "¿Olvidaste tu contraseña?"
        }), jsx("p", {
          className: "text-gray-600 mb-0 w-[40ch] text-center",
          children: "No te preocupes, te enviaremos instrucciones para restablecerla"
        })]
      }), jsxs("form", {
        onSubmit: handleSubmit,
        className: "flex flex-col gap-6 w-80",
        children: [error && jsx("div", {
          className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-center",
          children: error
        }), message && jsx("div", {
          className: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex justify-center",
          children: message
        }), jsx("input", {
          id: "email",
          type: "email",
          placeholder: "Email",
          value: email,
          onInput: (e) => setEmail(e.target.value),
          className: "border-b-2 border-light-gray p-3 focus:border-primary outline-none",
          required: true
        }), jsx("button", {
          type: "submit",
          disabled: loading,
          className: "btn disabled:opacity-50 mt-4",
          children: loading ? "Enviando..." : "Enviar"
        }), jsx("a", {
          href: "/login",
          className: "text-primary self-center hover:underline",
          children: "Volver al Login"
        })]
      })]
    })]
  });
}

const prerender = false;
const $$RecoverPassword = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Recover password" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RecoverForm", RecoverForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/mafer/Documents/Projects/venepan-web/src/components/auth/RecoverForm.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "AuthLayout", $$AuthLayout, {})}` })}`;
}, "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/recover-password.astro", void 0);

const $$file = "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/recover-password.astro";
const $$url = "/recover-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$RecoverPassword,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
