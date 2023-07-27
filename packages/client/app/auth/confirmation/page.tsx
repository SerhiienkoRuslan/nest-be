import ConfirmationForm from '@/components/Auth/ComfirmationForm';
import AuthContent from '@/components/Layout/AuthContent';
import { urls } from '@/constants';

export function ConfirmationPage() {
  return (
    <AuthContent
      title="Hi, Welcome Back"
      subtitle="Enter 6 digitals to confirm your email"
      link={{
        href: urls.registration,
        text: 'Back to register',
      }}
      googleBtnProps={{
        text: 'Sign in with Google',
        isLogin: true,
      }}
    >
      <ConfirmationForm />
    </AuthContent>
  );
}

export default ConfirmationPage;
