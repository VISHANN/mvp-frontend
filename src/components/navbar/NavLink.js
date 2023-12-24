import Link from "next/link";
import styles from './Appbar.modu'


export default function NavLink({ href, children }) {
  return (
    <Link href={href} className={styles.navLink}>
      {children}
    </Link>
  )
}