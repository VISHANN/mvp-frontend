"use client"

import styles from './Sidebar.module.css'
import { UserContext } from "@/app/context"
import { useContext, useState } from "react" 
import Link from 'next/link'
import UserProfile from '../UserProfile'
import SignOut from '../SignOut'

import { BiSearch } from 'react-icons/bi'
import { RiHome7Line } from "react-icons/ri"
import { IoMenu } from "react-icons/io5"
import { MdBookmarkBorder } from "react-icons/md"
import { LuSettings } from "react-icons/lu"
  


export default function Sidebar() {
  const [user, ] = useContext(UserContext);
  let isLoggedIn = Boolean(user.given_name);

  return(
    <nav className={styles.sidebar}>
      <div className="top">
        <div className={styles.navBrand}>
          <NavLink href="/">
            Brand
          </NavLink>
        </div>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <NavLink href="#">
              <RiHome7Line /> Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink href="#">
              <BiSearch /> Search
            </NavLink>
          </li>
          { isLoggedIn ? (
            <li className={styles.navItem}>
              <NavLink href="#">
                <MdBookmarkBorder /> Shelves
              </NavLink>
            </li>) :  null }
          { isLoggedIn ? ( 
            <li className={styles.navItem}>
              <NavLink href="#">
                <UserProfile src={user.picture} /> Profile
              </NavLink>
            </li> ) : null }
          { isLoggedIn ? ( 
            <li className={styles.navItem}>
              <NavLink href='#'>
                <LuSettings />  Settings
              </NavLink>
            </li> ) : null }
        </ul>
      </div>
      <div className={styles.navItems}>
        <div className={styles.navItem}>
          {isLoggedIn ? 
            ( <Menu /> ) : (
              <NavLink href='/signin'>
                <button className="btn btn-primary">
                  Log In
                </button>
              </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}

function Menu({}) {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <div className={styles.menu}>
      {isOpen && <DropdownMenu />}
      <div 
        className={styles.navLink}
        onClick={handleClick}>
        <IoMenu /> Menu
      </div>
    </div>
  )

  function handleClick(e) {
    setIsOpen(state => !state);
  }
}

function DropdownMenu () {
  return (
    <ul className={styles.dropdownMenu}>
      <li className={styles.dropdownOption}>
        <NavLink>
          <SignOut />
        </NavLink>
      </li>
      <li className={styles.dropdownOption}>
        <NavLink
          href={'#'}>
          Settings
        </NavLink>
      </li>
    </ul>
  )
}

// Separate concerns by rebasing navLink component for both navbars.

function NavLink({ href, children }) {
  function handleClick(e) {
    e.preventDefault()
  }

  return (
    <Link 
      href={href ? href : '#'}
      onClick={!href && handleClick} 
      className={styles.navLink}>
      {children}
    </Link>
  )
}