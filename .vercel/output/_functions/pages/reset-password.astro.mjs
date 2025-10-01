import { c as createComponent, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_zyXMpcS0.mjs';
import 'kleur/colors';
import { s as supabase, $ as $$AuthLayout } from '../chunks/AuthLayout_B6lVrRwX.mjs';
import { useState, useEffect } from 'preact/hooks';
import { jsxs, jsx } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        setError("El enlace de recuperación ha expirado o es inválido");
      }
    };
    checkSession();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }
    const {
      error: updateError
    } = await supabase.auth.updateUser({
      password
    });
    if (updateError) {
      setError("Error al actualizar la contraseña: " + updateError.message);
      setLoading(false);
    } else {
      setSuccess("Contraseña actualizada exitosamente");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2e3);
    }
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
        href: "/login",
        className: "text-gray-600 text-sm hover:underline",
        children: "Volver al Login"
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
          children: "Nueva Contraseña"
        }), jsx("p", {
          className: "text-gray-600 mb-0 w-[40ch] text-center",
          children: "Ingresa tu nueva contraseña"
        })]
      }), jsxs("form", {
        onSubmit: handleSubmit,
        className: "flex flex-col gap-6 w-80",
        children: [error && jsx("div", {
          className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded",
          children: error
        }), success && jsx("div", {
          className: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded",
          children: success
        }), jsx("div", {
          className: "relative",
          children: jsx("input", {
            id: "password",
            type: showPassword ? "text" : "password",
            placeholder: "Nueva contraseña",
            value: password,
            onInput: (e) => setPassword(e.target.value),
            className: "border-b-2 border-light-gray p-3 w-full focus:border-primary outline-none",
            required: true
          })
        }), jsx("div", {
          className: "relative",
          children: jsx("input", {
            id: "confirmPassword",
            type: showConfirmPassword ? "text" : "password",
            placeholder: "Confirmar contraseña",
            value: confirmPassword,
            onInput: (e) => setConfirmPassword(e.target.value),
            className: "border-b-2 border-light-gray p-3 w-full focus:border-primary outline-none",
            required: true
          })
        }), jsxs("div", {
          className: "flex flex-col gap-2",
          children: [jsxs("label", {
            htmlFor: "show-password",
            className: "text-gray-800 text-sm flex items-center gap-1",
            children: [jsx("input", {
              id: "show-password",
              type: "checkbox",
              checked: showPassword,
              onChange: (e) => setShowPassword(e.target.checked)
            }), "Mostrar nueva contraseña"]
          }), jsxs("label", {
            htmlFor: "show-confirm-password",
            className: "text-gray-800 text-sm flex items-center gap-1",
            children: [jsx("input", {
              id: "show-confirm-password",
              type: "checkbox",
              checked: showConfirmPassword,
              onChange: (e) => setShowConfirmPassword(e.target.checked)
            }), "Mostrar confirmación"]
          })]
        }), jsx("button", {
          type: "submit",
          disabled: loading,
          className: "btn disabled:opacity-50 mt-4",
          children: loading ? "Actualizando..." : "Actualizar Contraseña"
        })]
      })]
    })]
  });
}

const prerender = false;
const $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Restablecer Contrase\xF1a" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ResetPasswordForm", ResetPasswordForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/mafer/Documents/Projects/venepan-web/src/components/auth/ResetForm.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/reset-password.astro", void 0);

const $$file = "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/reset-password.astro";
const $$url = "/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ResetPassword,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
