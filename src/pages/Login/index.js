/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import {
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import TokenContext from "../../contexts/token/TokenContext";
import UserContext from "../../contexts/user/UserContext";

import './styles.css';
import '../../styles/form.css';
import Logo from '../../assets/logo-dark.svg';
import InputPassword from '../../components/InputPassword';
import AccessLink from '../../components/AccessLink';
import SubmitButton from '../../components/SubmitButton';

import useStyles from "../../styles/useStyles";

function Login() {
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [reqError, setReqError] = useState("");
    const [fill, setFill] = useState(false);

    const useToken = useContext(TokenContext);
    const { setUser } = useContext(UserContext);

    async function loginUser(loginData) {
        try {
            setLoading(true);
            setReqError("");
            setFill(false);

            console.log(loginData);
            const response = await fetch('https://desafio04-backend.herokuapp.com/login', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const data = await response.json();
            setLoading(false);

            console.log(data);
            if (response.ok) {
                useToken.logar(data?.token, () => history.push("/"));
                setUser(data.userData);
                return;
            }

            setReqError(data);

        } catch (error) {
            setReqError(error.message);
        }
    }

    const closeAlert = () => {
        setReqError("");
    };

    return (
        <div className='container-form flex-column'>
            <form className='form' onSubmit={handleSubmit(loginUser)}>
                <div className='text-center mb-lg'>
                    <img className='logo-form' src={Logo} alt="Logo da Cubos Academy" />
                </div>
                <div className='flex-column  content-center items-center'>
                    <div className='flex-column'>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            {...register('email', { required: true })}
                            id='email'
                            type="text"
                            placeholder='exemplo@gmail.com'
                            onBlur={(e) => setFill(e.target.value)}
                        />
                    </div>

                    <InputPassword
                        error={!!errors.senha}
                        register={() => register('senha', { required: true })}
                    />

                    {reqError && (
                        <Alert severity="error" onClose={closeAlert}>
                            {reqError}
                        </Alert>
                    )}

                    <SubmitButton
                        label='Entrar'
                        color={fill && '#DA0175'}
                    />

                    <Backdrop
                        className={classes.backdrop}
                        open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </form>
            <AccessLink text='Não tem uma conta? ' label='Cadastre-se' url='/cadastro' />
        </div>
    )
}

export default Login;