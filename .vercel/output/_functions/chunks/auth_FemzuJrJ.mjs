import { s as supabase } from './AuthLayout_BfQniUbi.mjs';

async function signIn(email, password) {
  const {
    data,
    error
  } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return {
    user: data.user,
    session: data.session,
    error
  };
}
async function signInWithGoogle() {
  const {
    data,
    error
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/callback`
    }
  });
  return {
    data,
    error
  };
}
async function signOut() {
  const {
    error
  } = await supabase.auth.signOut();
  return {
    error
  };
}
async function resetPassword(email) {
  const {
    error
  } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
  return {
    error
  };
}

export { signIn as a, signInWithGoogle as b, resetPassword as r, signOut as s };
