'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
    setError('Password must be at least 6 characters');
    setLoading(false);
    return;
    }

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/'
      });

      if (res?.ok && res?.url) {
        router.push(res.url);
        router.refresh();
        } else if (res?.error) {
        let message;

        switch (res.error) {
            case 'CredentialsSignin':
            message = 'Incorrect email or password';
            break;
            case 'Configuration':
            message = 'Login configuration error';
            break;
            case 'AccessDenied':
            message = 'Access denied';
            break;
            default:
            message = 'Unknown login error';
        }
        setError(message);
        } else {
        throw new Error('Server connection failed');
        }

    } catch (err) {
        console.error('Login error:', err);
        setError(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div id="loginform">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputrow">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputrow">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Loggin...' : 'Login'}
        </button>

        {error ? <p id="info">{error}</p> : <p></p>}
      </form>
    </div>
  );
}
