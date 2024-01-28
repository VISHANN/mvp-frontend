import { UserContext } from "@/app/context";
import { useContext, useState } from "react"

export default function SignUp () {
  const [username, setUsername] = useState('');
  const [user, dispatch] = useContext(UserContext);

  return(
    <section>
      <input 
        type="text" 
        value={username}
        onChange={handleChange}
        placeholder="Enter a username" />

      <button onClick={handleClick}>Continue</button>
    </section>
  )

  function handleClick(e) {
    const token = localStorage.getItem('google-jwt'); 

    fetch('http://localhost:8000/api/v1/signup',{ 
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: "include", 
      body: JSON.stringify({ username }),
    })
      .then(res => res.json())
      .then(returnedUser => handleUser(returnedUser, dispatch))
      // .then(() => router.push('/'))
      .catch(err => console.log(err));
  }
  
  function handleChange (e) {
    setUsername(e.target.value);
  }

  function handleUser(user, dispatch) {
    console.log(user);
    const {given_name, picture} = user;
    dispatch({ type: 'ADD_USER', payload:{ given_name, picture }});
  
    // localStorage is built to retrieve string only, so stringify using JSON.stringify while 
    // saving to localStorage and JSON.parse while retrieving from localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Clear localStorage jwt
  }
  
}