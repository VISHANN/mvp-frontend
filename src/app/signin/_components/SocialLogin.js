import { GoogleLogin } from "@react-oauth/google"
import { UserContext } from "@/app/context";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function SocialLogin({ setIsSignUp }) {
  const [user, dispatch] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
    { /* Using GoogleLogin to get JWT 
          -> send the tokent to backend with session cookie 
          -> Backend verifies the token, formats userData received to save to DB
          -> intialize a user session, save the session in DB and set a sessionCookie to be stored on the browser( cookie contains sessionId only ) 
          -> server sends that created user once the session has been initialized */ }
      <GoogleLogin
        onSuccess={credentialResponse => handleSuccess(credentialResponse)}
        onError={logError}
      />
    </>
  )

  function handleSuccess(credentialResponse) {
    fetch('http://localhost:8000/api/signin',{ 
      headers: { Authorization: `Bearer ${credentialResponse.credential}`},
      credentials: "include", 
    })
      .then(res => handleNewUser(res, setIsSignUp, credentialResponse.credential))
      .then(returnedUser => loadUser(returnedUser, dispatch))
      .then(() => router.push('/'))
      .catch(logError);
  }
  function logError(err) {
    console.log(err)
  }
}
function handleNewUser(res, setIsSignUp) {
  if(res.ok){
    return res.json()
  }

  // set isSignUp to be true, so that we can render username input
  setIsSignUp(true);

  // throw error to conclude fetch
  throw new Error('User is not registered, let user to Sign Up by choosing a unique username.');
}

function loadUser(user, dispatch) {
  const {given_name, picture} = user;
  dispatch({ type: 'ADD_USER', payload:{ given_name, picture }});

  // localStorage is built to retrieve string only, so stringify using JSON.stringify while 
  // saving to localStorage and JSON.parse while retrieving from localStorage
  localStorage.setItem('user', JSON.stringify(user));
}
