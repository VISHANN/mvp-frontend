import { computeShelfName } from "./index";
import styles from './index.module.css'

export default function DropdownMenu ({ shelfId, handleSelection}) {
  const shelvesList = [...Array(4).keys()].map(i => {
    if (i === shelfId) {
      return null;
    }
    return (
      <li 
        className={styles.dropdownItem}
        id={i}
        key={i}
        onClick={() => handleSelection(i)}>
        {computeShelfName(i)}
      </li>
    );
  });
  return (
    <div>
      <hr></hr>
      <ul className={styles.dropdownMenu}>
        {shelvesList}
      </ul>
    </div>
  )
}