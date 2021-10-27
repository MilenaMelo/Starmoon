import TokenContext from './TokenContext';
import useToken from '../../hooks/useToken';

export default function TokenProvider(props) {
  const contextValues = useToken();

  return (
    <TokenContext.Provider value={contextValues}>
      {props.children}
    </TokenContext.Provider>
  )
}