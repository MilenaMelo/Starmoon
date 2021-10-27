import useLocalStorage from "./useLocalStorage";

export default function useToken() {
  const [token, setToken] = useLocalStorage(null, "token");
  const [setUser] = useLocalStorage([], "user")

  const logar = (value, callback) => {
    setToken(value);
    callback();
  };

  const logout = (callback) => {
    setToken(null);
    setUser([])
    callback();
  };

  return {
    token,
    logar,
    logout,
  };
}