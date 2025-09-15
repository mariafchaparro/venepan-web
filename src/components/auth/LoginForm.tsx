import { useState } from 'preact/hooks';
import { signIn, signInWithGoogle  } from '../../utils/auth.ts';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    const { user, error: authError } = await signIn(email, password);

    if (authError) {
      setError('Email o contraseña incorrectos');
      setLoading(false);
    } else if (user) {
      // Redirigir al dashboard
      window.location.href = '/dashboard';
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    const { error } = await signInWithGoogle();
    
    if (error) {
      setError('Error al iniciar sesión con Google');
      setLoading(false);
    }
    // Si es exitoso, Supabase redirige automáticamente
  };

  return (
    <section className="relative flex justify-center items-center h-dvh w-dvw bg-white">
      <div className="absolute top-5 left-3 flex items-center">
        <img src="/icons/chevron-left.svg" alt="Flecha atrás" className="w-4" />
        <a href="/" className="text-gray-600 text-sm hover:underline">
          Volver al inicio
        </a>
      </div>

      <div className="flex flex-col items-center justify-center bg-white p-8 gap-10">
        <img src="/icons/logo.svg" alt="Venepan Logo" className="w-20" />

        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-gray-800 font-semibold text-3xl">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-gray-600 mb-0">Ingresa tus datos para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-80">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-center">
              {error}
            </div>
          )}

          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            className="border-b-2 border-light-gray p-3 focus:border-primary outline-none"
            required
          />

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              className="border-b-2 border-light-gray p-3 w-full focus:border-primary outline-none"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="show-password" className="text-gray-800 text-sm flex items-center gap-1">
              <input
                id="show-password"
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword((e.target as HTMLInputElement).checked)}
              />
              Mostrar contraseña
            </label>

            <a
              href="/recover-password"
              className="text-primary hover:underline self-end text-sm"
            >
              Olvidé mi contraseña
            </a>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>

            <span className="light-text text-sm mb-0 text-center">
              O continúa con
            </span>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn bg-light-blue text-gray-600 flex justify-center gap-2"
              disabled={loading}
            >
              <img src="/icons/google-icon.svg" alt="Google" className="w-5" />
              Google
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}