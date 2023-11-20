"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { createContext, useReducer, useState } from "react"

export const UserContext = createContext(null);

function reducer(state, action) {
  switch(action.type) {
    case 'ADD_USER': 
      return action.payload;
    default:
      return state;
  }
}

export default function Providers ({ children }){
  const initialUser = {
    picture: "",
    given_name: ""
  }
  const [user, dispatch] = useReducer(reducer, initialUser);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </UserContext.Provider>
  )
}

// interpolate clientId as an environment variable