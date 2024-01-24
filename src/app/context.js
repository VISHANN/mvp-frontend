const { createContext } = require("react");

// value would be provided inside providers.js as [user, dispatch]
const UserContext = createContext(null);

export { UserContext }