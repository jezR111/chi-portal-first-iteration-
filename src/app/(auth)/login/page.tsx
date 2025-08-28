'use client'
import { useEffect } from 'react'

export default function LoginPage() {
  useEffect(() => console.log('login mounted'), [])
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p>Route: /login</p>
    </main>
  )
}
