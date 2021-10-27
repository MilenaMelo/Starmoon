/* eslint-disable no-restricted-globals */
import { useLocation } from 'react-router';
import ContainerHome from '../../components/ContainerHome';
import MenuSideBar from '../../components/MenuSideBar';
import Logo from '../../assets/logo-white.svg';
import ButtonProfile from '../../components/ButtonProfile';

import './styles.css';
import IconMoney from '../../assets/IconMoney';
import IconHome from '../../assets/IconHome';
import IconUser from '../../assets/IconUser';


function Home() {
  const location = useLocation();

  return (
    <div className="container-home flex-row">
      <div className='side-bar text-center' >
        <img
          className='logo-form pt-md'
          src={Logo}
          alt="Logo da Cubos Academy"
        />

        <MenuSideBar
          label='HOME'
          url={'/'}
          icon={<IconHome />}
          color={location.pathname === '/' && '#374952'}
        />

        <MenuSideBar
          color={location.pathname === '/contratacoes' && '#374952'}
          label='CONTRATAÇÕES'
          url='/contratacoes'
          icon={<IconMoney />}
        />

        <MenuSideBar
          color={location.pathname === '/adicionarCliente' && '#374952'}
          label='CLIENTES'
          url='/adicionarCliente'
          icon={<IconUser />}
        />

        <button className='btn-enable-charges items-center'>Criar cobrança</button>
      </div>
      <div className='body container-home'>
        <ButtonProfile />
        <div className='containers content-center grid-gap-mid container-margin-lg'>
          <div className='flex-column'>
            <div className='flex-row items-center content-center gap-sm container-header'>
              {<IconUser />}
              <h5>Clientes</h5>
            </div>
            <div className='body container-body flex-column items-center gap-sm'>
              <ContainerHome label='Em dia' cor='#4EC06E' />
              <ContainerHome label='Inadimplentes' cor='#FF4D4D' />
            </div>
          </div>
          <div className='flex-column'>
            <div className='flex-row items-center content-center gap-sm container-header'>
              {<IconMoney />}
              <h5>Cobranças</h5>
            </div>
            <div className='body container-body flex-column items-center gap-sm'>
              <ContainerHome label='Previstas' cor='#5197B5' />
              <ContainerHome label='Vencidas' cor='#FF4D4D' />
              <ContainerHome label='Pagas' cor='#4EC06E' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;