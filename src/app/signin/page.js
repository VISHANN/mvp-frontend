"use client"

import { GoogleLogin } from "@react-oauth/google"
import { UserContext } from "@/components/providers";
import { useContext } from "react";
import Link from 'next/link'

function handleUser(user, dispatch) {
  dispatch({ type: 'ADD_USER', payload: user });
  localStorage.setItem('user', JSON.stringify(user));
}

export default function SignIn() {
  const [user, dispatch] = useContext(UserContext);

  return (
    <>
    { /* Using GoogleLogin to get JWT 
          -> send the tokent to backend with session cookie 
          -> Backend verifies the token, formats userData received to save to DB
          -> intialize a user session, save the session in DB and set a sessionCookie to be stored on the browser( cookie contains sessionId only ) 
          -> server sends that created user once the session has been initialized */ }
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          fetch('http://localhost:8000/api/signin',{ 
            headers: { Authorization: `Bearer ${credentialResponse.credential}`},
            credentials: "include", 
          })
            .then(res => res.json())
            .then(data => handleUser(data, dispatch))
            .catch(err => console.log(err));
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <Link href="/">Home</Link>
    </>
  )
}