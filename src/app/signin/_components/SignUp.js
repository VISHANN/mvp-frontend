import { UserContext } from "@/app/context";
import Input from "@/components/Input";
import { useContext, useEffect, useState } from "react"

export default function SignUp () {
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    if(!username) {
      return ;
    }

    fetch('http://localhost:8000/api/v1/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username })
    })
    .then(res => handleResponse(res))
    .then(data => console.log(data))
  },[username])

  return(
    <section>
      <h1 style={{marginBottom: '2rem'}}>Choose a username</h1>
      <Input 
        value={username}
        handleChange={handleChange}
        placeholder="Username" />

      <button style={{marginTop: '1rem'}} onClick={handleClick}>Continue</button>
    </section>
  )

  function handleClick(e) {
    fetch('http://localhost:8000/api/v1/signup',{ 
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      credentials: "include", 
      body: JSON.stringify({ username }),
    })
      .then(res => res.json())
      .then(user => loadUser(user, dispatch))
      .catch(err => console.log(err));
  }
  
  function handleChange (e) {
    setUsername(e.target.value);
  }

  function loadUser(user, dispatch) {

    const {given_name, picture} = user;
    dispatch({ type: 'ADD_USER', payload:{ given_name, picture }});
  
    // localStorage is built to retrieve string only, so stringify using JSON.stringify while 
    // saving to localStorage and JSON.parse while retrieving from localStorage
    localStorage.setItem('user', JSON.stringify(user));
  }  
}

function handleResponse(res) {
  console.log(res.status)
  if (res.ok) {
    return res.json();
  } 
  throw new Error ('Could not fetch successfully');  
}