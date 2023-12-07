"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { useEffect, useReducer } from "react"
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context";

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
  const router = useRouter();

  useEffect(() => {
    // This effect exists only to load a logged in user's data is session exists on startup.
    fetch('http://localhost:8000/api/v1/me', {
      credentials: "include",
    })
    .then(res => {
      if(res.status !== 200) {
        // user's server session is missing; redirect to login
        
        router.push('/signin');
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
    <UserContext.Provider value={[user, dispatch]}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </UserContext.Provider>
  )
}

// interpolate clientId as an environment variable