'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { urls } from '@/constants';
import { AuthContext } from '@/context/AuthContext';

export default function MainPage() {
  const router = useRouter();
  const { isLogIn } = useContext(AuthContext);

  useEffect(() => {
    router.replace(isLogIn ? urls.dashboard : urls.login);
  });

  return null;
}
