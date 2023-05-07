import { urls } from '@/constants';
import AuthContent from '@/components/Layout/AuthContent';

export const metadata = {
  title: 'Registration',
};

export default function RegistrationPage() {
  return (
    <AuthContent
      title="Sign up"
      subtitle="Enter your credentials to continue"
      link={{
        href: urls.login,
        text: 'Already have an account?',
      }}
    >
      <div>Registration</div>
    </AuthContent>
  );
}
