"use client"

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "./context";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [user, dispatch] = useContext(UserContext);

  return (
    <main className="container">
      <br />
      <Link 
        href={'/work/4'}>
        work
      </Link>  
    </main>
  )
}
