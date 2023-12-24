"use client"

import { UserContext } from '@/app/context'
import { useContext } from 'react'
import Appbar from './Appbar'
import Sidebar from './Sidebar'

export default function Navbar() {
  const [user, ] = useContext(UserContext);

  if (document.documentElement.clientWidth < 760){
    return (
      <Appbar />
    )
  } else {
    return (
      <Sidebar />
    )
  }
}