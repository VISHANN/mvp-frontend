async function handleFetchResponse (res) {

  if (res.ok) {
    return res.json();
  }
  console.log(res.status);
  if (res.status === 401) {
    const { errCode, errText } = await res.json();

    switch (errCode) {
      case 'user_signup_incomplete':
      alert(errText);
      throw new Error(errCode);
    }
  } 
}

export { handleFetchResponse }