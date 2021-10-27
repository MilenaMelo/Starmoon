import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import './styles.css'

function MenuSideBar({ label, icon, url, color }) {
    const history = useHistory();
    return (
        <div>
            <button 
            style={{backgroundColor: color}}
            className='btn-enable-secundary alignment-side-menu'
            onClick={() => history.push({url})}
            >
                {icon}
                <Link 
                style={{backgroundColor: color}}
                className='btn-enable-secundary alignment-icon-menu' 
                to={url}>{label}</Link>
            </button>
        </div>
    );
}

export default MenuSideBar;