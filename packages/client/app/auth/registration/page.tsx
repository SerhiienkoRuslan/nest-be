import AuthContent from '@/components/Layout/AuthContent';
import RegistrationForm from '@/components/Auth/RegistrationForm';
import { urls } from '@/constants';

export const metadata = {
  title: 'Registration',
};

export default function RegistrationPage() {
  return (
    <AuthContent
      title="Sign up"
      subtitle="Sign un with Email address"
      link={{
        href: urls.login,
        text: 'Already have an account?',
      }}
      googleBtnProps={{
        text: 'Sign un with Google',
      }}
    >
      <RegistrationForm />
    </AuthContent>
  );
}
