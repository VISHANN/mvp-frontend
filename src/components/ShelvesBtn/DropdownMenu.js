import { computeShelfName } from "./index";

export default function DropdownMenu ({ shelfId, handleSelection}) {
  const shelvesList = [...Array(4).keys()].map(i => {
    if (i === shelfId) {
      return null;
    }
    return (
      <li 
        style={{cursor: 'pointer'}}
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
      <ul>
        {shelvesList}
      </ul>
    </div>
  )
}