"use client"

import { useState } from "react";

const styles = {
  textAlign: 'justify',
}

export default function Description ({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  if ( !children ) {
    return(
      <p>
        This book does not have a description yet.
      </p>
    )
  }
  
  return (
    <div>
      <p style={styles}>
        {(isVisible) ? children : truncate(children)}
      </p>
      <button
        className='link capitalize'
        onClick={handleClick} > 
        {isVisible ? 'Show Less' : 'Show More'}
      </button>
    </div>
  )
  
  function handleClick (e) {
    setIsVisible(state => !state);
  }
}

function truncate (text) {
  // vary the length of truncated text based on screen sizes.
  const MAX = (document.documentElement.clientWidth < 760) ? 160 : 308;

  if ( text.length < MAX) {
    return text;
  } else {
    let subString = text.slice(0, MAX);
    return (<>{subString.slice(0, subString.lastIndexOf(' '))} &hellip;</>);
  }
}