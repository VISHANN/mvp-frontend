import { UserContext } from '@/app/context'
import { useContext } from 'react'
import { BiSearch } from 'react-icons/bi'
import NavLink from './navLink'
import styles from './navbar.module.css'

export default function Navbar() {
  const [user, ] = useContext(UserContext);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.navbar}>
            <div className="navBrand">
              <NavLink href="/">
                Brand
              </NavLink>
            </div>
            <ul className={styles.navItems}>
              <li className={styles.navItem}>
                <NavLink href="#">
                  <BiSearch value={{ style:"height: 100%" }}/>
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink href="/signin">
                  Sign In
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}