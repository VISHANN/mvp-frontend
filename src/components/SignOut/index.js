import { handleFetchResponse } from "@/app/lib"
import { useContext } from "react";
import { UserContext } from "@/app/context";

const style = {
  width: '100%',
  border: 'none',
  background: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
}

export default function SignOut ({ children }) {
  const [, dispatch] = useContext(UserContext);

  return(
    <button 
      style={style}
      onClick={() => handleSignOut(dispatch)}>
      { children ? children : 'Sign Out' }
    </button>
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

  return alert(message.code);
}