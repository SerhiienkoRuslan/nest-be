import AuthContent from '@/components/Layout/AuthContent';
import { urls } from '@/constants';

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <AuthContent
      title="Hi, Welcome Back"
      subtitle="Enter your credentials to continue"
      link={{
        href: urls.registration,
        text: 'Don`t have an account?',
      }}
    >
      <div>Login</div>
    </AuthContent>
  );
}
