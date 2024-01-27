"use client"

import Popup from "@/components/Popup"
import { createContext, useState } from "react"
import SocialLogin from "./_components/SocialLogin"

export default function SignIn() {
  const signUpContext = createContext(null);
  const [isSignUp, setIsSignUp] = useState(false);

  return(
    <Popup>
      { isSignUp ? 'Enter new username' : <SocialLogin setIsSignUp={(state) => setIsSignUp(state)}/>}
    </Popup>
  )
}