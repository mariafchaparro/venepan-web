import { c as createComponent, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_zyXMpcS0.mjs';
import 'kleur/colors';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_BfQniUbi.mjs';
import { useState } from 'preact/hooks';
import { a as signIn, b as signInWithGoogle } from '../chunks/auth_FemzuJrJ.mjs';
import { jsxs, jsx } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }
    const {
      user,
      error: authError
    } = await signIn(email, password);
    if (authError) {
      setError("Email o contraseña incorrectos");
      setLoading(false);
    } else if (user) {
      window.location.href = "/dashboard";
    }
  };
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const {
      error: error2
    } = await signInWithGoogle();
    if (error2) {
      setError("Error al iniciar sesión con Google");
      setLoading(false);
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
          className: "text-gray-800 font-semibold text-3xl",
          children: "¡Bienvenido de vuelta!"
        }), jsx("p", {
          className: "text-gray-600 mb-0",
          children: "Ingresa tus datos para continuar"
        })]
      }), jsxs("form", {
        onSubmit: handleSubmit,
        className: "flex flex-col gap-6 w-80",
        children: [error && jsx("div", {
          className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-center",
          children: error
        }), jsx("input", {
          id: "email",
          type: "email",
          placeholder: "Email",
          value: email,
          onInput: (e) => setEmail(e.target.value),
          className: "border-b-2 border-light-gray p-3 focus:border-primary outline-none",
          required: true
        }), jsx("div", {
          className: "relative",
          children: jsx("input", {
            id: "password",
            type: showPassword ? "text" : "password",
            placeholder: "Password",
            value: password,
            onInput: (e) => setPassword(e.target.value),
            className: "border-b-2 border-light-gray p-3 w-full focus:border-primary outline-none",
            required: true
          })
        }), jsxs("div", {
          className: "flex justify-between items-center",
          children: [jsxs("label", {
            htmlFor: "show-password",
            className: "text-gray-800 text-sm flex items-center gap-1",
            children: [jsx("input", {
              id: "show-password",
              type: "checkbox",
              checked: showPassword,
              onChange: (e) => setShowPassword(e.target.checked)
            }), "Mostrar contraseña"]
          }), jsx("a", {
            href: "/recover-password",
            className: "text-primary hover:underline self-end text-sm",
            children: "Olvidé mi contraseña"
          })]
        }), jsxs("div", {
          className: "flex flex-col gap-3 mt-6",
          children: [jsx("button", {
            type: "submit",
            disabled: loading,
            className: "btn disabled:opacity-50",
            children: loading ? "Ingresando..." : "Ingresar"
          }), jsx("span", {
            className: "light-text text-sm mb-0 text-center",
            children: "O continúa con"
          }), jsxs("button", {
            type: "button",
            onClick: handleGoogleLogin,
            className: "btn bg-light-blue text-gray-600 flex justify-center gap-2",
            disabled: loading,
            children: [jsx("img", {
              src: "/icons/google-icon.svg",
              alt: "Google",
              className: "w-5"
            }), "Google"]
          })]
        })]
      })]
    })]
  });
}

const prerender = false;
const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/mafer/Documents/Projects/venepan-web/src/components/auth/LoginForm.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "AuthLayout", $$AuthLayout, {})}` })}`;
}, "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/login.astro", void 0);

const $$file = "C:/Users/mafer/Documents/Projects/venepan-web/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
