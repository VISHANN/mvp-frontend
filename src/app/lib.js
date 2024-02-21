async function handleFetchResponse(res) {
  /*
    handleFetchResponse would be imported and executed under the first link of a fetch promise chain.
    Thus we must return body for an successful response.
    And we throw Error which would be caught in the respective catch err handler of the promise chain. 
  */

  if (res.ok) {
    return res.json();
  }

  if (res.status === 401) {
    const { errCode, errText } = await res.json();

    switch (errCode) {
      case "user_signup_incomplete":
        alert(errText);
        throw new Error(errCode);
      case "user_not_authenticated":
        alert(errText);
        throw new Error(errCode);
      case "session_not_destroyed":
        alert(errText);
        throw new Error(errCode);
    }
  } else if (res.status === 422) {
    const { code, text } = await res.json();

    switch (code) {
      case "bad_form_data":
        alert(text);
        throw new Error(code);
    }
  }
}

export { handleFetchResponse };
