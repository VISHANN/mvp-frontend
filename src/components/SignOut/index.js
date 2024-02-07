import { handleFetchResponse } from "@/app/lib"

export default function SignOut ({ children }) {
  return(
    <div>
      <button onClick={handleSignOut}>
        { children ? children : 'Sign Out' }
      </button>
    </div>
  )
}

function handleSignOut () {
  fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/v1/signout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then(res => handleFetchResponse(res))
    .then(data => console.log(data))
    .catch(err => console.log(err));
}