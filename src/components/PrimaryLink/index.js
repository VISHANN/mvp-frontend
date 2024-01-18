import Link from "next/link";

const styles = {
  border: 'none',
  background: 'transparent',
  color: 'var(--primary-green)',
}

export default function PrimaryLink({ href, children }) {
  return (
    <Link href={href} style={styles}>
      {children}
    </Link>
  )
}