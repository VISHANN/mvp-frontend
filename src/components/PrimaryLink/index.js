import Link from "next/link";


export default function PrimaryLink({ href, children }) {
  return (
    <Link href={href} className="link-primary">
      {children}
    </Link>
  )
}