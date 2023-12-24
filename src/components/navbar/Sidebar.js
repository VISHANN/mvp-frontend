"use client"

import { UserContext } from "@/app/context";
import { useContext } from "react";
import styles from './navbar.module.css'
import NavLink from './navLink'
import UserProfile from '../UserProfile'
import { BiSearch } from 'react-icons/bi'
import { RiHome7Line } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";import { MdBookmarkBorder } from "react-icons/md";
import { LuSettings } from "react-icons/lu";


export default function Sidebar() {
  const [user, ] = useContext(UserContext);

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
          <li className={styles.navItem}>
            <NavLink href="#">
              <MdBookmarkBorder /> Shelves
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink href="#">
              <UserProfile src={user.picture} /> Profile
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink href='#'>
              <LuSettings />  Settings
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.navItem}>
          <NavLink href="#">
            <IoMenu /> Menu
          </NavLink>
        </div>
      </div>
    </nav>
  )
}