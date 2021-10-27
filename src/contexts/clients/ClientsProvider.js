import ClientsContext from "./ClientsContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ProvedorUsuario(props) {
  const [clients, setClients] = useLocalStorage([], 'Clients');

  return (
    <ClientsContext.Provider value={{ clients, setClients}}>
      {props.children}
    </ClientsContext.Provider>
  );
}