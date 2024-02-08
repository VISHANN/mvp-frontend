import { handleFetchResponse } from "@/app/lib"
import { useContext } from "react";
import { UserContext } from "@/app/context";

export default function SignOut ({ children }) {
  const [, dispatch] = useContext(UserContext);

  return(
    <div>
      <button onClick={() => handleSignOut(dispatch)}>
        { children ? children : 'Sign Out' }
      </button>
    </div>
  )
}
function handleSignOut (dispatch) {
  fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/signout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then(res => handleFetchResponse(res))
    .then(message => handleSuccess(message, dispatch))
    .catch(err => console.log(err));
}


function handleSuccess (message, dispatch) {
  if (message.code === 'logout_successful') {
    return dispatch({ type: 'REMOVE_USER' });
  }

  return console.log(message.code);
}