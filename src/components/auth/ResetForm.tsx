import { useState, useEffect } from 'preact/hooks';
import { supabase } from '../../lib/supabase';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión de recuperación válida
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('El enlace de recuperación ha expirado o es inválido');
      }
    };
    
    checkSession();
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validaciones
    if (!password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    // Actualizar contraseña
    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    });

    if (updateError) {
      setError('Error al actualizar la contraseña: ' + updateError.message);
      setLoading(false);
    } else {
      setSuccess('Contraseña actualizada exitosamente');
      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }
  };

  return (
    <section className="relative flex justify-center items-center h-dvh w-dvw bg-white">
      <div className="absolute top-5 left-3 flex items-center">
        <img src="/icons/chevron-left.svg" alt="Flecha atrás" className="w-4" />
        <a href="/login" className="text-gray-600 text-sm hover:underline">
          Volver al Login
        </a>
      </div>

      <div className="flex flex-col items-center justify-center bg-white p-8 gap-10">
        <img src="/icons/logo.svg" alt="Venepan Logo" className="w-20" />

        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-gray-800 font-semibold text-3xl text-center">
            Nueva Contraseña
          </h1>
          <p className="text-gray-600 mb-0 w-[40ch] text-center">
            Ingresa tu nueva contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-80">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nueva contraseña"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              className="border-b-2 border-light-gray p-3 w-full focus:border-primary outline-none"
              required
            />
          </div>

          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onInput={(e) => setConfirmPassword((e.target as HTMLInputElement).value)}
              className="border-b-2 border-light-gray p-3 w-full focus:border-primary outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="show-password" className="text-gray-800 text-sm flex items-center gap-1">
              <input
                id="show-password"
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword((e.target as HTMLInputElement).checked)}
              />
              Mostrar nueva contraseña
            </label>

            <label htmlFor="show-confirm-password" className="text-gray-800 text-sm flex items-center gap-1">
              <input
                id="show-confirm-password"
                type="checkbox"
                checked={showConfirmPassword}
                onChange={(e) => setShowConfirmPassword((e.target as HTMLInputElement).checked)}
              />
              Mostrar confirmación
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn disabled:opacity-50 mt-4"
          >
            {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
          </button>
        </form>
      </div>
    </section>
  );
}
