"use client"

import { GoogleLogin } from "@react-oauth/google"

export default function SignIn() {
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
            .then(data => console.log(data))
            .catch(err => console.log(err));
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  )
}