import { useState } from 'react';
import { useHistory } from "react-router-dom";

import './styles.css'
import IconLogout from "../../assets/IconLogout";
import IconEdit from "../../assets/IconEdit";

function ButtonProfile() {
    const history = useHistory();

    const [isInputVisible, setIsInputVisible] = useState(false);

    function logout() {
        localStorage.clear();
        window.location.href = '/login';
    }

    return (
        <div className='align-self-end'>
            <button
                className='cursor-pointer button-decoration img-profile'
                onClick={isInputVisible ? () => setIsInputVisible(false) : () => setIsInputVisible(true)}
            >
            </button>
            {isInputVisible &&
                <div className='input-profile-logout'>
                    <button
                        className='flex-row items-center pd-mid button-decoration-none'
                        onClick={() => history.push('/editarUsuario')}
                    >
                        {<IconEdit />}
                        Editar
                    </button>
                    <button
                        onClick={() => logout()}
                        className='flex-row items-center pd-mid button-decoration-none'>
                        {<IconLogout />}
                        Deslogar
                    </button>
                </div>
            }
        </div>
    );
}

export default ButtonProfile;