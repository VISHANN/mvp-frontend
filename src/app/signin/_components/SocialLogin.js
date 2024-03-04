import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "@/app/context";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function SocialLogin({ setIsSignUp }) {
  const [, dispatch] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {/* Using GoogleLogin to get JWT 
          -> send the tokent to backend with session cookie 
          -> Backend verifies the token, formats userData received to save to DB
          -> intialize a user session, save the session in DB and set a sessionCookie to be stored on the browser( cookie contains sessionId only ) 
          -> server sends that created user once the session has been initialized */}
      <GoogleLogin
        onSuccess={(credentialResponse) => handleSuccess(credentialResponse)}
        onError={logError}
      />
    </>
  );

  function handleSuccess(credentialResponse) {
    const jwt = credentialResponse.credential;

    fetch("http://localhost:8000/api/signin", {
      headers: { Authorization: `Bearer ${jwt}` },
      credentials: "include",
    })
      .then((res) => handleNewUser(res, setIsSignUp))
      .then((user) => loadUser(user, dispatch))
      .then(() => router.push("/work/OL45804W"))
      .catch(logError);
  }
  function logError(err) {
    console.log(err);
  }
}
function handleNewUser(res, setIsSignUp) {
  // We are fetching user from our servers, if the user exists the response's status code would be ok
  // If res status code is in 400s, it means server could not find the user. Thus it must be a new registration.
  // HandleNewUser then sets isSignUp to be true, showing signup form.
  // handleNewUser also stops redirection by throwing error and ending the fetch promise chain.

  if (res.ok) {
    return res.json();
  }

  // set isSignUp to be true, so that we can render username input
  setIsSignUp(true);

  // throw error to conclude fetch
  throw new Error(
    "User is not registered, let user to Sign Up by choosing a unique username."
  );
}

function loadUser(user, dispatch) {
  const { given_name, picture, username } = user;

  dispatch({ type: "ADD_USER", payload: { given_name, picture, username } });

  // localStorage is built to retrieve string only, so stringify using JSON.stringify while
  // saving to localStorage and JSON.parse while retrieving from localStorage
  localStorage.setItem("user", JSON.stringify(user));
}
