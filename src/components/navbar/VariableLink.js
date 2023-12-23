"use client"

import { UserContext } from "@/app/context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import UserProfile from "../UserProfile";

export default function VariableLink() {
  const pathname = usePathname();
	const [user, ] = useContext(UserContext);

	switch (pathname) {
    case '/profile':
      return (
        <>Setting</>
      )
    default: 
      return (
        <Link href="/profile">
					<UserProfile src={user.picture} />
				</Link>
      )
  }
}