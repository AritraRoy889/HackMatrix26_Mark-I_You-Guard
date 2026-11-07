export interface User {
  name: string;
  email: string;
}

export function currentUser(): User | null {
  const data = localStorage.getItem('tg_user');
  return data ? JSON.parse(data) : null;
}

export function signIn(email: string, password: string) {
  if (!email.includes('@') || password.length < 6) {
    throw new Error('Invalid email or password.');
  }

  // DEMO ONLY: replace with backend authentication.
  localStorage.setItem(
    'tg_user',
    JSON.stringify({
      name: email.split('@')[0],
      email
    })
  );
}

export function signUp(
  name: string,
  email: string,
  password: string
) {
  if (!name.trim() || !email.includes('@') || password.length < 8) {
    throw new Error('Please enter valid registration details.');
  }

  // DEMO ONLY: real registration must use your backend.
  localStorage.setItem(
    'tg_user',
    JSON.stringify({ name, email })
  );
}

export function signOut() {
  localStorage.removeItem('tg_user');
}
