"use client"

import Popup from "@/components/Popup"
import { createContext, useState } from "react"
import SocialLogin from "./_components/SocialLogin"
import SignUp from "./_components/SignUp"

export default function SignIn() {
  
  // use context when you break SocialLogin into further components
  const signUpContext = createContext(null);

  const [isSignUp, setIsSignUp] = useState(false);

  return(
    <Popup>
      {/* { isSignUp ? <SignUp /> : <SocialLogin setIsSignUp={(state) => setIsSignUp(state)}/>} */}
      <SignUp />
    </Popup>
  )
}