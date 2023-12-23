"use client"

import { UserContext } from "@/app/context";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import Link from "next/link";
import UserProfile from "../UserProfile";
import { RiSettings3Fill } from "react-icons/ri";
import { RiSettings3Line } from "react-icons/ri";
export default function VariableLink() {
  const pathname = usePathname();
	const [user, ] = useContext(UserContext);

	switch (pathname) {
    case '/profile':
      return (
        <Link href="#">
          <RiSettings3Line />
        </Link>
      )
    default: 
      return (
        <Link href="/profile">
					<UserProfile src={user.picture} />
				</Link>
      )
  }
}