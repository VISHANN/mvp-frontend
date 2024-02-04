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
        {i}
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