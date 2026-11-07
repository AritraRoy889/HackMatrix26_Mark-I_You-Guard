import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { signUp } from '../services/auth';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      signUp(name, email, password);
      navigate('/verify-email');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="auth">
      <div className="authleft">
        <Link to="/" className="brand">
          <ShieldCheck /> ThreatGuard
        </Link>

        <div>
          <h2>
            Build a safer
            <br />
            <span>digital environment.</span>
          </h2>
          <p>Join the ThreatGuard security platform.</p>
        </div>
      </div>

      <div className="authright">
        <div className="authbox">
          <div className="eyebrow">CREATE WORKSPACE</div>
          <h1>Create your account</h1>

          <form className="form" onSubmit={handleRegister}>
            <label>
              Full name
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
              />
            </label>

            {error && <p className="error">{error}</p>}

            <button className="btn primary">
              Create account
            </button>
          </form>

          <p>
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
