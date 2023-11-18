"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"

export default function Providers ({ children }){
  return (
    <GoogleOAuthProvider clientId="732729862786-b9539gcumc7que63gif9b2d5pa4bs5mq.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  )
}

// interpolate clientId as an environment variable