"use client"

import { UserContext } from '@/app/context'
import { useContext } from 'react'
import MobileNavbar from './MobileNavbar'

export default function Navbar() {
  const [user, ] = useContext(UserContext);

  if (document.documentElement.clientWidth < 760){
    return (
      <MobileNavbar />
    )
  } else {
    return (
      <div>Sidebar</div>
    )
  }
}