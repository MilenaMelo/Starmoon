/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
    Backdrop,
    CircularProgress
} from "@material-ui/core";

import './styles.css';
import '../Home/styles.css'
import { Alert } from "@material-ui/lab";

import Home from "../Home";
import TokenContext from "../../contexts/token/TokenContext";
import SubmitButton from '../../components/SubmitButton';
import InputPassword from '../../components/InputPassword';

import useStyles from "../../styles/useStyles";

function EditUser() {
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const { token } = useContext(TokenContext);
    const [loading, setLoading] = useState(false);
    const [reqError, setReqError] = useState("");
    const [reqSuccess, setReqSuccess] = useState("");

    const [name, setName] = useState(false);
    const [email, setEmail] = useState(false);
    const [phone, setPhone] = useState(false);
    const [cpf, setCpf] = useState(false);
    const [fill, setFill] = useState(false);


    async function updateUser(updateData) {

        try {
            setLoading(true);
            setReqError("");
            setReqSuccess("");


            const response = await fetch("https://desafio04-backend.herokuapp.com/editarUsuario", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                body: JSON.stringify(updateData),
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                },
            });

            const data = await response.json();

            setLoading(false);

            if (response.ok) {
                setReqSuccess(data);
                const timer = setTimeout(() => {
                    history.push('/');
                    clearTimeout(timer);
                }, 2000);
                return;
            }

            setReqError(data);
        } catch (error) {
            setReqError(error.message);
        }
    };

    const closeAlert = () => {
        setReqError("");
        setReqSuccess("");
    };

    useEffect(() => {
        if (email && name && phone && cpf) {
            setFill(true);
        }

    }, [email, name, phone, cpf])

    return (
        <div >
            <Home />
            <div className='container-form flex-column modal-form '>
                <form className='form margin-top-modal' onSubmit={handleSubmit(updateUser)}>
                    <a className='align-self-end' href='#close'
                        onClick={() => history.push('/')}
                    >x</a>
                    <div className='text-center mb-lg'>
                        <h4>// EDITAR USUÁRIO</h4>
                    </div>
                    <div className='flex-column  content-center items-center'>
                        <div className='flex-column'>
                            <label htmlFor='nome'>Nome</label>
                            <input
                                {...register('nome', { required: true })}
                                onBlur={(e) => setName(e.target.value)}
                                id='nome' type="text" />
                        </div>
                        <div className='flex-column'>
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

                        <div className='flex-column'>
                            <label htmlFor='phone'>Telefone</label>
                            <input
                                {...register("telefone")}
                                onBlur={(e) => setPhone(e.target.value)}
                                maxLength={10}
                                id='phone' type="text" />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='cpf'>CPF</label>
                            <input
                                {...register("cpf")}
                                onBlur={(e) => setCpf(e.target.value)}
                                maxLength={11}
                                id='cpf' type="text" />
                        </div>

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
                            label='Editar conta'
                            color={fill && '#DA0175'}
                        />

                    </div>
                </form>
            </div>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default EditUser;