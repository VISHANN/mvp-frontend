"use client"

import { UserContext } from '@/app/context'
import { useContext } from 'react'

export default function Home() {
  const [user, dispatch] = useContext(UserContext);
  function handleClick(e){
    // TEST FUNCTION: Delete after use;

    fetch('http://localhost:8000/api/v1/me', {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }
  return (
    <main>
      <br />
      {/* <button onClick={handleClick}> Get User </button> */}
    </main>
  )
}
