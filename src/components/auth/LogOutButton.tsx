// src/components/LogoutButton.tsx
import { useState } from 'preact/hooks';
import { signOut } from '../../utils/auth.ts';

interface LogoutButtonProps {
  className?: string;
  children?: string;
}

export default function LogoutButton({ 
  className = "btn", 
  children = "Cerrar sesión" 
}: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    
    const { error } = await signOut();
    
    if (error) {
      console.error('Error al cerrar sesión:', error);
      setLoading(false);
    } else {
      // Redirigir al login
      window.location.href = '/login';
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={className}
    >
      {loading ? 'Cerrando sesión...' : children}
    </button>
  );
}