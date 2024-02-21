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
    const { code, text } = await res.json();

    switch (code) {
      case "user_signup_incomplete":
        alert(text);
        throw new Error(code);
      case "user_not_authenticated":
        alert(text);
        throw new Error(code);
      case "session_not_destroyed":
        alert(text);
        throw new Error(code);
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
