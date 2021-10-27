import './styles.css'

function SubmitButton({ label, color }) {
    return (
        <div>
            <button
                className='btn-disabled-primary mt-lg width-mid'
                style={{backgroundColor: color}}
                >
                {label}
            </button>
        </div>
    );
}

export default SubmitButton;


