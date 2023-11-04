import { BiSearch } from 'react-icons/bi'
import styles from './navbar.module.css'

export default function Navbar() {
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
              <li>
                <a href="#" className={styles.navLink}>
                  Search
                </a>
              </li>
              <li>
                <a href="#" className={styles.navLink}>
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