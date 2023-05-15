import AuthContent from '@/components/Layout/AuthContent';
import LoginForm from '@/components/Auth/LoginForm';
import { urls } from '@/constants';

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <AuthContent
      title="Hi, Welcome Back"
      subtitle="Sign in with Email address"
      link={{
        href: urls.registration,
        text: 'Don`t have an account?',
      }}
      googleBtnProps={{
        text: 'Sign in with Google',
        isLogin: true,
      }}
    >
      <LoginForm />
    </AuthContent>
  );
}
