'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { urls } from '@/constants';

export default function Posts() {
  const router = useRouter();

  useEffect(() => {
    router.replace(urls.myPosts);
  });

  return null;
}
