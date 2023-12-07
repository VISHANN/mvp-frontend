"use client"

import { GoogleLogin } from "@react-oauth/google"
import { UserContext } from "@/app/context";
import { useContext } from "react";
import { useRouter } from "next/navigation";

function handleUser(user, dispatch) {
  const {given_name, picture} = user;
  dispatch({ type: 'ADD_USER', payload:{ given_name, picture }});

  // localStorage is built to retrieve string only, so stringify using JSON.stringify while 
  // saving to localStorage and JSON.parse while retrieving from localStorage
  localStorage.setItem('user', JSON.stringify(user));
}

export default function SignIn() {
  const [user, dispatch] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
    { /* Using GoogleLogin to get JWT 
          -> send the tokent to backend with session cookie 
          -> Backend verifies the token, formats userData received to save to DB
          -> intialize a user session, save the session in DB and set a sessionCookie to be stored on the browser( cookie contains sessionId only ) 
          -> server sends that created user once the session has been initialized */ }
      <GoogleLogin
        onSuccess={credentialResponse => {
          fetch('http://localhost:8000/api/signin',{ 
            headers: { Authorization: `Bearer ${credentialResponse.credential}`},
            credentials: "include", 
          })
            .then(res => res.json())
            .then(returnedUser => handleUser(returnedUser, dispatch, router))
            .then(() => router.push('/'))
            .catch(err => console.log(err));
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  )
}