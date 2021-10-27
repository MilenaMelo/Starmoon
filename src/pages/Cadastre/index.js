import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import {
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import './styles.css';
import '../../styles/form.css';
import Logo from '../../assets/logo-dark.svg';
import InputPassword from '../../components/InputPassword';
import AccessLink from '../../components/AccessLink';
import SubmitButton from '../../components/SubmitButton';

import useStyles from "../../styles/useStyles";

function Cadastre() {
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [reqError, setReqError] = useState("");
    const [name, setName] = useState(false);
    const [email, setEmail] = useState(false);
    const [fill, setFill] = useState(false);

    const [reqSuccess, setReqSuccess] = useState("");


    async function Register(formData) {

        try {

            setLoading(true);
            setReqError("");
            setReqSuccess("");
        
            console.log(formData);
            const response = await fetch('https://desafio04-backend.herokuapp.com/cadastrarUsuario', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                setReqSuccess(data);
                const timer = setTimeout(() => {
                    history.push('/login');
                    clearTimeout(timer);
                }, 3000);
                return;
            }

            setReqError(data);


        } catch (error) {
            setReqError(error.message);
        }

    }

    const closeAlert = () => {
        setReqError("");
        setReqSuccess("");
    };

    useEffect(() => {
        if (email && name) {
            setFill(true);
        }

    }, [email, name])


    return (
        <div className='container-form-cadastre flex-column'>
            <form className='form' onSubmit={handleSubmit(Register)}>
                <div className='text-center mb-lg'>
                    <img className='logo-form' src={Logo} alt="Logo da Cubos Academy" />
                </div>
                <div className='flex-column  content-center items-center'>
                    <div className='flex-column'>
                        <label htmlFor='nome'>Nome</label>
                        <input
                            {...register('nome', { required: true })}
                            onBlur={(e) => setName(e.target.value)}
                            id='name'
                            type="text"
                        />
                        <label htmlFor='email'>E-mail</label>
                        <input
                            {...register('email', { required: true })}
                            onBlur={(e) => setEmail(e.target.value)}
                            id='email' type="text"
                            placeholder='exemplo@gmail.com'
                        />
                    </div>
                    <InputPassword
                        error={!!errors.senha}
                        register={() => register('senha', { required: true })}
                    />

                    {reqSuccess && (<Alert severity="success" onClose={closeAlert}>
                        {reqSuccess}
                    </Alert>)}

                    {reqError && (<Alert severity="error" onClose={closeAlert}>
                        {reqError}
                    </Alert>)}

                    <Backdrop
                        className={classes.backdrop}
                        open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <SubmitButton
                        color={fill && '#DA0175'}
                        label='Criar conta'
                    />
                </div>
            </form>
            <AccessLink text='Já possui uma conta? ' label='Acesse agora' url='/login' />
        </div>
    )
}

export default Cadastre;