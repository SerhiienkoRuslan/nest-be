'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { urls } from '@/constants';
import { AuthContext } from '@/context/AuthContext';

export default function MainPage() {
  const router = useRouter();
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    router.replace(isAuth ? urls.dashboard : urls.login);
  });

  return null;
}
