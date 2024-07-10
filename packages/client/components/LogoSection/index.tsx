import Link from 'next/link';
import { ButtonBase } from '@mui/material';

import Logo from '@/components/Logo';
import { urls } from '@/constants/urls';

const LogoSection = () => {
  return (
    <ButtonBase disableRipple onClick={() => {}} component={Link} href={urls.profile}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
