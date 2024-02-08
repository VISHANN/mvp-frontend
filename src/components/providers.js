"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { useEffect, useReducer } from "react"
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context";
import { IconContext } from "react-icons";

const initialUser = {
  picture: "",
  given_name: ""
}

function reducer(state, action) {
  switch(action.type) {
    case 'ADD_USER': 
      return action.payload;
    case 'REMOVE_USER':
      return initialUser;
    default:
      return state;
  }
}

export default function Providers ({ children }){
  const [user, dispatch] = useReducer(reducer, initialUser);
  

  return (
    <UserContext.Provider value={[user, dispatch]}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <IconContext.Provider value={{ className: "react-icon" }}>
          {children}
        </IconContext.Provider>
      </GoogleOAuthProvider>
    </UserContext.Provider>
  )
}

// interpolate clientId as an environment variable