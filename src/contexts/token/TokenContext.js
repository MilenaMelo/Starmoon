import { createContext } from 'react';

const TokenContext = createContext({
  token: null,
  logar: null,
  logout: null
})


export default TokenContext;