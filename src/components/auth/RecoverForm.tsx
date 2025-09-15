import { useState } from 'preact/hooks';
import { resetPassword } from '../../utils/auth.ts';

export default function RecoverForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!email) {
      setError('Por favor ingresa tu email');
      setLoading(false);
      return;
    }

    const { error: resetError } = await resetPassword(email);

    if (resetError) {
      setError('Error al enviar el email. Verifica que sea correcto.');
    } else {
      setMessage('Se ha enviado un enlace de recuperación a tu email.');
    }
    
    setLoading(false);
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
          <h1 className="text-gray-800 font-semibold text-3xl text-center">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-gray-600 mb-0 w-[40ch] text-center">
            No te preocupes, te enviaremos instrucciones para recuperarla
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-80">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-center">
              {error}
            </div>
          )}
          
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex justify-center">
              {message}
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

          <button
            type="submit"
            disabled={loading}
            className="btn disabled:opacity-50 mt-4"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>

          <a href="/login" className="text-primary self-center hover:underline">
            Volver al Login
          </a>
        </form>
      </div>
    </section>
  );
}