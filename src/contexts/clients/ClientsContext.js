import { createContext } from 'react';

export const ClientsContext = createContext({
  clients:[],
  setClients: null
})


export default ClientsContext;