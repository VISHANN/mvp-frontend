import { UserContext } from '@/app/context'
import { useContext } from 'react'
import { BiSearch } from 'react-icons/bi'
import styles from './navbar.module.css'

export default function Navbar() {
  const [user, ] = useContext(UserContext);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.navbar}>
            <div className="navBrand">
              <a href="/" className={styles.navLink}>
                Brand
              </a>
            </div>
            <ul className={styles.navItems}>
              <li className={styles.navItem}>
                <a href="#" className={styles.navLink}>
                  <BiSearch value={{ style:"height: 100%" }}/>
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="/signin" className={styles.navLink}>
                  Sign In
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}