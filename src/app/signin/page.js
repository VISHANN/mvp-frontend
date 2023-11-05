"use client"

import { GoogleLogin } from "@react-oauth/google"

export default function SignIn() {
  return(
    <GoogleLogin
      onSuccess={credentialResponse => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  )
}