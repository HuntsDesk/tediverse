import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import { LoadingSpinner } from '../common/LoadingSpinner';

export default function AuthRequired({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0FBFF] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F0FBFF] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
