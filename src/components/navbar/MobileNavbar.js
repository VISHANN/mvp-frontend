"use client"

import { UserContext } from '@/app/context'
import { useContext } from 'react'
import { BiSearch } from 'react-icons/bi'
import NavLink from './navLink'
import styles from './navbar.module.css'
import VariableLink from './VariableLink'

export default function Navbar() {
  const [user, ] = useContext(UserContext);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.navbar}>
            <div className={styles.navBrand}>
              <NavLink href="/">
                Brand
              </NavLink>
            </div>
            <ul className={styles.navItems}>
              <li className={styles.navItem}>
                <NavLink href="#">
                  <BiSearch />
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <VariableLink />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}