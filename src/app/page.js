"use client"

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "./context";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [user, dispatch] = useContext(UserContext);

  useEffect(() => {
    // This effect exists only to load a logged in user's data is session exists on startup.
    fetch('http://localhost:8000/api/v1/me', {
      credentials: "include",
    })
    .then(res => {
      if(res.status !== 200) {
        // user's server session is missing; redirect to login
        
        console.log("User Not Logged In");
        throw new Error('Server Session Missing');
      }
      return res.json();
    })
    .then(user => {
      const { given_name, picture } = user;
      dispatch({ type: 'ADD_USER', payload: { given_name, picture }});
      return user;
    })
    .catch(err => {
      console.error(err);
    });
  }, []);
  return (
    <main className="container">
      <br />
      <Link 
        href={'/work/4'}>
        work
      </Link>  
    </main>
  )
}
