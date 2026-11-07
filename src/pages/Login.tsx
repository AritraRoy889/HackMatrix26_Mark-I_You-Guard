import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { signIn } from '../services/auth';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      signIn(email, password);
      navigate('/dashboard');
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
            Trust the web.
            <br />
            <span>Verify everything.</span>
          </h2>
          <p>Intelligent cybersecurity starts here.</p>
        </div>

        <small>Privacy-first · Evidence-led · Secure</small>
      </div>

      <div className="authright">
        <div className="authbox">
          <div className="eyebrow">WELCOME BACK</div>

          <h1>Sign in to ThreatGuard</h1>
          <p className="muted">
            Access your security intelligence workspace.
          </p>

          <form className="form" onSubmit={handleLogin}>
            <label>
              Email address
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>

            <Link to="/forgot-password">
              Forgot password?
            </Link>

            {error && <p className="error">{error}</p>}

            <button className="btn primary">
              Sign in <ArrowRight size={16} />
            </button>
          </form>

          <p>
            Don't have an account?{' '}
            <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
