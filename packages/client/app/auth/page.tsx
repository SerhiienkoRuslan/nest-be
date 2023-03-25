'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { urls } from '@/constants'

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace(urls.login)
  })

  return null
}
