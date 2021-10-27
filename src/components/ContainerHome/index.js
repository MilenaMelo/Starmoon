import './styles.css'
           
function ContainerHome({ label, cor }) {
    return(
        <div style={{borderColor: cor, color: cor}} className='flex-row container-value content-around'>
            <h4>{label}</h4>
            <h4 className='number-zero '>0</h4>
        </div>
    );
}

export default ContainerHome;