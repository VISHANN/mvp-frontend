"use client"

import { UserContext } from "@/app/context";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import Link from "next/link";
import { NavLink } from "./Appbar";
import UserProfile from "../UserProfile";
import { RiSettings3Fill } from "react-icons/ri";
import { RiSettings3Line } from "react-icons/ri";

export default function VariableLink() {
  const pathname = usePathname();
	const [user, ] = useContext(UserContext);

  // Render Sign In button if user state empty
  if (!user.picture){
    return(
      <NavLink href='/signin'>
        <button className="btn btn-primary" style={{ fontSize: ".8rem" }}>
          Log In
        </button>
      </NavLink>
    )
  }

	switch (pathname) {
    case '/profile':
      return (
        <NavLink href="#">
          <RiSettings3Line />
        </NavLink>
      )
    default: 
      return (
        <NavLink href="/profile">
					<UserProfile src={user.picture} />
				</NavLink>
      )
  }
}