'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { urls } from '@/constants';

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(urls.dashboard);
  });

  return null;
}
