'use client'

import { useContext, useEffect } from "react";
import { UserContext } from "@/app/context";
import { handleFetchResponse } from "../lib";

export default function LoadUser ({ children }) {
  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    // This effect exists only to load a logged in user's data is session exists on startup.
    fetch('http://localhost:8000/api/v1/me', {
      credentials: "include",
    })
    .then(res => handleFetchResponse(res))
    .then(user => {
      const { given_name, picture } = user;
      dispatch({ type: 'ADD_USER', payload: { given_name, picture }});
      return user;
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <>
      {children}
    </>
  )
}