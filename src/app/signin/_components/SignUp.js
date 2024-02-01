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
    .then(data => handleValidation(data))
    .catch(err => console.log(err));
  },[username])

  return(
    <section>
      <h1 className="h2" style={{marginBottom: '.5rem'}}>One Last Step</h1>
      <h2 className="h4" style={{marginBottom: '2rem'}}>Choose a username that whispers your story.</h2>
      
      <Input 
        id="username"
        value={username}
        handleChange={handleChange}
        placeholder="Username" 
        isValid={isUsernameValid} />
      
      <label htmlFor="username" style={{ color: isUsernameValid ? 'var(--secondary-green)' : 'red'}}>
        {isUsernameValid 
          ? "Great name! It's not taken, so it's all yours." 
          : (username.length < 3 || username.length > 20)
          ? "Username must be between 3 and 20 characters."
          : "Sorry, this username is taken. Try another."
        } 
      </label>

      <div style={{marginTop: '2rem'}}>
        <button 
          className="btn btn-primary" 
          onClick={handleClick}
          disabled={!isUsernameValid}>
          Continue
        </button>
      </div>
    </section>
  )

  function handleValidation(data) {
    console.log(data);
    setIsUsernameValid(data.isValid);
  }

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