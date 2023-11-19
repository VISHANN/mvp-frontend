"use client"

import Navbar from '@/components/navbar'
import { UserContext } from '@/components/providers'
import { useContext } from 'react'

export default function Home() {
  const [user, dispatch] = useContext(UserContext);

  return (
    <main>
      <Navbar />
      {user.picture}
      <br />
      {JSON.parse(localStorage.getItem('user')).picture}
    </main>
  )
}
