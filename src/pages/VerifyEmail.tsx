import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VerifyEmail() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    // Replace with POST /auth/verify-email.
    setMessage('Connect the verification API to validate this code.');
  }

  return (
    <div className="authright min-h-screen">
      <div className="authbox">
        <div className="eyebrow">SECURE YOUR ACCOUNT</div>

        <h1>Verify your email</h1>

        <p className="muted">
          Enter the six-digit verification code sent to your email.
        </p>

        <form className="form" onSubmit={handleVerify}>
          <label>
            Verification code
            <input
              required
              maxLength={6}
              inputMode="numeric"
              value={code}
              onChange={e =>
                setCode(e.target.value.replace(/\D/g, ''))
              }
              placeholder="000000"
            />
          </label>

          <button
            className="btn primary"
            disabled={code.length !== 6}
          >
            Verify email
          </button>
        </form>

        {message && <p className="muted">{message}</p>}

        <p>
          <Link to="/login">Return to login</Link>
        </p>
      </div>
    </div>
  );
}
