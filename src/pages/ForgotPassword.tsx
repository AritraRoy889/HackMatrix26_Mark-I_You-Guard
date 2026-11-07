import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Connect to your backend password-recovery endpoint.
    setSent(true);
  }

  return (
    <div className="authright min-h-screen">
      <div className="authbox">
        <div className="eyebrow">ACCOUNT RECOVERY</div>

        <h1>Forgot your password?</h1>

        <p className="muted">
          Enter your registered email address to request
          a password reset.
        </p>

        {sent ? (
          <div className="notice">
            If your account exists, password recovery
            instructions will be sent to your email.
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
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

            <button className="btn primary">
              Send recovery link
            </button>
          </form>
        )}

        <p>
          <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
}
