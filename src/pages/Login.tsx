import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistInput from '@/components/BrutalistInput';
import BrutalistCard from '@/components/BrutalistCard';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock login - replace with actual OIDC flow
    if (email && password) {
      login('mock_token_' + Date.now(), 'user_' + email, email, 'Test User');
      navigate('/dashboard');
    } else {
      setError('Please enter email and password');
    }
  };

  const handleOIDCLogin = () => {
    // TODO: Implement Zitadel OIDC flow
    // loginWithRedirect() from @auth0/auth0-react or oidc-client-ts
    console.log('OIDC login triggered - Integration pending');
    setError('OIDC integration pending - use email/password for now');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BrutalistCard className="w-full max-w-md">
        <h1 className="text-center mb-8">AI Interview Hub</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 uppercase">Email</label>
            <BrutalistInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              error={!!error}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 uppercase">Password</label>
            <BrutalistInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={!!error}
            />
          </div>

          {error && (
            <div className="bg-destructive text-destructive-foreground border-4 border-destructive p-3">
              <p className="font-bold text-sm uppercase">{error}</p>
            </div>
          )}

          <BrutalistButton type="submit" variant="accent" size="full">
            Sign In
          </BrutalistButton>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-4 border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-sm font-bold uppercase">Or</span>
            </div>
          </div>

          <BrutalistButton
            type="button"
            variant="primary"
            size="full"
            onClick={handleOIDCLogin}
          >
            Login with Zitadel
          </BrutalistButton>

          <a
            href="#"
            className="block text-center text-destructive font-bold uppercase text-sm border-b-2 border-destructive hover:bg-destructive hover:text-destructive-foreground p-2"
          >
            Forgot Password?
          </a>
        </form>
      </BrutalistCard>
    </div>
  );
};

export default Login;
