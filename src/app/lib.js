async function handleFetchResponse (res) {

  if (res.ok) {
    return res.json();
  }

  // delete
  console.log(res.status);
  if (res.status === 401) {
    const { errCode, errText } = await res.json();

    switch (errCode) {
      case 'user_signup_incomplete':
        alert(errText);
        throw new Error(errCode);
      case 'user_not_authenticated':
        alert(errText)
        throw new Error(errCode);
      case 'session_not_destroyed':
        alert(errText)
        throw new Error(errCode);
    }
  } 
}

export { handleFetchResponse }